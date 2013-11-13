/**
 * Created by pimdewitte on 11/8/13.
 */

function Layout() {
    "use strict";

    Layout.Instance = function() {
        return this;
    }

    Layout.Instance.prototype = {

        initialize: function() {

           this.displaySpinner();


        },

        newElement: function(name, attributes, content, parent) {

            if(parent !== undefined) {

            }
        },

        displaySpinner: function() {
            var opts = {
                lines: 13, // The number of lines to draw
                length: 7, // The length of each line
                width: 4, // The line thickness
                radius: 10, // The radius of the inner circle
                rotate: 0, // The rotation offset
                color: '#e8e8e8', // #rgb or #rrggbb
                speed: 1, // Rounds per second
                trail: 60, // Afterglow percentage
                shadow: false, // Whether to render a shadow
                hwaccel: false, // Whether to use hardware acceleration
                className: 'spinner', // The CSS class to assign to the spinner
                zIndex: 2e9, // The z-index (defaults to 2000000000)
                top: 'auto', // Top position relative to parent in px
                left: 'auto' // Left position relative to parent in px
            };

            var target = document.getElementById("bigLoader");
            var spinner = new Spinner(opts).spin(target);
        }

    }




    return new Layout.Instance();
}