
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
            'name'          : 'arbitrage_landing',
            'url'           : 'http://i.imgur.com/6glD8Yj.jpg',
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
            'url'           : 'http://i.imgur.com/WdR9k3Z.jpg',
            'name'          : 'arbitrage_video',
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
            'url'           : 'http://i.imgur.com/8h4WB0j.jpg',
            'name'          : 'workable',
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
            'url'           : 'http://i.imgur.com/WgwHekG.jpg',
            'name'          : 'cities',
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
            'url'           : 'http://i.imgur.com/HEQwfJh.jpg',
            'name'          : 'simpletext',
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
            'url'           : 'http://i.imgur.com/fbxzsfC.jpg',
            'name'          : 'breezethru',
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
            'name'          : 'horse',
            'url'           : 'http://i.imgur.com/EjVuFBG.jpg',
            'large_url'     : 'http://i.imgur.com/J0pmOlV.jpg',
            'pos'           : '35% 50%',
            'size'          : 'cover',
            'repeat'        : 'no-repeat',
            'title'         : 'Horse on Western Massachusetts Farm',
            'description'   : 'Palette Knife Painting, 9\" X 12\"',
            'medium'        : 'Acrylic on Canvas',
            'date'          : '2014'
        },
        {
            'name'          : 'self_portrait_sweatshirt',
            'url'           : 'http://i.imgur.com/mmPXY5K.jpg',
            'large_url'     : 'http://i.imgur.com/KuEXstZ.jpg',
            'pos'           : '60% 0%',
            'size'          : 'cover',
            'repeat'        : 'no-repeat',
            'title'         : 'Self Portrait in Green',
            'description'   : '24\" X 36\"',
            'medium'        : 'Oil on Canvas',
            'date'          : '2014'
        },
        {
            'name'          : 'stare',
            'url'           : 'http://i.imgur.com/tBb7DqK.jpg',
            'large_url'     : 'http://i.imgur.com/FKWppbH.jpg',
            'pos'           : '72% 10%',
            'size'          : 'cover',
            'repeat'        : 'no-repeat',
            'title'         : 'The Stare',
            'medium'        : 'Digital Painting, Wacom Tablet, Photoshop',
            'date'          : '2014'
        },
        {
            'name'          : 'woman_reclining',
            'url'           : 'http://i.imgur.com/305hKYm.jpg',
            'large_url'     : 'http://i.imgur.com/fOAzpfB.jpg',
            'pos'           : '85% 50%',
            'size'          : 'cover',
            'repeat'        : 'no-repeat',
            'title'         : 'Woman Reclining',
            'description'   : '18\" X 24\"',
            'medium'        : 'Oil on Canvas',
            'date'          : '2014'
        },
        {
            'name'          : 'ladyagnew',
            'url'           : 'http://i.imgur.com/XZfwxVF.jpg',
            'large_url'     : 'http://i.imgur.com/syfP0P1.jpg',
            'pos'           : '50% 10%',
            'size'          : 'cover',
            'repeat'        : 'no-repeat',
            'title'         : 'Lady Agnew of Lochnaw',
            'description'   : 'After John Singer Sargent',
            'medium'        : 'Digital Painting, Ipad, Nomad Brush Stylus, Procreate 2',
            'date'          : '2014'
        },
        {
            'name'          : 'emma_sneakers',
            'url'           : 'http://i.imgur.com/CcZT8Cl.jpg',
            'large_url'     : 'http://i.imgur.com/9wPWxQS.jpg',
            'pos'           : '60% 80%',
            'size'          : 'cover',
            'repeat'        : 'no-repeat',
            'title'         : 'Emma Sitting',
            'medium'        : 'Digital Painting, Wacom Tablet, Photoshop',
            'date'          : '2014'
        },
        {
            'name'          : 'elephants',
            'url'           : 'http://i.imgur.com/BCzBsAU.jpg',
            'large_url'     : 'http://i.imgur.com/fm3ww0e.jpg',
            'pos'           : '26% 40%',
            'size'          : 'cover',
            'repeat'        : 'no-repeat',
            'title'         : 'Elephants',
            'medium'        : 'Digital Painting, Wacom Tablet, Photoshop',
            'date'          : '2014'
        },
        {
            'name'          : 'track',
            'url'           : 'http://i.imgur.com/OYVgtlN.jpg',
            'large_url'     : 'http://i.imgur.com/d8hOhtf.jpg',
            'pos'           : '80% 20%',
            'size'          : 'cover',
            'repeat'        : 'no-repeat',
            'title'         : 'Track',
            'medium'        : 'Digital Painting, Ipad, Nomad Brush Stylus, Procreate 2',
            'date'          : '2014'
        },
        {
            'name'          : 'emma',
            'url'           : 'http://i.imgur.com/D4X72kU.jpg',
            'large_url'     : 'http://i.imgur.com/qBKO2GS.jpg',
            'pos'           : '35% 43%',
            'size'          : 'cover',
            'repeat'        : 'no-repeat',
            'title'         : 'Emma',
            'description'   : '18\" X 24\"',
            'medium'        : 'Oil on Canvas',
            'date'          : '2014'
        },
        {
            'name'          : 'self_portrait_old',
            'url'           : 'http://i.imgur.com/263b7TP.jpg',
            'large_url'     : 'http://i.imgur.com/zlSq7Dk.jpg',
            'pos'           : '40% 100%',
            'size'          : 'cover',
            'repeat'        : 'no-repeat',
            'title'         : 'Self Portrait',
            'description'   : '18\" X 24\"',
            'medium'        : 'Oil on Canvas',
            'date'          : '2014'
        },
        {
            'name'          : 'dream_catcher_earrings',
            'url'           : 'http://i.imgur.com/o7g3Mj4.jpg',
            'large_url'     : 'http://i.imgur.com/Sdi2375.jpg',
            'pos'           : '40% 65%',
            'size'          : 'cover',
            'repeat'        : 'no-repeat',
            'title'         : 'Dream Catcher Earrings',
            'description'   : '18\" X 24\"',
            'medium'        : 'Oil on Canvas',
            'date'          : '2014'
        },
        {
            'name'          : 'sailor',
            'url'           : 'http://i.imgur.com/1lHx1q7.jpg',
            'large_url'     : 'http://i.imgur.com/AUbSjGX.jpg',
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
            'name'          : 'lizard',
            'url'           : 'http://i.imgur.com/KvBXvH1.jpg',
            'pos'           : '25% 20%',
            'size'          : 'cover',
            'repeat'        : 'no-repeat',
            'title'         : 'Lizard',
            'medium'        : '3D Model, Maya, Mudbox',
            'date'          : '2014'
        },
        {
            'name'          : 'coins',
            'url'           : 'http://i.imgur.com/PNU1CK2.jpg',
            'pos'           : '12% 80%',
            'size'          : 'cover',
            'repeat'        : 'no-repeat',
            'title'         : 'Coins on Table',
            'medium'        : '3D Model, Maya, Mudbox',
            'date'          : '2014'
        },
        {
            'name'          : 'keyboard',
            'url'           : 'http://i.imgur.com/IKTvzyE.jpg',
            'pos'           : '90% 80%',
            'size'          : 'cover',
            'repeat'        : 'no-repeat',
            'title'         : 'Keyboard, Monitor, and Computer',
            'medium'        : '3D Model, Maya, Mudbox',
            'date'          : '2014'
        },
        {
            'name'          : 'wooden_room',
            'url'           : 'http://i.imgur.com/lG0RfGv.jpg',
            'pos'           : '100% 80%',
            'size'          : 'cover',
            'repeat'        : 'no-repeat',
            'title'         : 'Wood Room',
            'medium'        : '3D Model, Maya',
            'date'          : '2014'
        },
        {
            'name'          : 'table',
            'url'           : 'http://i.imgur.com/OrJraur.jpg',
            'large_url'     : 'http://i.imgur.com/vcbx2ec.jpg',
            'pos'           : '35% 30%',
            'size'          : 'cover',
            'repeat'        : 'no-repeat',
            'title'         : 'Table',
            'medium'        : 'Maple, Mahogony, Oak',
            'date'          : '2013'
        },
        {
            'name'          : 'guitar',
            'url'           : 'http://i.imgur.com/VuAo5o6.jpg',
            'large_url'     : 'http://i.imgur.com/GvhYAUm.jpg',
            'pos'           : '30% 60%',
            'size'          : 'cover',
            'repeat'        : 'no-repeat',
            'title'         : 'Guitar',
            'medium'        : 'Maple, Mahogony, Spruce, Dominos, Steel',
            'date'          : '2013'
        }
    ];

    // // Get all todos
    // $http.get('api/v1/todos')
    //     .success(function(data) {
    //         $scope.todoData = data;
    //     })
    //     .error(function(error) {
    //         console.log("Error: " + error);
    //     });

    // $scope.createTodo = function(todoID) {

    //     // Create a todo
    //     $http.post('api/v1/todos', $scope.formData)
    //         .success(function(data) {
    //             $scope.formData = {};
    //             $scope.todoData = data;
    //         })
    //         .error(function(error) {
    //             console.log("Error: " + error);
    //         });
    // };

    // $scope.deleteTodo = function(todoID) {
    //     // Delete a todo
    //     $http.delete('api/v1/todos/' + todoID)
    //         .success(function(data) {
    //             $scope.todoData = data;
    //         })
    //         .error(function(error) {
    //             console.log("Error: " + error);
    //         });
    // };
});