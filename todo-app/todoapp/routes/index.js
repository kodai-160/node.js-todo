const express = require('express');
const router = express.Router();
const knex = require("../db/knex")
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'todo_app',
});

router.get('/', function (req, res, next) {
  const userId = req.session.userid;
  const isAuth = Boolean(userId);
  console.log(`isAuth: ${isAuth}`);

  knex("tasks")
    .select("*")
    .then(function (results) {
      console.log(results);
      res.render('index', {
        title: 'ToDo App',
        todos: results,
        isAuth: isAuth,
      });
    })
    .catch(function (err) {
      console.error(err);
      res.render('index', {
        title: 'ToDo App',
        todos: [],
        isAuth: isAuth,
      });
    });
});

router.post('/', function (req, res, next) {
  const userId = req.session.userid;
  const isAuth = Boolean(userId);
  const todo = req.body.add;
  knex("tasks")
    .insert({user_id: userId, content: todo})
    .then(function () {
      res.redirect('/')
    })
    .catch(function (err) {
      console.error(err);
      res.render('index', {
        title: 'Todo App',
        isAuth: isAuth,
      });
    });
});

router.use('/signup', require('./signup'));
router.use('/signin', require('./signin'));
router.use('/logout', require('./logout'));

module.exports = router;