console.log('Stealth active');

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        // read `newIconPath` from request and read `tab.id` from sender
        if (request.newIconPath) {
            chrome.browserAction.setIcon({
                path: request.newIconPath,
                tabId: sender.tab.id
            });
        }
    });
