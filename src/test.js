'use strict'

/**
*pratice node.js project
*@author Andrew Woo <in007@qq.com>
*
*/
/*
$.method('user.add').call({
  name:'ssy',
  nickname:'是谁呀',
  email:'xxx@x.com'
},console.log);

$.method('user.get').call({
  name:'User2016062221Jun45',
},console.log);

$.method('user.update').call({
  name:'User2016062221Jun45',
  nickname:'粮食店街凤梨酥',
},console.log);*/


import express from 'express';
var app = express();
var router = express.Router();
/*app.get('/',function(req,res,next){
  res.end(`现在是北京时间${new Date()}`);
});*/


// will handle any request that ends in /events
// depends on where the router is "use()'d"
router.get('/test', function(req, res, next) {
  res.end(`现在是北京时间${new Date()} /test`);
});

app.use(router);
app.listen(3000);

/*
var express = require('express');
var app = express();

app.get('/', function(req, res){
  //res.send('hello world');
  res.end(`现在是北京时间${new Date()}`);
});

app.listen(3000);*/

/*
var express = require('express');
var app = express();
var router = express.Router();

router.count = 0;
router.get('/users/:user', function(req, res, next) {
    router.count ++;
    console.log(router.count);
});
router.param('user', function(req, res, next, id) {
    router.count ++;
    res.send({count: router.count});
    next();
});

app.use(router);
app.listen(3000);
*/
