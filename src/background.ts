console.log("start")

const clickListener = (tab: chrome.tabs.Tab) => {
    console.log("clicked!")
    console.log("tabID : ", tab.id)
    console.log("url : ", tab.url)
    console.log("title : ", tab.title)
    if (typeof tab.url !== 'undefined' && typeof tab.title !== 'undefined'){
        openTweetTab(removeGetParameter(tab.url), tab.title)
    }
}

chrome.browserAction.onClicked.addListener(clickListener);

const openTweetTab = (url: string, title: string) => {
    const tweetUrl = "https://twitter.com/intent/tweet"
    const parameters = "?text=" + encodeURI(title) + "&url=" + url
    chrome.tabs.create({url: tweetUrl+parameters})
};

const removeGetParameter = (origin: string): string => {
    let url = new URL(origin)
    const host = url.host
    const path = url.pathname
    if(host.match(/amazon.co.jp/)){
        // Amazon は特殊な置き換えをする
        return host + rewriteAmazonJPParameter(path)
    }else if(host.match(/www.youtube.com/)){
        // Youtube はビデオIDがパラメータにあるので拾ってくる
        return host + path + getYoutubeVideoParameter(url.searchParams)
    }
    return host + path
}

const rewriteAmazonJPParameter = (path: string): string => {
    return path.replace("gp", "dp").replace("product/", "")
}

const getYoutubeVideoParameter = (params: URLSearchParams): string => {
    return "?v=" + params.get("v")
}
