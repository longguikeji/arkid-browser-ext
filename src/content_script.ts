let observer = new MutationObserver(checkInputType)

observer.observe(document.documentElement, {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
})

function checkInputType(){
    const input = document.getElementsByTagName('input')
    for (let i = 0; i < input.length; i++) {
        if (input[i].type.toLowerCase() === 'password' || input[i].id.indexOf('password2') !== -1) {
            chrome.runtime.sendMessage({
                hasPasswordInput: true
            }, (response) => {
                if (response) {
                    input[i-1].setAttribute('list', 'oneidUserlist')

                    const listNode = document.createElement('datalist')
                    listNode.id = 'oneidUserlist'
                    input[i-1].appendChild(listNode)

                    for (let j = 0; j < response.length; j++) {
                        const optionNode = document.createElement('option')
                        optionNode.innerHTML = response[j].username
                        listNode.appendChild(optionNode)

                    }

                    input[i-1].onchange = () => {
                        for (let k = 0; k < response.length; k++) {
                            if (input[i-1].value === response[k].username) {
                                input[i].value = response[k].password
                                break
                            }
                        }
                    }
                }
            })
        }
    }
}
