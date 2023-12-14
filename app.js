// Example starter JavaScript for disabling form submissions if there are invalid fields
(async () => {
    'use strict'
    const { default: config } = await import("./config.json", {
        assert: {
          type: "json",
        },
    });
    const apiUrl = "https://script.google.com/macros/s/" + config.deploymentId + "/exec"

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
            if(inputAttendance.value !== 'attending') {
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
        function getData() {
            const response = fetch(apiUrl, {
                cache: "no-cache",
                headers: {
                    "Accept": "application/json",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Connection": "keep-alive"
                },
                redirect: "follow",
            })
            .then(d => d.ok ? d.json() : '')
            .then(d => {
                document.getElementById('app').textContent = d.status;
            });
        }
    
        async function postData(table, data) {
            let response = await fetch(apiUrl + "?table=" + table, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                headers: {
                    "Accept": "application/json",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Connection": "keep-alive"
                },
                redirect: "follow", // manual, *follow, error
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            })
            .then(d => (d.ok || d.redirected) ? d.json() : '')
            .then(d => (d.status === 201) ? bootstrapModal.show(inputSubmit) : bootstrapToast.show());
            return response;
        }

        inputSubmit.addEventListener('click', event =>{
            if(form.checkValidity()) {
                event.preventDefault();
                inputSubmit.disabled = true;
                inputSubmitSpinner.classList.remove('d-none');
                inputSubmitText.innerText = 'Menghantar';
                const post = postData(form.id + '_table', {
                    name: inputName.value,
                    attendance: inputAttendance.value,
                    wished: inputWished.getData()
                });
            }
        }, false);

        form.addEventListener('submit', event => {
            if(!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);

        const inputClose = document.getElementById(`${form.id}_modal_close`);
        inputClose.addEventListener('click', event => {
            if(form.checkValidity()) {
                event.preventDefault();
                inputSubmitSpinner.classList.remove('d-none');
                inputSubmitText.innerText = 'Hantar';
                location.reload(true);
            }
        }, false);

        BalloonEditor.create(inputWished, {
            toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList' ],
            heading: {
                options: [
                    { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                    { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                    { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
                ]
            }
        }).then( editor => {
            inputWished = editor
        }).catch( error => {
            console.error( error );
        } );
    });
})()