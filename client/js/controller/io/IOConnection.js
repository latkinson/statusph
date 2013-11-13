var ioc = null;

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


var IOConnection = {

	serverConnection: function (hostaddress, port) {

        ioc_debug.setStart();
        ioc = io.connect(hostaddress + ':' + port, {'transports': ['xhr-polling']}),


        ioc.on('connect', function() {
           ioc_debug.setStart();

          console.log("Succesfully connected to "+hostaddress+":"+port+" in "  + (ioc_debug.start -  ioc_debug.end) + " milliseconds");

        });
	}
};