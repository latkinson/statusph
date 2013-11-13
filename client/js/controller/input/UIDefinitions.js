/*

Wilhelmus de Witte, 2013

 */

function UIDefinitions() {

    "use strict";

    var mem = C.addMemory("UIDefinitions");

    return {

        unique: { // ids



        },

        collective: { //classes

            "test" : {
                release: function(e){ console.log("release1")},
                touch: function(e){ console.log("touch")},
                after: function(e){ console.log("return to default")},
                hammer: {
                    "release": function(event, element){
                    }


                }
            }

        }
    }
}
