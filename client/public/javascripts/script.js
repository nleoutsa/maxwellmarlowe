
$(document).ready(function() {

    var row_width = $("#col0").width() - $(window).width();
    var column_height = $("#col0").height() - $(window).height();
    $(".out-col-0").scrollLeft(row_width / 8);
    $(".out-col-0").scrollTop(column_height / 8);
    // $(".out-col-2").scrollLeft(row_width);
    // $(".out-col-2").scrollTop(column_height);
    $(".out-col-3").scrollLeft(row_width / 2.4);
    $(".out-col-3").scrollTop(column_height / 2.4);


    skill(skills);


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


var skills = [
    "Full-Stack",
    "JavaScript",
    "JQuery",
    "MongoDB",
    "Express.js",
    "Angular.js",
    "Node.js",
    "HTML5",
    "CSS3",
    "Git",
    "CLI",
    "Ruby",
    "Rails",
    "PostgreSQL",
    "AWS",
    "Heroku",
    "Unity",
    "PhotoShop",
    "Maya"
];

var skill = function(ary) {
    num_skills = ary.length - 1;
    current_skill = 0;
    skills_direction = 1;
    stop_appending = false;


    skills_timer = setInterval(function() {
        if (current_skill >= num_skills) {
             current_skill = 0;
             stop_appending = true;
        }

        if ($(window).width() > $(window).height() && $(window).height() > 430) {
            console.log($(window).height());

            if (!stop_appending) {
               $("#skills").append("<p style='color: hsl(" + 360 / (num_skills - 1) * current_skill + ", 80%, 83%)'>" + ary[current_skill] + "</p>")
            }

        }
        else {


            $("#skills p").css({
                opacity: 0,
                WebkitTransition : 'opacity 0.4s linear',
                MozTransition    : 'opacity 0.4s linear',
                MsTransition     : 'opacity 0.4s linear',
                OTransition      : 'opacity 0.4s linear',
                transition       : 'opacity 0.4s linear'
            });

            skills_opacity_timer = setTimeout(function() {


                $("#skills p").html(ary[current_skill]);
                $("#skills p").css({
                    color: 'hsl(' + 360 / (num_skills - 1) * current_skill + ', 80%, 70%)',
                    opacity: 1,
                    WebkitTransition : 'opacity 0.4s linear',
                    MozTransition    : 'opacity 0.4s linear',
                    MsTransition     : 'opacity 0.4s linear',
                    OTransition      : 'opacity 0.4s linear',
                    transition       : 'opacity 0.4s linear'
                });

            }, 500);

        }

        current_skill += skills_direction;


    }, 1500);
};

