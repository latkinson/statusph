/**
 * @author wwadewitte on 11/6/13.
 * Copyright Wilhelmus de Witte 
 * This file is not meant to be distributed yet 
 * When finding this file on any device please contact +1 786 201 9489
 * p.dwitte@soulsplit.com | WhiteSpell Project 2013
 */

function NotSupported(Confiuration) {
    console.log("workers are not supported //// handle workers on main thread");
}
function WorkerHandler(Configuration) {

    "use strict";

    var mem = C.addMemory("WorkerHandler");

    WorkerHandler.Instance = function() {
        if(!window.Worker){
            return NotSupported({});
        }
        return this;
    }

    WorkerHandler.Instance.prototype = {

        initialize : function () {
            this.add("XMR");
            this.add("ONDEMAND");
        },

        add : function (name) {
            C.set(mem, "Workers", name, new Worker("js/controller/worker/" + name + ".js"));
            var worker = this.getWorker(name);

            worker.postMessage({
                task: "initialize",
                parameters: "none"
            })

            worker.addEventListener("message", function (event) {
                WorkerHandler.handleResponse(name, event.data);
            });




        },

        getWorker : function (name) {
            if(name === undefined) {
                console.log("Invalid worker requested");
                return;
            }

            return C.get(mem, "Workers", name);
        },

        assign : function (workerName, data) {

           var worker = this.getWorker(workerName);

            worker.postMessage(data);

        }
    }

    WorkerHandler.handleResponse = function(worker, response) {

        switch(worker) {
            case "XMR": {
               document.getElementById(response.element).style.display = "block";
               document.getElementById(response.element).innerHTML = response.content;
            };

            case "ONDEMAND": {
                console.log(response);
                //document.getElementById(response.element).innerHTML = response.value;
            };

        }

    }


    return new WorkerHandler.Instance();
}