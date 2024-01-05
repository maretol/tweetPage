console.log("start")

const clickListener = (tab: chrome.tabs.Tab) => {
    console.log("clicked!")
    console.log("tabID : ", tab.id)
    console.log("url : ", tab.url)
    console.log("title : ", tab.title)
    if (typeof tab.url !== 'undefined' && typeof tab.title !== 'undefined'){
        openPostTab(removeGetParameter(tab.url), tab.title)
    }
}

chrome.browserAction.onClicked.addListener(clickListener);

const openPostTab = (url: string, title: string) => {
    const postUrl = "https://nostter.app/post"

    const message = createMessage(title, url)
    const parameters = {content: message}
    const paramString = new URLSearchParams(parameters).toString()
    chrome.tabs.create({url: postUrl+"?"+paramString})
};

const createMessage = (title: string, url: string): string => {
    return title + "\n" + url + "\n"
}

const removeGetParameter = (origin: string): string => {
    let url = new URL(origin)
    const protocol = url.protocol + "//"
    const host = url.host
    const path = url.pathname
    if(host.match(/amazon.co.jp/)){
        // Amazon は特殊な置き換えをする
        return protocol + host + rewriteAmazonJPParameter(path)
    }else if(host.match(/www.youtube.com/)){
        // Youtube はビデオIDがパラメータにあるので拾ってくる
        return protocol + host + path + getYoutubeVideoParameter(url.searchParams)
    }
    return protocol + host + path
}

const rewriteAmazonJPParameter = (path: string): string => {
    return path.replace("gp", "dp").replace("product/", "")
}

const getYoutubeVideoParameter = (params: URLSearchParams): string => {
    return "?v=" + params.get("v")
}
