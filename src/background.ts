import axios from 'axios'

let arkToken: string|null = null
let oldUrl: string|null = null

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.token) { 
        arkToken = request.token
    }

    if (arkToken && request.hasPasswordInput) {

        Promise.resolve(getUserInfo(sender.url))
            .then(
                data => sendResponse(data)
            )
        return true

    } else {
        sendResponse(null)
    }
})

async function getUserInfo(url: string) {
    if (oldUrl === url) {
        return
    }
    oldUrl = url

    const afterIndex = url.indexOf('.com')
    const beforeIndex = url.indexOf('://')
    url = url.slice(beforeIndex + 3, afterIndex + 4)

    if (!url) {
        return
    }

    const userInfo = await userInfoApi({
        domain: url,
        token: arkToken,
    })

    return userInfo
}

async function userInfoApi(q: {
    domain: string,
    token: string
}) {
    const url = 'http://192.168.3.9:18002/siteapi/oneid/ucenter/sub_account/'
    const data = await axios.get(url, {
        params: {domain: q.domain},
        headers: {'Authorization': 'token ' + q.token}
    }).then((resp) => {
        return resp.data.results
    })
    .catch((error) => {
        console.log(error);
    })
    return data
}