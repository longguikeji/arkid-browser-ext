import axios from 'axios'

let arkToken: string|null = null
let oldUrl: string|null = null

chrome.runtime.onMessage.addListener( async (request, sender, sendResponse) => {
    if (request.token) {
        arkToken = request.token
    }
    if (arkToken && request.hasPasswordInput) {
        const userInfo = await getUserInfo(sender.url)
        sendResponse(userInfo)
    } else {
        sendResponse(null)
    }
})

async function getUserInfo(url: string) {
    if (oldUrl === url) {
        return null
    }
    oldUrl = url

    const index = url.indexOf('.com')
    url = url.slice(0, index + 4)

    const userInfo = await userInfoApi({
        website: url,
        token: arkToken,
    })
    return userInfo
    // return [{
    //     username: 'admin',
    //     password: 'admin',
    // }, {
    //     username: '22',
    //     password: '222',
    // }]
}

async function userInfoApi(q: {
    website: string,
    token: string
}) {
    const url = 'http://192.168.3.49:8000/siteapi/v1/third_accounts/'
    const data = await axios.get(url, {
        params: {website: q.website},
        headers: {'Authorization': 'token ' + q.token}
    }).then((resp) => {
        return resp.data
    })
    .catch((error) => {
        console.log(error);
    })
    return data
}