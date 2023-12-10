const deploymentId = "AKfycbw7m5wO_6Gq65qyTfAuZxzFn-0V6IsmHjBxQLYx9uk0mM2XuoAtKQ-Gzwb0oZO-ZdcD"
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

async function postData(data) {
    let response = await fetch(apiUrl, {
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
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation');
    const myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});
    const myToggle = document.getElementById('doPost');

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault();
                var inputName = document.getElementById('inputName');
                var inputAttendance = document.getElementById('inputAttendance');
                var inputWished = document.getElementById('inputWished');
                postData({
                    name: inputName.value,
                    attendance: inputAttendance.value,
                    wished: inputWished.value
                });
                myModal.show(myToggle);
            }
            form.classList.add('was-validated')
        }, false)
    });
})()