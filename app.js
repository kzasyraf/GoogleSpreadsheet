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
        .then(d => (d.status === 201) ? true : false);
    return response || false;
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

        const inputName = document.getElementById(`${form.id}_name`);
        const inputAttendance = document.getElementById(`${form.id}_attendance`);
        const inputWished = document.getElementById(`${form.id}_wished`);
        const inputSubmit = document.getElementById(`${form.id}_submit`);
        form.addEventListener('submit', event => {
            if(!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault();
                event.stopPropagation();
                const post = postData(form.id + '_table', {
                    name: inputName.value,
                    attendance: inputAttendance.value,
                    wished: inputWished.value
                });
                (post) ? bootstrapModal.show(inputSubmit) : bootstrapToast.show();
            }
            form.classList.add('was-validated');
        }, true);

        const inputClose = document.getElementById(`${form.id}_modal_close`);
        inputClose.addEventListener('click', event => {
            location.reload(true);
        }, true);
    });
})()