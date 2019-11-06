
'use strict';

var idp = "liepin";

function getUseranmeInput() {
    return $("[name=login]")[0]
}

function getPasswordInput(){
    return $("input[type=password]")[0]
}


function fillCredentials(credentials){
    // TODO： 多账号的选择
    var credential = credentials[0];
    getUseranmeInput().value = credential.username;
    getPasswordInput().value = credential.password;
}


withCredentials(fillCredentials, idp);
