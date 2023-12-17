// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
    const deploymentId = "AKfycbxDmRJSC3dyP1SkWdd2Tq5ubi72Z1hy0w2DZJZeX-_OD8W3FRy39nE5q76R7SisFPVb";
    const apiUrl = "https://script.google.com/macros/s/" + deploymentId + "/exec"

    const postData = async (table, data) => {
        const authInfo = await fetch(apiUrl + '?hub.mode=publish&hub.verify_token=a136e25f-1cb8-4d1c-af73-142c678398d0', {
            mode: "cors",
            cache: "no-cache",
            headers: {
                Accept: "application/json",
            },
            redirect: "follow",
        })
            .then(d => d.ok ? d.json() : '')
            .then(async (d) => {
                if (d.status === 200) {
                    await fetch(apiUrl + '/data?hub.table=' + table, {
                        method: "POST", // *GET, POST, PUT, DELETE, etc.
                        mode: "no-cors",
                        cache: "no-cache",
                        credentials: "include",
                        headers: {
                            Authorization: `${d.token_type} ${d.access_token}`,
                            Accept: "application/json"
                        },
                        redirect: "follow",
                        body: JSON.stringify(data)
                    });
                } else {
                    bootstrapToast.show();
                    inputName.disabled = false;
                    inputAttendance.disabled = false;
                    inputWished.disableReadOnlyMode('my-feature-id');
                    inputSubmit.disabled = false;
                    inputSubmitSpinner.classList.add('d-none');
                    inputSubmitText.innerText = 'Hantar';
                }
            })
            .catch(e => console.log(e));
        return authInfo;
    };

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
                postData(form.id + '_table', {
                    name: inputName.value,
                    attendance: inputAttendance.value,
                    wished: inputWished.getData()
                }).finally(() => {
                    bootstrapModal.show(inputSubmit);
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
                inputName.disabled = false;
                inputAttendance.disabled = false;
                inputWished.disableReadOnlyMode('my-feature-id');
                inputWished.setData('');
                inputSubmit.disabled = false;
                inputSubmitSpinner.classList.add('d-none');
                inputSubmitText.innerText = 'Hantar';
                bootstrapModal.hide();
                form.reset();
            }
        }, false);
    });
})()