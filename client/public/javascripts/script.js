
$(document).ready(function() {

    var column_width = $("#col0").width() - $(window).width();
    console.log(column_width);
    $(".out-col-0").scrollLeft(column_width / 8);
    // $(".out-col-2").scrollLeft(column_width);
    $(".out-col-3").scrollLeft(column_width / 2.4);
});

window.addEventListener("orientationchange", function() {
    // attempt to soft reload on orientation change
    angular.element('#mainController').scope().$apply();
}, false);

// prevent all touch events from scrolling.
    // $(document).bind('touchstart', function(e) {
    //     e.preventDefault();
    // });

// disable arrow key default function
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();


        if (e.keyCode == 37) {
            angular.element('#mainController').scope().showPhoto(-1);
            angular.element('#mainController').scope().$apply();
        }
        else if (e.keyCode == 39) {
            angular.element('#mainController').scope().showPhoto(1);
            angular.element('#mainController').scope().$apply();
        }
        else if (e.keyCode == 32) {
            angular.element('#mainController').scope().super_zoom = !angular.element('#mainController').scope().super_zoom;
            angular.element('#mainController').scope().$apply();
        }
    }
}, false);



