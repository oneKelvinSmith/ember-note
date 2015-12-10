module.exports = function(app) {
  var express = require('express');
  var usersRouter = express.Router();
  var bodyParser = require('body-parser');
  var nedb = require('nedb');
  var userDB = new nedb({
    fileName: 'users',
    autoload: true
  });

  app.use(bodyParser.json());

  usersRouter.post('/', function(req, res) {
    userDB
      .find({})
      .sort({
        id: -1
      })
      .limit(1)
      .exec(function(err, users) {
        if (users.length !== 0) {
          req.body.user.id = users[0].id + 1;
        } else {
          req.body.user.id = 1;

          userDB.insert(req.body.user, (_err, newUser) => {
            res.status(201);
            res.send(JSON.stringify({
              user: newUser
            }));
          });
        }
      });
  });

  usersRouter.get('/', function(req, res) {
    userDB
      .find(req.query)
      .exec(function(err, users) {
        res.send({
          users: users
        });
      });
  });

  usersRouter.get('/:id', function(req, res) {
    res.send({
      users: {
        id: req.params.id
      }
    });
  });

  usersRouter.put('/:id', function(req, res) {
    res.send({
      users: {
        id: req.params.id
      }
    });
  });

  usersRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/users', usersRouter);
};
