
var offset = null;
var position_0 = null;
var position_1 = null;
var relative_pos;
var timer;

// used to establish the offset amount
var startTouch = function(e) {

    var position = $(this).position();

    user_position_x = e.originalEvent.changedTouches[0].pageX;
    user_position_y = e.originalEvent.changedTouches[0].pageY;

    // set offset
    offset = {
        x: user_position_x - position.left,
        y: user_position_y - position.top
    };

};

// move a draggable element
var moveElement = function(e) {
    pos_0 = $(this).position();

    // prevent scrolling on touch events that occur within zoom_description
    var is_zoomed_description = e.originalEvent.target.id == "zoomed_description" || e.originalEvent.target.parentNode.id == "zoomed_description";

    if (!is_zoomed_description) {
        console.log('true');
        e.preventDefault();
    }

    user_position_x = e.originalEvent.changedTouches[0].pageX;
    user_position_y = e.originalEvent.changedTouches[0].pageY;

    relative_pos = (pos_0.left + ($(this).width() / 2)) / $(this).width() - 0.5;
    // get position relative to center of screen...
    console.log(relative_pos);

    var new_left = user_position_x - offset.x;

    // set position via css
    $(this).css({
        left: new_left,
        WebkitTransition : 'none',
        MozTransition    : 'none',
        MsTransition     : 'none',
        OTransition      : 'none',
        transition       : 'none'
    });

    pos_1 = $(this).position();

};

// throw a draggable element
var throwElement = function(e) {

    user_position_x = e.originalEvent.changedTouches[0].pageX;
    user_position_y = e.originalEvent.changedTouches[0].pageY;

    var ease_amount_left = 1 / (pos_1.left > pos_0.left ? pos_1.left / pos_0.left : pos_0.left / pos_1.left);
    // var ease_amount_top = 1 / (pos_1.top > pos_0.top ? pos_1.top / pos_0.top : pos_0.top / pos_1.top);

    if (relative_pos > 0.25) {
        console.log('last');

        angular.element('#mainController').scope().showPhoto(-1);
        angular.element('#mainController').scope().$apply();

        // move to opposite side and offscreen
        $(this).offset({left: -1000 });

        if ($(this).position().left < 900) {
            $(this).css({
                left: 0,
                WebkitTransition : 'left ' + ease_amount_left + 's cubic-bezier(0.130, 1.000, 0.320, 1.000)',
                MozTransition    : 'left ' + ease_amount_left + 's cubic-bezier(0.130, 1.000, 0.320, 1.000)',
                MsTransition     : 'left ' + ease_amount_left + 's cubic-bezier(0.130, 1.000, 0.320, 1.000)',
                OTransition      : 'left ' + ease_amount_left + 's cubic-bezier(0.130, 1.000, 0.320, 1.000)',
                transition       : 'left ' + ease_amount_left + 's cubic-bezier(0.130, 1.000, 0.320, 1.000)'
            });
        }
    }
    else if (relative_pos < -0.25) {

        console.log('next');

        angular.element('#mainController').scope().showPhoto(1);
        angular.element('#mainController').scope().$apply();

        // move to opposite side and offscreen
        $(this).offset({left: 1000 });

        if ($(this).position().left > 900) {
            $(this).css({
                left: 0,
                WebkitTransition : 'left ' + ease_amount_left + 's cubic-bezier(0.130, 1.000, 0.320, 1.000)',
                MozTransition    : 'left ' + ease_amount_left + 's cubic-bezier(0.130, 1.000, 0.320, 1.000)',
                MsTransition     : 'left ' + ease_amount_left + 's cubic-bezier(0.130, 1.000, 0.320, 1.000)',
                OTransition      : 'left ' + ease_amount_left + 's cubic-bezier(0.130, 1.000, 0.320, 1.000)',
                transition       : 'left ' + ease_amount_left + 's cubic-bezier(0.130, 1.000, 0.320, 1.000)'
            });
        }
    }
    else {
        $(this).css({
            left: 0,
            WebkitTransition : 'left ' + ease_amount_left + 's cubic-bezier(0.130, 1.000, 0.320, 1.000)',
            MozTransition    : 'left ' + ease_amount_left + 's cubic-bezier(0.130, 1.000, 0.320, 1.000)',
            MsTransition     : 'left ' + ease_amount_left + 's cubic-bezier(0.130, 1.000, 0.320, 1.000)',
            OTransition      : 'left ' + ease_amount_left + 's cubic-bezier(0.130, 1.000, 0.320, 1.000)',
            transition       : 'left ' + ease_amount_left + 's cubic-bezier(0.130, 1.000, 0.320, 1.000)'
        });
    }

    relative_pos = 0;



};


var autoMove = function(id) {

    // determine if panels move horizontally or vertically by window size...
    if ($(window).width() <= 500) {

        var paused;
        var num_of_pics = ($(id).children().length);
        var column_width = $(id).width() - $(window).width();
        var auto_move_direction;
        var new_left = 0;

        if ($(id).position().left > column_width / 2) {
            auto_move_direction = -1;
        }
        else {
            auto_move_direction = 1;
        }

        timer = setInterval(function () {

            // switch direction at each end
            if ($(id).position().left <= -column_width || $(id).position().left >= 0) {
                auto_move_direction *= -1;
            }

            new_left = $(id).position().left + (1 * auto_move_direction);

            var scroll_amount = $(id).parent().scrollLeft();

            if (!paused) {
                $(id).parent().scrollLeft(-new_left);
            }

        }, 100);




        $(id).parent().on('touchstart', function(e) {
            paused = true;
        });
        $(id).parent().on('touchend', function(e) {
            paused = false;
        });


    }

};


autoMove("#col0");
autoMove("#col2");
autoMove("#col3");

$('.draggable').bind('touchstart', startTouch);
$('.draggable').bind('touchmove', moveElement);
$('.draggable').bind('touchend', throwElement);





// TODO:

// on super_zoom: swipe right-to-left
// is going back and forth instead of forward
// each time

// style buttons of side: color; positioning?;

// autoscroll vertical!

// flashing ghost image occurs during
// scroll momentum on main page...
// Possibly autoMove AND user's scroll momentum
// are clashing






































