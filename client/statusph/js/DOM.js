/**
 * Created by pimdewitte on 11/9/13.
 */

/**
 * Created by pimdewitte on 11/8/13.
 */

function DOM() {
    "use strict";

    DOM.Instance = {

        transform: function(element, name, value) {
            console.log(this);
            this.transform(element, name, value);
        }

    }

    DOM.transform = function (element, name, value) {
        element.style[name] = value;
    }




    return new DOM.Instance();
}

