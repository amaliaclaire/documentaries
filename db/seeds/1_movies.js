exports.seed = (knex) => {
  return knex('movies').del()
    .then(() => {
      return knex('movies').insert([
        {
          id: 1,
          title: 'Jesus Camp',
          director: 'Rachel Grady',
          year: 2006,
          my_rating: 3,
          poster_url: 'http://www.gstatic.com/tv/thumb/dvdboxart/163609/p163609_d_v8_aa.jpg'
        },
        {
          id: 2,
          title: 'Hot Girls Wanted',
          director: 'Ronna Gradus',
          year: 2015,
          my_rating: 3,
          poster_url: 'http://www.gstatic.com/tv/thumb/movieposters/11464938/p11464938_p_v8_aa.jpg'
        },
        {
          id: 3,
          title: 'Hurt Locker',
          director: 'Kathryn Bigelow',
          year: 2009,
          my_rating: 3,
          poster_url: 'http://www.gstatic.com/tv/thumb/movieposters/197175/p197175_p_v8_ah.jpg'
        },
        {
          id: 4,
          title: 'White Helmets',
          director: 'James Le Mesurier',
          year: 2014,
          my_rating: 5,
          poster_url: 'http://filmmusicreporter.com/wp-content/uploads/2016/11/the-white-helmets.jpg'
        },
        {
          id: 5,
          title: 'The Act Of Killing',
          director: 'Joshua Oppenheimer',
          year: 2013,
          my_rating: 5,
          poster_url: 'https://upload.wikimedia.org/wikipedia/en/c/ca/The_Act_of_Killing_%282012_film%29.jpg'
        }
      ])
    }).then(() => {
      return knex.raw(
        "SELECT setval('movies_id_seq', (SELECT MAX(id) FROM movies));"
      )
    })
}
