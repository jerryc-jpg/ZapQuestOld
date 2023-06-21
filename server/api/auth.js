const express = require('express');
const app = express.Router();
const { User } = require('../db');
const { authenticate, findByToken } = require('../db/User');

module.exports = app;

app.post('/', async(req, res, next)=> {
  try {
    res.send(await authenticate(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/', async(req, res, next)=> {
  try {
    res.send(await findByToken(req.headers.authorization));
  }
  catch(ex){
    next(ex);
  }
});
