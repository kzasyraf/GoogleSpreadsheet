(() => {
    'use strict'
    const deploymentId = "AKfycbxDmRJSC3dyP1SkWdd2Tq5ubi72Z1hy0w2DZJZeX-_OD8W3FRy39nE5q76R7SisFPVb";
    const apiUrl = "https://script.google.com/macros/s/" + deploymentId + "/exec"

    let xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl + '?hub.mode=publish&hub.verify_token=a136e25f-1cb8-4d1c-af73-142c678398d0');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.timeout = 30000;
    xhr.send();

    xhr.onload = () => {
        // get the response from xhr.response
        switch(xhr.status) {
            case 200:
                const authInfo = JSON.parse(xhr.response);
                console.log(authInfo.status);
                if(authInfo.status === 200){
                    xhr.abort();
                    xhr.open('POST', apiUrl + '?hub.mode=data&hub.table=attendance_list');
                    //xhr.withCredentials = true;
                    //xhr.setRequestHeader('Authorization', `${authInfo.token_type} ${authInfo.access_token}`);
                    xhr.setRequestHeader('Content-Type', 'text/plain');
                    xhr.send(JSON.stringify({ name: 'Hello', attendance: 'attending', wished: (new Date()).toISOString() }));
                } else if(xhr.readyState === xhr.DONE) {
                    const postId = document.getElementById('xmlhttpPost');
                    postId.innerHTML = '<p>' + xhr.response +'</p>'
                    //xhr.abort();
                }
                
                break;
            default:
                const postId = document.getElementById('xmlhttpPost');
                postId.innerHTML = '<p>' + xhr.statusText + '</p>';
                xhr.abort();
                break;
        }
    };
    xhr.onerror = (e) => {
        const postId = document.getElementById('xmlhttpPost');
        postId.innerHTML = '<p>' + e.timeStamp +'</p>';
    }
})();