var express = require('express');
var router = express.Router();
var db = require('../db')


/* GET home page. */
router.get('/', function(req, res, next) {
  db('movies').then(movies =>{
    res.render('movies/index', {movies}); // movies/index.hbs section
  })

});

router.get('/new', function(req, res, next){
  res.render('movies/new')
})



router.get('/:id', function(req, res, next){
  let id = req.params.id

  db('movies').select('*').where({
    'id': id
  }).then(movies =>{
    res.render('movies/details', {amalia : movies[0]})
  })
})



router.post('/', (req, res, next) =>{
  var movie = {
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    my_rating: req.body['my-rating'],
    poster_url: req.body['poster-url']
  }
  db('movies').insert(movie, '*').then((newMovie)=>{
    console.log(newMovie)
    var id = newMovie[0].id

    res.redirect('/movies/' + id) // takes the actual path

  })
})


module.exports = router;
