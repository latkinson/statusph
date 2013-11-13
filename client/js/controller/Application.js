/**
 * @author wwadewitte on 11/6/13.
 * Copyright Wilhelmus de Witte 
 * This file is not meant to be distributed yet 
 * When finding this file on any device please contact +1 786 201 9489
 * p.dwitte@soulsplit.com | WhiteSpell Project 2013
 */

var C = new Cache();

var whitespell = {

    view: new UIHandler(new UIDefinitions),
    workers: new WorkerHandler([]),
    layout: new Layout(),

    initialize: function() {

            whitespell.workers.initialize();
            whitespell.view.initialize();

            whitespell.workers.assign("ONDEMAND", {
                task: "connect"
            });

            whitespell.workers.assign("XMR", {
                task: "request",
                file: "Inactivity.html",
                element: "main"
            });
            whitespell.layout.initialize();


     }
}
