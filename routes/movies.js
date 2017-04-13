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


//editing the single id
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
  //this is the year validation
    var year = parseInt(req.body.year) //wes code
    if (Number.isNaN(year) || year < 1878) {
      res.render('movies/new', { error: 'Year is all fucked.', movie })
     } else {
       db('movies').insert(movie, '*').then(newMovie => {
        var id = newMovie[0].id
         res.redirect(`/movies/${id}`)
       })
     }
})


//put update your stuff
router.put('/:id', (req, res, next) =>{
  const id = req.params.id
  console.log(req.params.id);
  var movie = {
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    my_rating: req.body['my-rating'],
    poster_url: req.body['poster-url']
  }

  db('movies')
  .update(movie, '*')
  .where('id', id)
  .then((movieStuff) =>{

    res.redirect(`/movies/${id}`)
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
