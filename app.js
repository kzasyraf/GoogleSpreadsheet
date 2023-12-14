import config from './config.json' assert { type: "json" };
const apiUrl = "https://script.google.com/macros/s/" + config.deploymentId + "/exec";

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

function postData(table, data) {
    let response = fetch(apiUrl + "?table=" + table, {
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
        .then(d => (d.status === 201) ? true : false);
    return response;
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'

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

        form.addEventListener('submit', event => {
            if(!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
                form.classList.add('invalid');
            }
            form.classList.add('was-validated');
        }, false);

        const inputName = document.getElementById(`${form.id}_name`);
        const inputAttendance = document.getElementById(`${form.id}_attendance`);
        const inputWished = document.getElementById(`${form.id}_wished`);
        const inputSubmit = document.getElementById(`${form.id}_submit`);
        inputSubmit.addEventListener('click', event => {
            if(form.checkValidity()){
                event.preventDefault();
                form.classList.remove('invalid');
                var post = postData(form.id + '_table', {
                    name: inputName.value,
                    attendance: inputAttendance.value,
                    wished: inputWished.value
                });
                (post) ? bootstrapModal.show(inputSubmit) : bootstrapToast.show();
            }
        }, true);

        const inputClose = document.getElementById(`${form.id}_modal_close`);
        inputClose.addEventListener('click', event => {
            if(form.checkValidity()){
                event.preventDefault();
                location.reload(true);
            }
        }, false);
    });
})()