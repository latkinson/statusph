/* 
Whitespell client 2013 (c)
*/



var grabApp = {

        /*

        We declare the configuration to later be overwritten by the JSON data.

        */

        configuration: null,

        /*

        We declare the version to be checked with the configuration's lastVersion that we load through JSON

        */

        myVersion: 12,

        /*
        
        The initialization function calls all the functions that are mandatory to display the app on your screen

        */

        initialize: function () {
           // outputAction.displayLoader();
            this.versionCheck();
           // this.loadContent();
        },

        /*

        The getJSONData function grabs the configuration data from the given URL and declares the json data as configuration.
        Dependencies: jQuery

        */

        versionCheck: function () {
            var version = this.myVersion;
            var configurationData = $.getJSON("/httpserver/cfg/json/cfg.json", function (data) {
                if (data.lastFunctional > version) {
                    alert("You are using an outdated version (" + version + ") of this application. Please update your application to " + data.lastVersion + " and launch the application again.");
                    return null;
                } if (data.lastVersion > version) {
                    alert("The latest version is " + data.lastVersion + ". We recommend you to update your application.");
                }
                console.log("Launched application with current version " + version + " with latest functional " + data.lastFunctional);
                executeApplication.initializeApplication(data);
             })
                .fail(function () { console.log("There was an error processing your version check."); });
        }
    };