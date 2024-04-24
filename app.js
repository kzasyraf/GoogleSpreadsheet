// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
    const deploymentId = "AKfycbz1CBBgotL_N5DjKD118UoHMltrAy3HAD9dtsFgbdvVV975bjJl5hIgzto6ugYsmSe4";
    const apiUrl = "https://script.google.com/macros/s/" + deploymentId + "/exec"

    let postData = async (table, data) => {
        let response = await fetch(apiUrl + "?table=" + table, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                "Accept": "application/json"
            },
            redirect: "follow", // manual, *follow, error
            keepalive: true,
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
            .then(d => (d.ok || d.redirected) ? d.json() : '')
            .then(d => (d.status === 201) ? true : false);
        return response;
    };
    console.log("Hello World!");

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation');
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        const elementToast = document.getElementById(`${form.id}_toast`);
        const bootstrapToast = bootstrap.Toast.getOrCreateInstance(elementToast);

        const elementModal = document.getElementById(`${form.id}_modal`);
        const bootstrapModal = new bootstrap.Modal(elementModal, {});

        elementModal.addEventListener('show.bs.modal', event => {
            const listBody = elementModal.querySelectorAll('.list-unstyled');
            if (inputAttendance.value !== 'attending') {
                listBody.forEach((e) => {
                    e.remove();
                });
            }
        }, false);

        let inputWished = document.getElementById(`${form.id}_wished`);
        const inputName = document.getElementById(`${form.id}_name`);
        const inputAttendance = document.getElementById(`${form.id}_attendance`);
        const inputSubmit = document.getElementById(`${form.id}_submit`);
        const inputSubmitSpinner = document.getElementById(`${form.id}_submit_spinner`);
        const inputSubmitText = document.getElementById(`${form.id}_submit_text`);

        BalloonEditor.create(inputWished, {
            toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList'],
            heading: {
                options: [
                    { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                    { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                    { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
                ]
            },
            isReadOnly: false
        }).then(editor => {
            inputWished = editor
        }).catch(error => {
            console.error(error);
        });

        inputSubmit.addEventListener('click', event => {
            if (form.checkValidity()) {
                event.preventDefault();
                inputName.disabled = true;
                inputAttendance.disabled = true;
                inputWished.enableReadOnlyMode('my-feature-id');
                inputSubmit.disabled = true;
                inputSubmitSpinner.classList.remove('d-none');
                inputSubmitText.innerText = 'Menghantar';
                const post = postData(form.id + '_table', {
                    name: inputName.value,
                    attendance: inputAttendance.value,
                    wished: inputWished.getData()
                })
                    .then(d => {
                        if (d === false || d === undefined) {
                            bootstrapToast.show();
                            inputName.disabled = false;
                            inputAttendance.disabled = false;
                            inputWished.disableReadOnlyMode('my-feature-id');
                            inputSubmit.disabled = false;
                            inputSubmitSpinner.classList.add('d-none');
                            inputSubmitText.innerText = 'Hantar';
                        } else {
                            bootstrapModal.show(inputSubmit);
                        }
                    });
            }
        }, false);

        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);

        const inputClose = document.getElementById(`${form.id}_modal_close`);
        inputClose.addEventListener('click', event => {
            if (form.checkValidity()) {
                event.preventDefault();
                inputSubmitSpinner.classList.remove('d-none');
                inputSubmitText.innerText = 'Hantar';
                location.reload(true);
            }
        }, false);
    });
})()