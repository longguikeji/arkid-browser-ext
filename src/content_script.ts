const input = document.getElementsByTagName('input')

for (let i = 0; i < input.length; i++) {
  if (input[i].type.toLowerCase() === 'password') {
    chrome.runtime.sendMessage({
      hasPasswordInput: true
    }, (response) => {
      if (response) {
        let index = i - 1

        if (input[index].id.indexOf('password2') > -1) { //处理特殊情况http://www.hwjob365.com/
          index -= 1
        }

        const usernameInput = input[index]
        const passwordInput = input[i]

        const newInput = document.createElement('input')

        addInputClass(newInput, usernameInput)

        usernameInput.parentElement.insertBefore(newInput, usernameInput)

        createUserlist(newInput, response)

        newInput.onchange = () => {
          for (let k = 0; k < response.length; k++) {
            if (newInput.value === response[k].username) {
              usernameInput.value = response[k].username
              passwordInput.value = response[k].password
              newInput.value = ''
              if (i - index == 2) {
                input[i].value = '••••••••' //处理特殊情况http://www.hwjob365.com/
              }
              break
            }
          }
        }
      }
    })
  }
}

function createUserlist(usernameInput: HTMLElement, response: [{
    username: string,
    password: string
  }]) {
        usernameInput.setAttribute('list', 'oneidUserlist')

        const listNode = document.createElement('datalist')
        listNode.id = 'oneidUserlist'
        usernameInput.parentElement.insertBefore(listNode, usernameInput)

        for (let j = 0; j < response.length; j++) {
          const optionNode = document.createElement('option')
          optionNode.innerHTML = response[j].username
          listNode.appendChild(optionNode)
        }
}

function addInputClass(newInput: HTMLElement, usernameInput: HTMLElement) {
  newInput.className = 'extension-input'

  const parentHeight = usernameInput.parentElement.offsetHeight
  const top = parentHeight / 2 - 7
  newInput.style.top = top + 'px'
}