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
        if (input[i].type.toLowerCase() === 'password') {
            chrome.runtime.sendMessage({
                hasPasswordInput: true
            }, (response) => {
                if (response) {
                    let index = i - 1

                    if (input[index].id.indexOf('password') > -1) {
                        index -= 1
                    }

                    input[index].setAttribute('list', 'oneidUserlist')

                    const listNode = document.createElement('datalist')
                    listNode.id = 'oneidUserlist'
                    input[index].appendChild(listNode)

                    for (let j = 0; j < response.length; j++) {
                        const optionNode = document.createElement('option')
                        optionNode.innerHTML = response[j].username
                        listNode.appendChild(optionNode)

                    }

                    input[index].onchange = () => {
                        for (let k = 0; k < response.length; k++) {
                            if (input[index].value === response[k].username) {
                                input[i].setAttribute('value', response[k].password)
                                if (i - index == 2) {
                                    input[i-1].value = '··········'
                                }
                                break
                            }
                        }
                    }
                }
            })
        }
    }
}
