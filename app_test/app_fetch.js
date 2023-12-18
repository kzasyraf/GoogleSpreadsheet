(async () => {
    'use strict'
    const deploymentId = 'AKfycbxDmRJSC3dyP1SkWdd2Tq5ubi72Z1hy0w2DZJZeX-_OD8W3FRy39nE5q76R7SisFPVb';
    const apiUrl = 'https://script.google.com/macros/s/' + deploymentId + '/exec'

    const authInfo = await fetch(apiUrl + '?hub.mode=publish&hub.verify_token=a136e25f-1cb8-4d1c-af73-142c678398d0', {
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            Accept: 'application/json'
        },
        redirect: 'follow',
    })
    .then(d => d.json())
    .catch(e => console.log(e));

    console.log('fetch: ' + authInfo);
    
    const postData = await fetch(apiUrl + '/data?hub.table=attendance_list', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'no-cors', // change to cors when publish to github
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            Authorization: `${authInfo.token_type} ${authInfo.access_token}`,
            Accept: 'application/json',
            'Content-Type': 'text/plain'
        },
        redirect: 'follow',
        keepalive: true,
        referrer: apiUrl,
        referrerPolicy: 'origin-when-cross-origin',
        body: JSON.stringify({ name: 'Hello', attendance: 'attending', wished: (new Date()).toISOString() })
    })
    .then(d => d.json())
    .catch(e => console.log(e));
    console.log(postData);

    const getData = await fetch(apiUrl + '/data?hub.table=attendance_list', {
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            Accept: 'application/json'
        },
        redirect: 'follow',
    })
    .then(d => d.json())
    .catch(e => console.log(e));

})();