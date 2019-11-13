let observer = new MutationObserver(checkInputType)

observer.observe(document.documentElement, {
    characterData: true,
    childList: true,
    subtree: true,
})

function checkInputType(){
    const input = document.getElementsByTagName('input')
    for (let i = 0; i < input.length; i++) {
        if (input[i].type.toLowerCase() === 'password') {
            chrome.runtime.sendMessage({hasPasswordInput: true}, (response) => {
                if (response) {
                    if (i > 0) {
                        input[i-1].value = response.mobile
                    }
                    input[i].value = response.password
                    return 
                }
            })
        }
    }
}
