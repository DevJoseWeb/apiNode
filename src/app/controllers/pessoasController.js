const express = require('express');
const cors = require('cors');
const mongoosePaginate = require('mongoose-paginate');//paginação
//const authMiddleware = require('../middlewares/auth');

const Pessoas = require('../models/Pessoas');

const router = express.Router();

//router.use(authMiddleware);
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET","DELETE","POST","PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

router.get('/', async (req, res, next) => {
  try {
   
    const pessoas = await Pessoas.find().populate(['user']);
    //Post.paginate({},{page:2, limit:2})
    return res.send({ pessoas });
  } catch (err) {
    return res.status(400).send({ error: 'Error loading pessoas' });
  }
});

module.exports = app => app.use('/pessoas', router);
