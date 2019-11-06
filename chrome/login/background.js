
'use strict';

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
                        console.log('set token', token);
                    })
                });
                chrome.tabs.remove(tab.id);
            })
        })
    }
    sendResponse('');
});
