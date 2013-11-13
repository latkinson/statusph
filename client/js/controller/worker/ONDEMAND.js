importScripts('socket.io.js');

function ONDEMAND(data) {
    "use strict";
    switch(data.task) {

        case "initialize": {
            self.postMessage("ONDEMAND was initialized with params: " + data.parameters);

            return;
        }

        case "connect": {
            self.postMessage("Connecting");
            IOConnection.serverConnection("127.0.0.1", 9092);
        }
    }
}


self.addEventListener("message", function(e) {
    ONDEMAND(e.data);
}, false);

var ioc = null;


var IOConnection = {

    serverConnection: function (hostaddress, port) {

        ioc_debug.setStart();
        ioc = io.connect(hostaddress + ':' + port, {'transports': ['xhr-polling']}),

            ioc.on('connect', function() {
                ioc_debug.setStart();
                self.postMessage("Succesfully connected to "+hostaddress+":"+port+" in "  + (ioc_debug.start -  ioc_debug.end) + " milliseconds");
            });

            //ioc.emit("helloworld", myObject);

        ioc.on('addloc', function(data) {
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