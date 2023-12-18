(() => {
    'use strict'
    const deploymentId = "AKfycbxDmRJSC3dyP1SkWdd2Tq5ubi72Z1hy0w2DZJZeX-_OD8W3FRy39nE5q76R7SisFPVb";
    const apiUrl = "https://script.google.com/macros/s/" + deploymentId + "/exec"

    let xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl + '?hub.mode=publish&hub.verify_token=a136e25f-1cb8-4d1c-af73-142c678398d0');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = function () {
        // get the response from xhr.response
        switch(xhr.status) {
            case 200:
                const authInfo = xhr.response;
                console.log('XMLHttpRequest: ' + authInfo);
                if(xhr.readyState === 4 && authInfo.status !== 201){
                    xhr.abort();
                    xhr.open('POST', apiUrl + '/data?hub.table=attendance_list');
                    //xhr.withCredentials = true;
                    //xhr.setRequestHeader('Authorization', `${authInfo.token_type} ${authInfo.access_token}`);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.send(JSON.stringify({ name: 'Hello', attendance: 'attending', wished: (new Date()).toISOString() }));
                }
                break;
            default:
                console.log('Error: ' + xhr.status);
                break;
        }
    };
})();