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

        createUserlist(input[index], response)

        input[index].onchange = () => {
          for (let k = 0; k < response.length; k++) {
            if (input[index].value === response[k].username) {
              input[i].setAttribute('value', response[k].password)
              if (i - index == 2) {
                input[i-1].value = '··········' //处理特殊情况http://www.hwjob365.com/
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
        usernameInput.setAttribute('autocomplete', 'off')

        const listNode = document.createElement('datalist')
        listNode.id = 'oneidUserlist'
        usernameInput.appendChild(listNode)

        for (let j = 0; j < response.length; j++) {
          const optionNode = document.createElement('option')
          optionNode.innerHTML = response[j].username
          listNode.appendChild(optionNode)
        }
}
