/*

 Wilhelmus de Witte, 2013

 */

function UIDefinitions() {

    "use strict";


    return {

        unique: { // ids

            "addloc": {
                release: function (e) {
                    openInputArea();
                }
            },
            "sendButton": {
                release: function (e) {
                    sendDetails();
                }
            }

        },

        collective: { //classes
            "closeButton": {
                release: function (e) {
                    closeInputArea();
                }

            },

            "fakeButton": {
                release: function (e) {
                    transform(document.getElementById("page2"), "display", "block");
                    transform(document.getElementById("page1"), "display", "none");
                    sendObject = [];
                    sendObject.push(e.getAttribute("data-content"));
                }


            }

        }
    }
}