console.log("background.js conc")
console.log("manifest = ", chrome.runtime.getManifest());
debugger;

chrome.runtime.onInstalled.addListener(function (param) {
    console.log("param = ", param);
    chrome.storage.sync.set({
        color: '#3aa757',
        traceArr: null

    }, function () {
        console.log("The color is Green");
    });
    chrome.storage.sync.set({
        checked_status: false
    }, function () {})



    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {

        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostEquals: 'developer.chrome.com'
                    }
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostEquals: 'www.google.com'
                    },
                    css: ["input[type='text']"]
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostEquals: 'www.google.co.in'
                    },
                    css: ["input[type='text']"]
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostContains: 'localhost'
                    }
                })


            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]


        }]);

    })




    chrome.storage.sync.set({
        "checked_status": false
    }, function () {
        console.log('Value of Record Check Box in background.js is set to ' + false);
    });



    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.text == "Hi") {
            let resp = {
                "one": 1,
                "two": 22,
                request: request,
                sender: sender
            };
            console.log("Message id \"Hi\"");
            debugger;
            chrome.storage.sync.set({
                'address': request.address
            });
            debugger;
            sendResponse(resp);
        }

        if (request.text == "runContentScript") {
            // chrome.tabs.executeScript({
            //     file: 'contentScript.js'
            // })
            sendResponse({
                text: "contentScript Response"
            });
        }

        return true;
    });






});