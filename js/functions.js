var app = {


    view: new UIHandler(new UIDefinitions),

    initialize: function() {
    app.view.initialize();

    }
}

function urldecode(str) {
    return decodeURIComponent((str+'').replace(/\+/g, '%20'));
}

var transform = function (element, name, value) {
    element.style[name] = value;
}

window.onload = function() {
    app.initialize();
    IOConnection.serverConnection("69.197.35.54", 9092);
    alert("Add locations by clicking on location on the map");

};



function openInputArea(latlng, type) {

    if(currentPos === null) {
        alert("Please select a location by clicking somewhere on the map first. Make sure you are zoomed in enough.");
    } else {

    transform(document.getElementById("fullform"), "display", "block");
    transform(document.getElementById("page2"), "display", "none");
    transform(document.getElementById("page1"), "display", "block");

    }
}

function closeInputArea() {
    transform(document.getElementById("fullform"), "display", "none");
}

function sendDetails() {
    sendObject.push(currentPos);
    sendObject.push(document.getElementById("name").value);
    sendObject.push(document.getElementById("heads").value);
    sendObject.push(document.getElementById("contactinfo").value);
    sendObject.push(document.getElementById("information").value);

    console.log(sendObject);
    ioc.send(JSON.stringify(sendObject));
    closeInputArea();
    sendObject = [];
}

var ioc = null;


var IOConnection = {

    serverConnection: function (hostaddress, port) {

        ioc_debug.setStart();
        ioc = io.connect(hostaddress + ':' + port, {'transports': ['xhr-polling']}),

            ioc.on('connect', function() {
                ioc_debug.setStart();

                console.log("Succesfully connected to "+hostaddress+":"+port+" in "  + (ioc_debug.start -  ioc_debug.end) + " milliseconds");

            });
            ioc.on('addloc', function(data) {
                data = urldecode(data);
                var ar = data.split(",");
                if(ar[2] != 100 && ar[3] != 100){
                console.log(ar[2] + "," + ar[3]);
                L.marker([[ar[2]],ar[3]]).addTo(map)
                    .bindPopup(
                        "<b>Type:</b> " + ar[1] +
                        "<br/>By: " + ar[4] +
                        "<br/>Info: " + ar[5] +
                        "<br/>Contact: " + ar[6] +
                        "<br/>People: " + ar[7]
                    )
                    .openPopup();
                }

            });
            ioc.on('error', function(data) {
             alert(data);
            });


    }
};

var sendObject = [];

var ioc_debug = {


    setStart: function() {

        var d = new Date();
        ioc_debug.start = d.getMilliseconds();

    },

    setEnd: function() {

        var d = new Date();
        ioc_debug.end = d.getMilliseconds();

    },



    start: 0,
    end: 0

};
