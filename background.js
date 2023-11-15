const url = "https://www.icloud.com.cn/notes";

chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: "OFF",
    });
});

chrome.action.onClicked.addListener(async (tab) => {
    if (tab.url.startsWith(url)) {
        const prevState = await chrome.action.getBadgeText({
            tabId: tab.id
        });
        const nextState = prevState === "OFF" ? "ON" : "OFF";

        await chrome.action.setBadgeText({
            text: nextState,
            tabId: tab.id
        });

        if(nextState === "ON") {
            await chrome.scripting.insertCSS({
                files: ["hide-left-sidebar.css"],
                target: {
                    allFrames: true,
                    tabId: tab.id
                }
            });
        }else if (nextState === "OFF") {
            await chrome.scripting.removeCSS({
                files: ["hide-left-sidebar.css"],
                target: {
                    allFrames: true,
                    tabId: tab.id
                }
            });
        }
    }
});