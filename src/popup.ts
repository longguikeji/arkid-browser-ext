import * as $ from 'jquery';

$(function() {
  $('#submit').click(() => {
    const arkUrl = $('#url').val()
    chrome.storage.sync.set({
      arkUrl,
    }, () => {
      chrome.runtime.reload()
      window.close()
    })
  })
})