function GM_xmlhttpRequest(details, callback) {
  console.log(details);
   console.log(callback);
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
          console.log("xhr success" + xhr.responseText)
        callback({
          responseText: xhr.responseText,
          error: xhr.error,
        });
      }
      else {
        callback(null);
      }
    }
  }
  xhr.open('GET', details.url, true);
  xhr.send();
};

/**
 * Handles data sent via chrome.extension.sendMessage().
 * @param request Object Data sent in the request.
 * @param sender Object Origin of the request.
 * @param callback Function The method to call when the request completes.
 */
function onMessage(request, sender, callback) {
  console.log('request ' + request);
  console.log(request);
  // Only supports the 'fetchTwitterFeed' method, although this could be
  // generalized into a more robust RPC system.
  if (request.action == 'fetchTwitterFeed') {
    fetchTwitterFeed(callback);
  }
  else if (request.action == 'GM_xmlhttpRequest') {
    GM_xmlhttpRequest(request.details, callback);
  }
  return true;
};

// Wire up the listener.
chrome.extension.onMessage.addListener(onMessage);
