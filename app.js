const deploymentId = "AKfycbzP99rKytmQZuW4xXJfDpOolGLeHbylfBw4sAsFFaBj0x7Th9XFjI2wWosKuzgHcuTb"
const apiUrl = "https://script.google.com/macros/s/" + deploymentId + "/exec";

function getData() {
    const response = fetch(apiUrl)
        .then(d => d.ok ? d.json() : '')
        .then(d => {
            document.getElementById('app').textContent = d.status;
        });
}

async function postData() {
    const data = {
        status: "POST",
        data: []
    }
    let response = await fetch(apiUrl, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        //cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Accept": "application/json",
          "Accept-Encoding": "gzip, deflate, br",
          "Connection": "keep-alive"
        },
        redirect: "follow", // manual, *follow, error
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    .then(d => (d.ok || d.redirected) ? d.json() : '')
    .then(d => {
        document.getElementById('app').textContent = d.status;
    });
}

document.getElementById('doGet').addEventListener('click',getData);
document.getElementById('doPost').addEventListener('click',postData);