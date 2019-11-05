
'use strict';

function getCredentials(){
    return {
        "username": "1881310",
        "password": "1881310"
    }
}

function getUseranmeInput() {
    return document.getElementsByName('login')[0]
}

function getPasswordInput(){
    var inputs = document.getElementsByTagName('input');
    var res = new Array();
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type.toLowerCase() == 'password'){
            res.push(inputs[i]);
        }
    }
    return res[0]
}

function fillCredentials(){
    var credentials = getCredentials();
    getUseranmeInput().value = credentials.username;
    getPasswordInput().value = credentials.password;
}

fillCredentials();