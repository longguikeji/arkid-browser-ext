let token: string|null = null

let arkObserver = new MutationObserver(() => {
  token = localStorage.getItem('oneid')
  if (token) {
    chrome.runtime.sendMessage({
      token,
    })
  }
})

arkObserver.observe(document.documentElement, {
    characterData: true,
    childList: true,
    subtree: true,
})