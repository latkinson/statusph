var app = {


    view: new UIHandler(new UIDefinitions),

    initialize: function() {
    app.view.initialize();

        if(pagetype == 0){
            document.getElementById("container").innerHTML = '[EVENT_TYPE,LatLng(9.7874,120363.53),PERSON_NAME,0,CONTACT_INFORMATION,MORE_INFORMATION]';
        }

    }
}

var filter = null;
if(window.location.hash) {
    var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
    filter = hash;
    // hash found
} else {
    // No hash found
}

function urldecode(str) {
    return decodeURIComponent((str+'').replace(/\+/g, '%20'));
}

var transform = function (element, name, value) {
    element.style[name] = value;
}

window.onload = function() {
    app.initialize();
    IOConnection.serverConnection("statusph.net", 9092);
    //alert("Add locations by clicking on location on the map");

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

    if(sendObject.length != 6){
        alert("Please fill in all the fields!" + sendObject.length);
        return;
    }
    ioc.send(JSON.stringify(sendObject));
    closeInputArea();
    sendObject = [];
}

var ioc = null;
var latlens = [];
var IOConnection = {

    serverConnection: function (hostaddress, port) {

        ioc_debug.setStart();
        ioc = io.connect(hostaddress + ':' + port, {'transports': ['xhr-polling']}),

            ioc.on('connect', function() {
                ioc_debug.setStart();

                console.log("Succesfully connected to "+hostaddress+":"+port+" in "  + (ioc_debug.start -  ioc_debug.end) + " milliseconds");

            });
            ioc.on('addloc', function(data) {
                //data = urldecode(data);
                var ar = data.split(",");

                if(filter != null && filter.length > 2) {
                    if(ar[1].indexOf(filter) === -1){
                        console.log("blocking filter");
                        return;
                    }
                }

                if(latlens[[[ar[2]],ar[3]]] === true){
                    console.log("BLOCK:"+[ar[2]],ar[3]);
                    return;
                }
                latlens[[[ar[2]],ar[3]]] = true;

                if(ar[2] != 100 && ar[3] != 100 && ar.length === 8 && ar[6].length > 2){
                if(pagetype == 1){
                L.marker([[ar[2]],ar[3]]).addTo(map)
                    .bindPopup(
                        "<br/><b>Type:</b>  " + ar[1] +
                        "<br/><b>Name:</b>  " + ar[4] +
                        "<br/><b>Info:</b><br/> " + ar[5] +
                        "<br/><b>Contact:</b><br/>  " + ar[6] +
                        "<br/><b>Amount of people:</b> " + ar[7]
                    )
                    .openPopup();
                }else{
                    if(pagetype == 0){

                    document.getElementById("container").innerHTML +=  "<br/><a target='_blank' href='/#"+ar[1]+"'>[" + ar[1] +
                        "," + ar[2] +
                        "," + ar[3] +
                        "," + ar[4] +
                        "," + ar[5] +
                        "," + ar[6] +
                        "," + ar[7] + "]</a>";
                }else if(pagetype == 2){
                        if(document.getElementById("container").innerHTML.indexOf(ar[1]) == -1){
                        document.getElementById("container").innerHTML +=  "<br/><a target='_blank' href='/#"+ar[1]+"'>" + ar[1] +"</a>";}
                    }
                    }
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
