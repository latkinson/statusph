function Cache() {
    "use strict";

    Cache.Instance = function () {
        return this;
    };

    Cache.Instance.prototype = {

    //todo LOAD ALL SAVED FILES ON MACHINE FROM BROWSER STORAGE / DEVICE IF POSSIBLE

    storage: [],

    get: function(container, id, name) {
        return name !== undefined ? this.storage[container][id][name] : this.storage[container][id];
    },
    set: function(container, id, name, val) {

        if(this.storage[container][id] === undefined) {
            this.storage[container][id] = [];
        }

        this.storage[container][id][name] = val;
    },

    addMemory: function(container) {
        if(this.storage[container] === undefined) {
            this.storage[container] = [];
        }
        return container;
    }
    }

    return new Cache.Instance();
}
