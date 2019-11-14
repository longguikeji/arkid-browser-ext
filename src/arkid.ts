let token: string|null = null

let arkObserver = new MutationObserver(() => {
  token = localStorage.getItem('oneid')
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