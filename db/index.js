const env = process.env.NODE_ENV || 'development';
// NODE_ENV heroku defaults this to production 
const config = require('../knexfile.js')[env];
// brackets allows the value of ENV to be used rather than hardcoding OBJECT at env.
const knex = require('knex')(config);

module.exports = knex;
