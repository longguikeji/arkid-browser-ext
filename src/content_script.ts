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
        usernameInput.parentElement.insertBefore(newInput, usernameInput)

        addInputClass(newInput, usernameInput)

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
  if (newInput.parentElement.style.position == '') {
    newInput.parentElement.style.setProperty('position', 'relative', 'important') // 处理父节点无 position 的情况
  }

  newInput.className = 'extension-input'

  const parentHeight = usernameInput.parentElement.offsetHeight
  let top = parentHeight / 2 - 7
  if (top < 0) {
    newInput.style.setProperty('position', 'relative', 'important') // 暂时处理特殊情况 passport.liepin.com TODO
    top = 40
  }
  newInput.style.top = top + 'px'
}