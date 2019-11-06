
'use strict';

function withCredentials(fillCredentials, idp){
    chrome.runtime.sendMessage({method: "getToken"}, function(_){
        chrome.storage.sync.get(['arkidURL', 'arkidToken'], function(data){
            withToken(data.arkidURL, data.arkidToken, fillCredentials, idp)
        });
    });
}

function withToken(arkidURL, arkidToken, fillCredentials, idp){
    $.ajax({
        type: "GET",
        url: arkidURL + "/siteapi/v1/ucenter/account/?idp=" + idp,
        headers: {
            "Authorization": "token " + arkidToken
        },
        success: function(msg){
            fillCredentials(msg);
        }
    })
}
