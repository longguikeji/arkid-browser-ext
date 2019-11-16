let token: string|null = null
const originUrl = window.location.origin

chrome.storage.sync.get(['arkUrl'], (result) => {
  if (result.arkUrl && result.arkUrl === originUrl) {
    let arkObserver = new MutationObserver(() => {
      token = localStorage.getItem('oneid')
      console.log(token)

      if (token) {
        chrome.runtime.sendMessage({
          token,
        }, () => {})
      }
    })

    arkObserver.observe(document.documentElement, {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true,
    })
  }
})

