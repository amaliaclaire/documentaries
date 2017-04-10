var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('movies/index', {title: 'amalia\'s movies list'});
});

module.exports = router;
