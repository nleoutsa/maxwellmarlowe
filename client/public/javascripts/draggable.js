
var offset = null;
var mousedown = false;
var mouse_move = false;

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

    // get initial position to calculate throw velocity and easing curve...
    pos_0 = $(this).position();

    // prevent scrolling on touch events that occur within zoom_description
    var is_zoomed_description = e.originalEvent.target.id == "zoomed_description" || e.originalEvent.target.parentNode.id == "zoomed_description";
    if (!is_zoomed_description) {
        e.preventDefault();
    }

    user_position_x = e.originalEvent.changedTouches[0].pageX;

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

    // get final position to calculate throw velocity and easing curve...
    pos_1 = $(this).position();

};

// throw a draggable element
var throwElement = function(e) {

    user_position_x = e.originalEvent.changedTouches[0].pageX;


    var ease_amount_left = (pos_1.left > pos_0.left ? pos_1.left / pos_0.left : pos_0.left / pos_1.left);

    var relative_pos = $(this).position().left / $(this).width();

    var throw_speed =  (300 -  100 * (relative_pos * relative_pos));// - Math.abs(1000 * relative_pos);

    var window_width = $(window).width();

    console.log(pos_0, pos_1);

    if (pos_0.left < pos_1.left && relative_pos > 0.1) {
        console.log('last');

        $(this).animate({left: 1.5 * window_width}, throw_speed,'linear', function() {
            angular.element('#mainController').scope().showPhoto(-1);
            angular.element('#mainController').scope().$apply();
        });
        $(this).animate({left: -1.5 * window_width},0,'linear');
        $(this).animate({left: 0}, throw_speed,'linear');


    }
    else if (pos_0.left > pos_1.left && relative_pos < -0.1) {
        console.log('next');

        $(this).animate({left: -1.5 * window_width}, throw_speed,'linear', function() {
            angular.element('#mainController').scope().showPhoto(1);
            angular.element('#mainController').scope().$apply();
        });
        $(this).animate({left: 1.5 * window_width},0,'linear');
        $(this).animate({left: 0}, throw_speed,'linear');


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
};





// used to establish the offset amount
var startClick = function(e) {

    var position = $(this).position();

    user_position_x = e.originalEvent.pageX;
    user_position_y = e.originalEvent.pageY;

    // set offset
    offset = {
        x: user_position_x - position.left,
        y: user_position_y - position.top
    };

    mouse_down = true;
    mouse_move = false;

};

// move a draggable element
var moveClick = function(e) {

    if (mouse_down) {


        mouse_move = true;

        // get initial position to calculate throw velocity and easing curve...
        pos_0 = $(this).position();

        // prevent scrolling on touch events that occur within zoom_description
        var is_zoomed_description = e.originalEvent.target.id == "zoomed_description" || e.originalEvent.target.parentNode.id == "zoomed_description";
        if (!is_zoomed_description) {
            e.preventDefault();
        }

        user_position_x = e.originalEvent.pageX;

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

        // get final position to calculate throw velocity and easing curve...
        pos_1 = $(this).position();

    }
};


// throw a draggable element
var throwClick = function(e) {

    if (!mouse_move) {
        angular.element('#mainController').scope().super_zoom = !angular.element('#mainController').scope().super_zoom;
        angular.element('#mainController').scope().$apply();
    }

    mouse_down = false;
    mouse_move = false;

    var ease_amount_left = (pos_1.left > pos_0.left ? pos_1.left / pos_0.left : pos_0.left / pos_1.left);

    var relative_pos = $(this).position().left / $(this).width();

    var throw_speed =  (300 -  100 * (relative_pos * relative_pos));// - Math.abs(1000 * relative_pos);

    var window_width = $(window).width();

    // console.log(pos_0, pos_1);

    if (pos_0.left < pos_1.left && relative_pos > 0.1) {
        console.log('last');

        $(this).animate({left: 1.5 * window_width}, throw_speed,'linear', function() {
            angular.element('#mainController').scope().showPhoto(-1);
            angular.element('#mainController').scope().$apply();
        });
        $(this).animate({left: -1.5 * window_width},0,'linear');
        $(this).animate({left: 0}, throw_speed,'linear');


    }
    else if (pos_0.left > pos_1.left && relative_pos < -0.1) {
        console.log('next');

        $(this).animate({left: -1.5 * window_width}, throw_speed,'linear', function() {
            angular.element('#mainController').scope().showPhoto(1);
            angular.element('#mainController').scope().$apply();
        });
        $(this).animate({left: 1.5 * window_width},0,'linear');
        $(this).animate({left: 0}, throw_speed,'linear');


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

};





// auto scroll when user is not interacting
var autoMove = function(id, speed) {


    var paused = false;
    var num_of_pics = ($(id).children().length);
    var timer;

    var new_left;
    var new_top;

    var auto_move_direction_left;
    var auto_move_direction_top;

    var row_width = $(id).width() - $(window).width() - 15;
    var column_height = $(id).height() - $(window).height() - 15;

    if ($(id).position().left > row_width / 2) {
        auto_move_direction_left = -1;
    }
    else {
        auto_move_direction_left = 1;
    }

    if ($(id).position().top > column_height / 2) {
        auto_move_direction_top = -1;
    }
    else {
        auto_move_direction_top = 1;
    }


        timer = setInterval(function () {

            if ($(window).width() <= 500) {

                row_width = $(id).width() - $(window).width();

                // switch direction at each end
                if ($(id).position().left <= -row_width || $(id).position().left >= 0) {
                    auto_move_direction_left *= -1;
                }

                new_left = $(id).position().left + (1 * auto_move_direction_left);

                if (!paused) {
                    $(id).parent().scrollLeft(-new_left);
                }
            }
            else if ($(window).width() > 500) {

                column_height = $(id).height() - $(window).height();

                // switch direction at each end
                if ($(id).position().top <= -column_height || $(id).position().top >= 0) {
                    auto_move_direction_top *= -1;
                }

                new_top = $(id).position().top + (1 * auto_move_direction_top);



                if (!paused) {
                    $(id).parent().scrollTop(-new_top);
                }
            }

        }, speed);


    // pause auto scroll when zoomed
    $('.pic').bind('click touchstart', function() {
        if (angular.element('#mainController').scope().zoom) {
            paused = true;
        }
    });

    // unpause autoscroll when not zoomed
    $('#x-out').bind('click touchstart', function() {
        paused = false;
    });


    // pause autoscroll when user scrolls,
    // unpause a few seconds after user stops scrolling iff not zoomed
    var timeout;

    $(id).parent().on('touchstart', function(e) {
        paused = true;
        clearTimeout(timeout);
    });
    $(id).parent().on('touchend', function(e) {
        timeout = setTimeout(function() {
            if (!angular.element('#mainController').scope().zoom) {
                paused = false;
            }
        }, 3000);
    });

};





// run on load:


// window.addEventListener("orientationchange", function() {
    // on orientation change do this...
// }, false);


setTimeout(function() {
    autoMove("#col2", 30);
}, 2000);
setTimeout(function() {
    autoMove("#col0", 25);
}, 4000);
setTimeout(function() {
    autoMove("#col3", 35);
}, 6000);

$('.draggable').bind('touchstart', startTouch);
$('.draggable').bind('touchmove', moveElement);
$('.draggable').bind('touchend', throwElement);


$('.draggable').bind('mousedown', startClick);
$('.draggable').bind('mousemove', moveClick);
$('.draggable').bind('mouseup', throwClick);



// TODO:

// make photos smaller for mobile... larger for large screen...
// css @media for larger screen size
//      or (? more robust machine)*--are these even possible?
//      or (? faster internet connect) *
//

// style buttons of side: color; positioning?;

// style about me column... make responsive!

// left/right arrows also go to super_zoom






































