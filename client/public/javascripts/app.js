
angular.module("nodeTodo", ['ngTouch'])

.controller("mainController", function($scope, $http, $interval) {
    $scope.formData = {};
    $scope.todoData = {};

    // show next of previous photo and loop
    $scope.showPhoto = function(direction) {
        if (direction < 0) {
            $scope.pic_number--;
        }
        else if (direction > 0) {
            $scope.pic_number++;
        }
        if ($scope.pic_number < 0) {
            $scope.pic_number = $scope.album.length - 1;
        }
        if ($scope.pic_number > $scope.album.length - 1) {
            $scope.pic_number = 0;
        }
    };

    $scope.web_portfolio = [
        {
            'url'           : 'http://i.imgur.com/oIXp6ql.png',
            'large_url'           : 'http://i.imgur.com/oIXp6ql.png',
            'pos'           : '0% 0%',
            'size'          : 'cover',
            'repeat'        : 'no-repeat',
            'title'         : 'Arbitrage Ed',
            'description'   : 'Arbitrage Ed aims to improve financial literacy through relevant lessons. Short videos let you learn new concepts in minutes, targeted problem sets allow you to test your comprehension, and research tools let you apply what you\'ve learned to real-world data.',
            'medium'        : 'JavaScript, JQuery, HTML5, CSS3, AngularJS, Node.js, MongoDB, Express.js',
            'redirect'      : 'http://arbitrageed.com',
            'date'          : '2015'
        },
        {
            'url'           : 'http://i.imgur.com/h86kWQE.png',
            'large_url'           : 'http://i.imgur.com/h86kWQE.png',
            'pos'           : '0% 0%',
            'size'          : 'cover',
            'repeat'        : 'no-repeat',
            'title'         : 'Arbitrage Ed',
            'description'   : 'Arbitrage Ed aims to improve financial literacy through relevant lessons. Short videos let you learn new concepts in minutes, targeted problem sets allow you to test your comprehension, and research tools let you apply what you\'ve learned to real-world data.',
            'medium'        : 'JavaScript, JQuery, HTML5, CSS3, AngularJS, Node.js, MongoDB, Express.js',
            'redirect'      : 'http://arbitrageed.com',
            'date'          : '2015'
        },
        {
            'url'           : 'http://i.imgur.com/tCc7ggv.png',
            'large_url'           : 'http://i.imgur.com/tCc7ggv.png',
            'pos'           : '50% 80%',
            'size'          : 'cover',
            'repeat'        : 'no-repeat',
            'title'         : 'Workable\'s Offer Letter Generator',
            'description'   : 'Workable\'s Offer Letter Generator allows you to quickly create a professional offer letter to send to prospective employees.',
            'medium'        : 'JavaScript, JQuery, HTML5, CSS3, Ruby, Rails, PostgreSQL',
            'redirect'      : 'https://workable-app.herokuapp.com/',
            'date'          : '2015'
        },
        {
            'url'           : 'http://i.imgur.com/gT4duG8.png',
            'large_url'           : 'http://i.imgur.com/gT4duG8.png',
            'pos'           : '70% 10%',
            'size'          : 'cover',
            'repeat'        : 'no-repeat',
            'title'         : 'Cities',
            'description'   : 'A pixelated JavaScript drawing game! Choose your colors, create a palette, hold the mouse down and move it around and see what you can create! My drawings always look like cities :)',
            'medium'        : 'JavaScript, JQuery, HTML5, CSS3',
            'redirect'      : 'https://cities.bitballoon.com',
            'date'          : '2014'
        },
        {
            'url'           : 'http://i.imgur.com/GwzGavY.png',
            'large_url'           : 'http://i.imgur.com/GwzGavY.png',
            'pos'           : '0% 90%',
            'size'          : 'cover',
            'repeat'        : 'no-repeat',
            'title'         : 'SimpleText',
            'description'   : 'Send a text message to anyone using SimpleText! A test project and great learning experience using the Twilio API, Datamapper, Sinatra, Heroku, and PostgreSQL.',
            'medium'        : 'JavaScript, JQuery, HTML5, CSS3, Twilio, ',
            'redirect'      : 'https://morning-retreat-6114.herokuapp.com/',
            'date'          : '2014'
        },
        {
            'url'           : 'http://i.imgur.com/DyldGCZ.png',
            'large_url'           : 'http://i.imgur.com/DyldGCZ.png',
            'pos'           : '50% 0%',
            'size'          : 'cover',
            'repeat'        : 'no-repeat',
            'title'         : 'BreezeThru',
            'description'   : 'The product of a 4 hour idea hack thrown by IdeaLabs\' Tom Hughes. This is an unfinished demo depicting the main functions of BreezeThru -a reservation and event planning app that factors in travel and wait times when finding the right venue for your night on town!',
            'medium'        : 'JavaScript, JQuery, HTML5, CSS3, Ruby, Rails',
            'redirect'      : 'https://breezethru.herokuapp.com/',
            'date'          : '2015'
        }
    ];

    $scope.paintings = [
        {
            'url'           : 'http://i.imgur.com/wiu9cFk.jpg',
            'large_url'     : 'http://i.imgur.com/zWgROSR.jpg',
            'pos'           : '35% 50%',
            'size'          : 'cover',
            'repeat'        : 'no-repeat',
            'title'         : 'Horse on Western Massachusetts Farm',
            'description'   : 'Palette Knife Painting, 9\" X 12\"',
            'medium'        : 'Acrylic on Canvas',
            'date'          : '2014'
        },
        {
            'url'           : 'http://i.imgur.com/TJ7YEjs.jpg',
            'large_url'     : 'http://i.imgur.com/OomnPqj.jpg',
            'pos'           : '60% 0%',
            'size'          : 'cover',
            'repeat'        : 'no-repeat',
            'title'         : 'Self Portrait',
            'description'   : '24\" X 36\"',
            'medium'        : 'Oil on Canvas',
            'date'          : '2014'
        },
        {
            'url'           : 'http://i.imgur.com/kutJzmS.jpg',
            'large_url'     : 'http://i.imgur.com/KUToClf.jpg',
            'pos'           : '72% 10%',
            'size'          : 'cover',
            'repeat'        : 'no-repeat',
            'title'         : 'The Stare',
            'medium'        : 'Digital Painting, Wacom Tablet, Photoshop',
            'date'          : '2014'
        },
        {
            'url'           : 'http://i.imgur.com/76xH6od.jpg',
            'large_url'     : 'http://i.imgur.com/OloKvol.jpg',
            'pos'           : '85% 50%',
            'size'          : 'cover',
            'repeat'        : 'no-repeat',
            'title'         : 'Woman Reclining',
            'description'   : '18\" X 24\"',
            'medium'        : 'Oil on Canvas',
            'date'          : '2014'
        },
        {
            'url'           : 'http://i.imgur.com/TFkftVq.jpg',
            'large_url'     : 'http://i.imgur.com/9maRLyU.jpg',
            'pos'           : '50% 10%',
            'size'          : 'cover',
            'repeat'        : 'no-repeat',
            'title'         : 'Lady Agnew of Lochnaw',
            'description'   : 'After John Singer Sargent',
            'medium'        : 'Digital Painting, Ipad, Nomad Brush Stylus, Procreate 2',
            'date'          : '2014'
        },
        {
            'url'           : 'http://i.imgur.com/xnv5NqD.jpg',
            'large_url'     : 'http://i.imgur.com/CldKYyx.jpg',
            'pos'           : '60% 80%',
            'size'          : 'cover',
            'repeat'        : 'no-repeat',
            'title'         : 'Emma Sitting',
            'medium'        : 'Digital Painting, Wacom Tablet, Photoshop',
            'date'          : '2014'
        },
        {
            'url'           : 'http://i.imgur.com/EQOvgXu.jpg',
            'large_url'     : 'http://i.imgur.com/tdeUIHo.jpg',
            'pos'           : '26% 40%',
            'size'          : 'cover',
            'repeat'        : 'no-repeat',
            'title'         : 'Elephants',
            'medium'        : 'Digital Painting, Wacom Tablet, Photoshop',
            'date'          : '2014'
        },
        {
            'url'           : 'http://i.imgur.com/09m22VZ.jpg',
            'large_url'     : 'http://i.imgur.com/otu2cw5.jpg',
            'pos'           : '80% 20%',
            'size'          : 'cover',
            'repeat'        : 'no-repeat',
            'title'         : 'Track',
            'medium'        : 'Digital Painting, Ipad, Nomad Brush Stylus, Procreate 2',
            'date'          : '2014'
        },
        {
            'url'           : 'http://i.imgur.com/YiVlgnF.jpg',
            'large_url'     : 'http://i.imgur.com/g0kft5L.jpg',
            'pos'           : '35% 43%',
            'size'          : 'cover',
            'repeat'        : 'no-repeat',
            'title'         : 'Emma',
            'description'   : '18\" X 24\"',
            'medium'        : 'Oil on Canvas',
            'date'          : '2014'
        },
        {
            'url'           : 'http://i.imgur.com/ga60NEv.jpg',
            'large_url'     : 'http://i.imgur.com/01NDp9x.jpg',
            'pos'           : '40% 100%',
            'size'          : 'cover',
            'repeat'        : 'no-repeat',
            'title'         : 'Self Portrait',
            'description'   : '18\" X 24\"',
            'medium'        : 'Oil on Canvas',
            'date'          : '2014'
        },
        {
            'url'           : 'http://i.imgur.com/Pzz6Ded.jpg',
            'large_url'     : 'http://i.imgur.com/QBdi0eF.jpg',
            'pos'           : '40% 65%',
            'size'          : 'cover',
            'repeat'        : 'no-repeat',
            'title'         : 'Dream Catcher Earrings',
            'description'   : '18\" X 24\"',
            'medium'        : 'Oil on Canvas',
            'date'          : '2014'
        },
        {
            'url'           : 'http://i.imgur.com/p0Mp7EM.jpg',
            'large_url'     : 'http://i.imgur.com/ibjkPYQ.jpg',
            'pos'           : '70% 32%',
            'size'          : 'cover',
            'repeat'        : 'no-repeat',
            'title'         : 'Sailor',
            'description'   : '18\" X 24\"',
            'medium'        : 'Oil on Canvas',
            'date'          : '2014'
        }
    ];

    $scope.images = [
        {
            'url'           : 'http://i.imgur.com/WDTavoX.jpg',
            'large_url'           : 'http://i.imgur.com/WDTavoX.jpg',
            'pos'           : '25% 20%',
            'size'          : 'cover',
            'repeat'        : 'no-repeat',
            'title'         : 'Lizard',
            'medium'        : '3D Model, Maya, Mudbox',
            'date'          : '2014'
        },
        {
            'url'           : 'http://i.imgur.com/fwXjPPZ.jpg',
            'large_url'           : 'http://i.imgur.com/fwXjPPZ.jpg',
            'pos'           : '12% 80%',
            'size'          : 'cover',
            'repeat'        : 'no-repeat',
            'title'         : 'Coins on Table',
            'medium'        : '3D Model, Maya, Mudbox',
            'date'          : '2014'
        },
        {
            'url'           : 'http://i.imgur.com/HLxE16q.jpg',
            'large_url'           : 'http://i.imgur.com/HLxE16q.jpg',
            'pos'           : '90% 80%',
            'size'          : 'cover',
            'repeat'        : 'no-repeat',
            'title'         : 'Keyboard, Monitor, and Computer',
            'medium'        : '3D Model, Maya, Mudbox',
            'date'          : '2014'
        },
        {
            'url'           : 'http://i.imgur.com/jUTPp8x.jpg',
            'large_url'           : 'http://i.imgur.com/jUTPp8x.jpg',
            'pos'           : '100% 80%',
            'size'          : 'cover',
            'repeat'        : 'no-repeat',
            'title'         : 'Wood Room',
            'medium'        : '3D Model, Maya',
            'date'          : '2014'
        },
        {
            'url'           : 'http://i.imgur.com/sAHFNQ0.jpg',
            'large_url'     : 'http://i.imgur.com/vcbx2ec.jpg',
            'pos'           : '35% 30%',
            'size'          : 'cover',
            'repeat'        : 'no-repeat',
            'title'         : 'Table',
            'medium'        : 'Maple, Mahogony, Oak',
            'date'          : '2013'
        },
        {
            'url'           : 'http://i.imgur.com/x3JLURh.jpg',
            'large_url'     : 'http://i.imgur.com/0sFLQch.jpg',
            'pos'           : '30% 60%',
            'size'          : 'cover',
            'repeat'        : 'no-repeat',
            'title'         : 'Guitar',
            'medium'        : 'Maple, Mahogony, Spruce, Dominos, Steel',
            'date'          : '2013'
        }
    ];

    // Get all todos
    $http.get('api/v1/todos')
        .success(function(data) {
            $scope.todoData = data;
        })
        .error(function(error) {
            console.log("Error: " + error);
        });

    $scope.createTodo = function(todoID) {

        // Create a todo
        $http.post('api/v1/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.todoData = data;
            })
            .error(function(error) {
                console.log("Error: " + error);
            });
    };

    $scope.deleteTodo = function(todoID) {
        // Delete a todo
        $http.delete('api/v1/todos/' + todoID)
            .success(function(data) {
                $scope.todoData = data;
            })
            .error(function(error) {
                console.log("Error: " + error);
            });
    };
});