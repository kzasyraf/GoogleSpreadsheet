(async () => {
    'use strict'
    const deploymentId = 'AKfycbyGUbPuEy7B1q2ijK_gdspMYPyPy4NAa25jdcC5UFqHGDjdhs7eEwQmbsBHDZhTfrfZ';
    const apiUrl = 'https://script.google.com/macros/s/' + deploymentId + '/exec'

    const authInfo = await fetch(apiUrl + '?hub.mode=publish&hub.verify_token=a136e25f-1cb8-4d1c-af73-142c678398d0', {
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            Accept: 'application/json'
        },
        redirect: 'follow',
    })
    .then(d => d.json());

    console.log('fetch: ' + authInfo);
    
    await fetch(apiUrl + '?hub.mode=data&hub.table=attendance_list&hub.resource_token=' + encodeURIComponent(authInfo['token']), {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // change to cors when publish to github
        cache: 'no-cache',
        //credentials: 'include',
        headers: {
            //Authorization: `${authInfo.token_type} ${authInfo.access_token}`,
            Accept: 'application/json',
            'Content-Type': 'text/plain'
        },
        redirect: 'follow',
        keepalive: true,
        referrer: apiUrl,
        referrerPolicy: 'origin-when-cross-origin',
        body: JSON.stringify({ name: 'Hello', attendance: 'attending', wished: (new Date()).toISOString() })
    })
    .then(d => (d.type !== 'opaque') ? d.json() : null)
    .then(d => {
        const postId = document.getElementById('fetchPost');
        (d) ? postId.innerHTML = '<p>' + JSON.stringify(d) +'</p>' : '';
    });

    await fetch(apiUrl + '?hub.mode=data&hub.table=attendance_list&hub.resource_token=' + encodeURIComponent(authInfo['token']), {
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            Accept: 'application/json'
        },
        redirect: 'follow',
        keepalive: true,
        referrer: apiUrl,
        referrerPolicy: 'origin-when-cross-origin',
    })
    .then(d => (d.type !== 'opaque') ? d.json() : null)
    .then(d => {
        console.log(d);
        const getId = document.getElementById('fetchGet');
        (d) ? getId.innerHTML = '<p>' + JSON.stringify(d) +'</p>' : '';
    });

    
})();