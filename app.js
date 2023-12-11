const deploymentId = "AKfycbz1CBBgotL_N5DjKD118UoHMltrAy3HAD9dtsFgbdvVV975bjJl5hIgzto6ugYsmSe4"
const apiUrl = "https://script.google.com/macros/s/" + deploymentId + "/exec";

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
    return response;
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation');
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        const viewModal = new bootstrap.Modal(document.getElementById(form.id + '_modal'), {});
        form.addEventListener('submit', event => {
            event.preventDefault();
            if (!form.checkValidity()) {
                event.stopPropagation();
            } else {
                const inputName = document.getElementById(form.id + '_name');
                const inputAttendance = document.getElementById(form.id + '_attendance');
                const inputWished = document.getElementById(form.id + '_wished');
                const inputSubmit = document.getElementById(form.id + '_submit');
                var post = postData(form.id + '_table', {
                    name: inputName.value,
                    attendance: inputAttendance.value,
                    wished: inputWished.value
                });
                if(post) {
                    (inputAttendance.value === 'attending') ? viewModal.show(inputSubmit) : location.reload();
                }
            }
            form.classList.add('was-validated');
        }, false);

        const inputClose = document.getElementById(`${form.id + '_modal_close'}`);
        inputClose.addEventListener('click', event => {
            // Refresh the page and bypass the cache
            location.reload(true);
        }, false);
    });
})()