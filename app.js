const deploymentId = "AKfycbyjDacz6vpgDObKexG7TuQeToKBXdxK2CLJCqXvjVIpfIyGdygDA5vnga5BTOuM751L"
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

async function postData() {
    const data = {
        "First Name": "My Name",
        "Last Name": "is John",
        "Application": "google",
        "Date": "2023-12-20T17:39:48.833Z"
    };
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
    .then(d => {
        document.getElementById('app').textContent = d.status;
    });
}

document.getElementById('doGet').addEventListener('click',getData);
document.getElementById('doPost').addEventListener('click',postData);