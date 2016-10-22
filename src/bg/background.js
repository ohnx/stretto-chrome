var dirJoin = function(a, b) {
    if (a.slice(-1) != '/') {
        return a + '/' + b;
    } else {
        return a + b;
    }
}

chrome.commands.onCommand.addListener(function(command) {
    chrome.storage.sync.get({
        remoteUrl: "",
        remoteName: ""
    }, function(items) {
        if (items.remoteUrl == "") return;
        chrome.tabs.query({url: dirJoin(items.remoteUrl, "")}, function(tabs) {
            // if no tab found, open a new one
            if (tabs.length == 0) {
                chrome.tabs.create({ url: items.remoteUrl });
            }
            var thing = dirJoin(items.remoteUrl, "command/"+items.remoteName+"/"+command);
            var xhr = new XMLHttpRequest();
            xhr.open("GET", thing, true);
            xhr.send();
        });
    });
});

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.storage.sync.get({
        remoteUrl: ""
    }, function(items) {
        if (items.remoteUrl == "") { alert('Please set a location in the settings.'); return; }
        chrome.tabs.query({url: dirJoin(items.remoteUrl, "")}, function(tabs) {
            // if no tab found, open a new one
            if (tabs.length == 0) {
                chrome.tabs.create({ url: items.remoteUrl });
            } else {
                chrome.tabs.update(tabs[0].tabId, {active: true, highlighted: true});
            }
        });
    });
});
