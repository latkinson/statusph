function XMR(data) {
    "use strict";

    switch(data.task) {

        case "initialize": {
            return;
        }
        case "request": {
            makeCorsRequest("http://localhost/content/" + data.file, data.element);
            return;
        }
    }
}
// Create the XHR object.
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}

// Helper method to parse the title tag from the response.
function getTitle(text) {
    return text.match('<title>(.*)?</title>')[1];
}

// Make the actual CORS request.
function makeCorsRequest(url, element) {

    var url = url;

    var xhr = createCORSRequest('GET', url);
    if (!xhr) {
        self.postMessage('CORS not supported');
        return;
    }

    // Response handlers.
    xhr.onload = function() {
        var text = xhr.responseText;
        var title = getTitle(text);
        self.postMessage({
            content: text,
            title: title,
            element: element
        })
    };

    xhr.onerror = function() {
        self.postMessage('Woops, there was an error making the request.');
    };

    xhr.send();
}


self.addEventListener("message", function(e) {
    XMR(e.data);
}, false);

