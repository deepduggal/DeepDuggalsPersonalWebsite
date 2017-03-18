/** 
 * @descrip minAjax.js - A Minimalistic Pure JavaScript Header for Ajax POST/GET Request )
 * @authors flouthoc - http://github.com/flouthoc, Deep Duggal - http://github.com/waxter013
 */

/**
 * Creates a new XMLHttpRequest (or ActiveXObject for older browsers)
 * @return xmlhttp - An XMLHttpRequest or ActiveXObject
 */
function initXMLhttp() {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        //code for IE7,firefox chrome and above
        xmlhttp = new XMLHttpRequest();
    } else {
        //code for Internet Explorer
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    return xmlhttp;
}

/**
 * Makes an AJAX request
 * @param url [REQUIRED] [String]
 * @param opts [OPTIONAL] [Object]
 * @param opts.type [OPTIONAL] [String]
 * @param opts.method [OPTIONAL] [String]
 * @param opts.debugLog [OPTIONAL] [Boolean]
 * @param opts.data [OPTIONAL] [Object]
 * @param opts.success [OPTIONAL] [Function]
 */
function minAjax(url, opts) {

    /*opts Structure
        opts
            type: "GET or POST"
            method: "True for async and False for Non-async | By default its Async"
            debugLog: "To display Debug Logs | By default it is false"
            data: "another Nested Object which should contains reqested Properties in form of Object Properties"
            success: "Callback function to process after response | function(data,status)"
    */

    /*Error Handling*/
    if (!url) {
        //TO DO: Throw Error (missing url parameter)
        return;
    }
    else if(typeof url !== 'string') {

    }
    else if(opts.type !== 'GET' || opts.type !== 'POST') {
        //Throw Error (opts.type must be either 'GET' or 'POST')
    }
    if(typeof opts.success !== 'function') {
        //Throw Error (opts.success must be a function)
    }

    //Set default values if one is not given for optional params
    if (!opts.type) {
        opts.type = 'GET';
    }
    if (!opts.method) {
        opts.method = true;
    }
    if (!opts.debugLog) {
        opts.debugLog = false;
    }


    //Create a new XMLHttpRequest or ActiveXObject
    var xmlhttp = initXMLhttp();

    xmlhttp.onreadystatechange = function() {
        //If request is done
        if (xmlhttp.readyState === 4 && xmlhttp.status == 200) {
            // Call success callback if it exists
            if (opts.success) {
                opts.success(xmlhttp.responseText, xmlhttp.readyState);
            }
            
            if (opts.debugLog === true)
                console.log("SuccessResponse");
            if (opts.debugLog === true)
                console.log("Response Data:" + xmlhttp.responseText);

        }
        //If Error
        else {
            //Do this upon failure
            if (opts.debugLog == true)
                console.log("FailureResponse --> State:" + xmlhttp.readyState + "Status:" + xmlhttp.status);
        }
    }

    var sendString = [],
        sendData = opts.data;

    if( typeof sendData === "string" ){
        var tmpArr = String.prototype.split.call(sendData,'&');

        for(var i = 0, j = tmpArr.length; i < j; i++){
            var datum = tmpArr[i].split('=');
            sendString.push(encodeURIComponent(datum[0]) + "=" + encodeURIComponent(datum[1]));
        }

    }
    else if( typeof sendData === 'object' && !( sendData instanceof String || (FormData && sendData instanceof FormData) ) ){
        
        for (var k in sendData) {

            var datum = sendData[k];

            if( Object.prototype.toString.call(datum) == "[object Array]" ){

                for(var i = 0, j = datum.length; i < j; i++) {
                        sendString.push(encodeURIComponent(k) + "[]=" + encodeURIComponent(datum[i]));
                }

            }
            else{
                sendString.push(encodeURIComponent(k) + "=" + encodeURIComponent(datum));
            }
        }
    }
    sendString = sendString.join('&');

    //GET request
    if (opts.type == "GET") {
        xmlhttp.open("GET", url + "?" + sendString, opts.method);
        xmlhttp.send();

        if (opts.debugLog == true)
            console.log("GET fired at:" + url + "?" + sendString);
    }
    //POST request
    if (opts.type == "POST") {
        xmlhttp.open("POST", url, opts.method);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(sendString);

        if (opts.debugLog == true)
            console.log("POST fired at:" + url + " || Data:" + sendString);
    }
}