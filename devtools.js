console.log("This is console for devtools.html");
console.log("tabId:- ", chrome.devtools.inspectedWindow.tabId)

let config = {
    url: "/catalog/trace/"
};


/* -------------------------- MESSAGE HANDLING  -------------------------- */


chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.greeting == "Tab Opened") {
            console.log(request.tab);
            debugger;
            sendResponse({
                recording: "Then Enjoy The New Tab"
            });
        }
    });


/* -------------------------- NETWORK REQUEST HANDLING  -------------------------- */


chrome.devtools.network.onRequestFinished.addListener(function (request) {
    if (request.request.url.includes(config.url)) {
        console.log("Request = ", request);
        try {
            chrome.storage.sync.get(["checked_status"], function (result) {
                if (result.checked_status)
                    updateTraceInfo(request);
                else
                    console.log("Please Turn on Record Button to Start Recording.");
            });
        } catch (e) {
            console.log(e);
            window.alert(e);
        }
    } else
        console.log("The Request is to Some other Remote Host");



});


/* -------------------------- NETWORK REQUEST HANDLING by WEBREQUEST  -------------------------- */



/* -------------------------- EXTRA PANEL CREATION IN DEVELOPER TOOLS  -------------------------- */

chrome.devtools.panels.create("Traceptor",
    "MyPanelIcon.png",
    "Panel.html",
    function (panel) {
        // code invoked on panel creation
    }
);

/* -------------------------- STORAGE MANAGEMENT  -------------------------- */

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (var key in changes) {
        var storageChange = changes[key];
        console.info('Old result["traceArr"] = ', storageChange.oldValue);
        console.log('Storage key "%s" in namespace "%s" changed. ' +
            'Old value was "%s", new value is "%s".',
            key,
            namespace,
            storageChange.oldValue,
            storageChange.newValue);


        console.info('New result["traceArr"] = ', storageChange.newValue);


    }
});

/* -------------------------- FUNCTIONS  -------------------------- */

function updateTraceInfo(request) {
    if (request.request.url.includes(config.url)) { //Just An Extra Check
        let traceObj = getTraceObj(request);
        pushTraceObj(traceObj);
        chrome.storage.sync.get(['traceArr'], function (result) {
            console.log("-----------        TRACE UPDATED       ------------- ");
        });
    } else {
        console.log("This is Else part and the requrst if to = = ", request.request.url);
    }

}

function getTraceObj(request) {
    let traceObj = {};
    if (request.request.url.includes(config.url)) {
        traceObj["url"] = request.request.url;
        traceObj["status"] = request.response.status;
        for (head of request.response.headers) {
            if (head["name"] === "X-B3-TraceId") {
                traceObj["X-B3-TraceId"] = head["value"];
            } else if (head["name"] === "X-B3-SpanId") {
                traceObj["X-B3-SpanId"] = head["value"];
            }

        }
    }
    return traceObj;
}

function pushTraceObj(traceObj) {
    chrome.storage.sync.get(['traceArr'], function (result) {

        if (result['traceArr'] == null)
            result['traceArr'] = [];
        result['traceArr'].push(traceObj);
        chrome.storage.sync.set({
            'traceArr': result['traceArr']
        }, function () {
            // console.log("New TraceArr updated");
        });
    });
}