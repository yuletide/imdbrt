function GM_xmlhttpRequest(details) {
    chrome.extension.sendMessage({'action': 'GM_xmlhttpRequest', 'details': details}, details.onload);
}
