let arkToken: string|null = null
let oldUrl: string|null = null

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.token) {
        arkToken = request.token
        return
    }
    if (arkToken && request.hasPasswordInput) {
        sendResponse(getUserInfo(sender.url)) 
    }
})

function getUserInfo(url) {
    if (oldUrl === url) {
        return
    }
    oldUrl = url

    const index = url.indexOf('.com')
    url = url.slice(0, index + 4)

    // console.log('url', url)
    // console.log('token', arkToken)

    const response = {
        mobile: '',
        password: '',
    }
    return response
}