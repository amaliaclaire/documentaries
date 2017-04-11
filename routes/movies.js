var express = require('express');
var router = express.Router();
var db = require('../db')


/* GET home page. */
router.get('/', function(req, res, next) {
  db('movies').then(movies =>{
    res.render('movies/index', {movies}); // movies/index.hbs section
  })

});

router.get('/:id', function(req, res, next) {
  let id = req.params.id
  db('movies').select('id','title', 'director', 'year', 'my_rating', 'poster_url')
  .where({
    'id': id
  }).then(movies =>{
    res.render('movies/details', {amalia : movies[0]}); // movies/index.hbs section
  })

});

module.exports = router;
