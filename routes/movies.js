var express = require('express');
var router = express.Router();
var db = require('../db')


/* GET home page. */
router.get('/', function(req, res, next) {
  db('movies').then(movies =>{
    res.render('movies/index', {movies}); // movies/index.hbs section
  })

});

//get to the form
router.get('/new', function(req, res, next){
  res.render('movies/new')
})



//get a single ID
router.get('/:id', function(req, res, next){ // this router.get('/:id') allows us to retrieve 1 movie id
  let id = req.params.id // req is requesting tot he server where the p

  db('movies').select('*').where({
    'id': id
  }).then(movies =>{
    res.render('movies/details', {amalia : movies[0]})
  })
})

router.get('/:id/edits', (req, res, next) => {
  var id = req.params.id
  db('movies').select('*').where({ id }).first().then(movie => {
    res.render('movies/edits', { movie })
  })
 })






//post adding a new movie

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


//put update your stuff
router.put('/', (req, res, next) =>{
  var movie = {
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    my_rating: req.body['my-rating'],
    poster_url: req.body['poster-url']
  }
  db('movies').update(movie, '*').then((newMovie)=>{
    console.log(newMovie)
    var id = newMovie[0].id

    res.redirect('/movies/' + id) // takes the actual path

  })
})


//deleting a single movie

router.delete('/:id', function (req, res, next){
  var id = req.params.id
  db('movies').del().where({id}).then(()=>{
    res.redirect('/movies')
  })
})


module.exports = router;
