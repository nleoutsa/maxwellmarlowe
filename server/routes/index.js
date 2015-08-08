var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = require(path.join(__dirname, '../', '../', 'config'));



/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.sendFile(path.join(__dirname, "../", "../", "client/", "views/","index.html"));
});


// GET all todos
router.get('/api/v1/todos', function(req, res) {

    // GET Postgres client from connection pool
    pg.connect(connectionString, function(err, client, done) {

        displayTodos(res, err, client);
    });
});

// CREATE one todo
router.post('/api/v1/todos', function(req, res) {

    // Grab data from http request
    var data = {text: req.body.text, complete: false};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {

        // SQL Query > Insert Data
        client.query("INSERT INTO items(text, complete) values($1, $2)", [data.text, data.complete]);

        displayTodos(res, err, client);
    });
});

// Update a todo
router.put('/api/v1/todos/:todo_id', function(req, res) {

    // get id from request params
    var id = req.params.todo_id;

    // get data from request body
    var data = {
        text: req.body.text,
        complete: req.body.complete
    };

    // GET Postgres client from connection pool
    pg.connect(connectionString, function(err, client, done) {

        // SQL QUERY update
        client.query("UPDATE items SET text=($1), complete=($2) WHERE id=($3)", [data.text, data.complete, id]);

        displayTodos(res, err, client);
    });
});



// DELETE one todo
router.delete('/api/v1/todos/:todo_id', function(req, res) {

     //get id from request params
    var id = req.params.todo_id;

    // GET Postgres client from connection pool
    pg.connect(connectionString, function(err, client, done) {

        // SQL QUERY DELETE todo by id
        client.query("DELETE FROM items WHERE id=($1)", [id]);

        displayTodos(res, err, client);

    });
});

var displayTodos = function (res, err, client, done) {

        var results = [];

            // SQL QUERY SELECT data from items table, ie: return all items data
        var query = client.query("SELECT * FROM items ORDER BY id ASC;");

        // stream results one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // after data is returned, close connection with "client.end();" then return results
        query.on('end', function() {
            client.end();
            return res.json(results);
        })

        if (err) {
            console.log(err);
        }
};

module.exports = router;
