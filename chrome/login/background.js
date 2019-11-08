
'use strict';


function sendCredentials(arkidURL, arkidToken, idp, sendResponse){
    $.ajax({
        type: "GET",
        dataType:'json',
        headers: {
            "Authorization": "token " + arkidToken,
        },
        url: arkidURL + "/siteapi/v1/ucenter/sub_account/?idp=" + idp,
        success: function(msg){
            sendResponse(msg.results);
        }
    })
}

chrome.runtime.onMessage.addListener(function(request, _, sendResponse){
    if (request.method == "getToken"){
        chrome.storage.sync.get('arkidURL', function(data){
            chrome.tabs.create({
                active: false,
                url: data.arkidURL,
            }, function(tab){
                chrome.tabs.executeScript(tab.id, {
                    code: "localStorage.getItem('oneid');",
                }, function(result){
                    var token = result[0];
                    chrome.storage.sync.set({'arkidToken': token}, function(){
                        chrome.tabs.remove(tab.id);
                        sendCredentials(data.arkidURL, token, request.idp, sendResponse);
                    })
                });
            })
        })
    }
    return true;
});
