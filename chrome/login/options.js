// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
let input = document.getElementById('arkid')
let submitButton = document.getElementById('submit')

function constructOptions(){
    chrome.storage.sync.get('arkid', function(data){
        input.value = data.arkid;
    })
    submitButton.addEventListener(
        'click', function(){
            var arkidAddr = input.value;
            chrome.storage.sync.set({arkid: arkidAddr}, function(){
                console.log('set arkid as ' + arkidAddr);
            })
        }
    )
}
constructOptions()
