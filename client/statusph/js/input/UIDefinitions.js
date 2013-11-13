/*

Wilhelmus de Witte, 2013

 */

function UIDefinitions() {

    "use strict";


    return {

        unique: { // ids

            "addloc": {
                release: function(e){ openInputArea();}
            },



            "close": {
                release: function(e){ closeInputArea();}
            }

        },

        collective: { //classes

            "fakeButton": {
                release: function(e){
                document.getElementById("fakebuttonContainer").innerHTML = '' +
                    '<p style="">How many people are at your location?</p>' +
                    '<input type="text" value="0" style="height:50px;font-size:20pt;"/>' +
                    '<p style="">Contact Email/Phone</p>' +
                    '<input type="text" placeholder="Your email" style="height:50px;font-size:20pt;"/>' +
                    '<p style="">Life-Threatning situations:</p>' +
                    '<input type="text" value="0" style="height:50px;font-size:20pt;"/>' +
                    '<div id="sendButton">SEND NOW</div>'

                }
            }


        }
    }
}
