/** 
 * @descrip minAjax.js - A Minimalistic Pure JavaScript Header for Ajax POST/GET Request )
 * @authors flouthoc - http://github.com/flouthoc, Deep Duggal - http://github.com/waxter013
 */

/**
 * Makes an AJAX request
 * @param url [REQUIRED] [String]
 * @param opts [OPTIONAL] [Object]
 *   @param opts.type [OPTIONAL] [String] - "GET or POST"
 *   @param opts.method [OPTIONAL] [String] - "True for async. False for non-async | Default: Async"
 *   @param opts.data [OPTIONAL] [Object] - "The response to be sent"
 *   @param opts.success [OPTIONAL] [Function] - "Callback function to process after response | function(data,status)"
 */
function minAjax(url, opts) {
    /////////////////////////////////////////////////////////////////
    /*Error Handling*/
    /////////////////////////////////////////////////////////////////
    if (!url) {
        //TO DO: Throw Error (missing url parameter)
        return '';
    } else if (typeof url !== 'string') {
        //ERROR
    }
    if (typeof opts.success !== 'function') {
        //Throw Error (opts.success must be a function)
        return '';
    }

    //Set default values if one is not given for optional params
    opts.method = opts.method || true;


    //Create a new XMLHttpRequest or ActiveXObject
    var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Call success callback if it exists
            if (opts.success) {
                opts.success(xhr.responseText, xhr.readyState);
            }
        }
        //TODO: Fix this. Will give error for any readyState !== 4 ?
        //If Error
        else {
            console.log("FailureResponse --> State:" + xhr.readyState + ", Status:" + xhr.status);
        }
    }

    /////////////////////////////////////////////////////////////////
    /* Response Prep */
    /////////////////////////////////////////////////////////////////
    var sendString = [],
        sendData = opts.data;

    //If given send data is a string...
    if (typeof sendData === "string") {
        //TODO: Error? Is this storing the function or just calling it with different scope?
        var tmpArr = String.prototype.split.call(sendData, '&');

        //*Convert data to one string
        for (var i = 0, j = tmpArr.length; i < j; i++) {
            var datum = tmpArr[i].split('=');
            sendString.push(encodeURIComponent(datum[0]) + "=" + encodeURIComponent(datum[1]));
        }
    }

    /////////////////////////////////////////////////////////////////
    /*Perform Request & Response*/
    /////////////////////////////////////////////////////////////////
    if (opts.type === "POST") {
        xhr.open("POST", url, opts.method);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(sendString);
    }
    else {
        xhr.open("GET", url + "?" + sendString, opts.method);
        xhr.send();
    }
}