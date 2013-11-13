var app = {


    view: new UIHandler(new UIDefinitions),

    initialize: function() {
    app.view.initialize();

    }
}

var transform = function (element, name, value) {
    element.style[name] = value;
}

window.onload = function() {
    app.initialize();
};


function openInputArea(latlng, type) {

    if(currentPos === null) {
        alert("Please select a location by clicking somewhere on the map first. Make sure you are zoomed in enough.");
    } else {

    transform(document.getElementById("fullform"), "display", "block")
    document.getElementById("loc").value = currentPos;
    }
}

function closeInputArea() {

    transform(document.getElementById("fullform"), "display", "none")
}


var ioc = null;

var myObject = {
    message: "test"
    ,userName: "test"
};


var IOConnection = {

    serverConnection: function (hostaddress, port) {

        ioc_debug.setStart();
        ioc = io.connect(hostaddress + ':' + port, {'transports': ['xhr-polling']}),

            ioc.on('connect', function() {
                ioc_debug.setStart();
                self.postMessage("Succesfully connected to "+hostaddress+":"+port+" in "  + (ioc_debug.start -  ioc_debug.end) + " milliseconds");
            });

            //ioc.emit("helloworld", myObject);

            ioc.on("variable", function(data){
                self.postMessage(data);
            });
    }
};

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