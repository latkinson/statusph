/*
 Copyright (c) Wilhelmus ("Pim") de Witte 2013 for the WhiteSpell Web Server Project (whitespell.com)
 */


function UIHandler(ViewDeclaration) {

    "use strict";

    var d = ViewDeclaration;


    var isTouch = (typeof window.ontouchstart !== "undefined");

    var releaseId = (isTouch ? "touchend" : "mouseup");
    var cancelId = ("mouseout");
    var startId = (isTouch ? "touchstart" : "mousedown");

    UIHandler.Instance = function () {
        return this;
    };

    UIHandler.Interaction = {

        bindActions: function(element, actions) {

            /////////////////////////////////////////////////////
            //////         HAMMER.JS IS USEFUL    ///////////////
            /////////////////////////////////////////////////////

            if(actions.hammer !== undefined) {
                for(var gesture in actions.hammer) {
                    Hammer(element).on(gesture, function(ev) {
                        actions.hammer[gesture](ev, element);
                    });
                }
            }

            if(actions.touch === undefined) {
                actions.touch = UIHandler.defaultEffects.TouchEffectTask;
            }

            if(actions.after === undefined) {
                actions.after = UIHandler.defaultEffects.ReturnToDefault;
            }

            if(actions.release === undefined) {
                actions.release = function(){};
            }

            /////////////////////////////////////////////////////
            //////          TOUCH CANCEL          ///////////////
            /////////////////////////////////////////////////////

            var cancel = function(e) {
                e.preventDefault();
                actions.after(element);
                element.removeEventListener(releaseId, release);
            };


            /////////////////////////////////////////////////////
            //////          TOUCH RELEASE         ///////////////
            /////////////////////////////////////////////////////

            var release = function(e) {
                e.preventDefault();
                actions.release(element);
                actions.after(element);
                element.removeEventListener(cancelId, cancel);
            };

            /////////////////////////////////////////////////////
            //////          TOUCH START           ///////////////
            /////////////////////////////////////////////////////

            var start = function(e) {
                e.preventDefault();
                actions.touch(element);
                element.addEventListener(cancelId, cancel);
                element.addEventListener(releaseId, release);
            }

            element.addEventListener('contextmenu', function(evt) {
                evt.preventDefault();
            }, false);

            element.addEventListener(startId, start);
            element.style.cursor = 'pointer';
        }


    }


    UIHandler.Instance.prototype = {

        initialize: function () {

            /////////////////////////////////////////////////////
            //////   INITIALIZE VIEWDECLARATION   ///////////////
            /////////////////////////////////////////////////////

            for(var element in d.unique) {

                var targetElement = document.getElementById(element);

                UIHandler.gestures.add(new UIHandler.Interaction.bindActions(targetElement, d.unique[element]));

            }

            for(var className in d.collective) {

                var elements = document.getElementsByClassName(className);

                for(var i = 0; i < elements.length; i++) {
                    UIHandler.gestures.add(new UIHandler.Interaction.bindActions(elements[i], d.collective[className]));

                }

            }



        }
    }

    UIHandler.defaultEffects = {

        /////////////////////////////////////////////////////
        //////      DEFAULT TOUCH EFFECT      ///////////////
        /////////////////////////////////////////////////////

        TouchEffectTask: function (e) {

            transform(e, "opacity", ".3");

        },

        /////////////////////////////////////////////////////
        //////      BACK TO DEFAULT STATE     ///////////////
        /////////////////////////////////////////////////////

        ReturnToDefault: function (e) {

            transform(e, "opacity", "1");

        }


    };

    UIHandler.gestures = {

        container: [],

        add: function (task) {
            this.container.push(task);
        }
    }

    UIHandler.DOMController = {
        perform: function (e) {
            /* Symbolic function, we can later use this for purposes such as priority filtering */
        }
    }

    return new UIHandler.Instance();

}






