const deploymentId = "AKfycbxvFiegp15U9LnwZfe6DH5h37A8980x-AQ-e-kbaY0Zd4DQ7NhLWpNcseacrzp4gfUh"
const apiUrl = "https://script.google.com/macros/s/" + deploymentId + "/exec";

function getData() {
    fetch(apiUrl)
        .then(d => d.json())
        .then(d => {
            document.getElementById('app').textContent = d.status;
        });
}

document.getElementById('clickMe').addEventListener('click',getData);