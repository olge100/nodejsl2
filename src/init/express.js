'use strict'

/**
*pratice node.js project
*@author Andrew Woo <in007@qq.com>
*
*/
import path from 'path';
import express from 'express';
import serveStatic from 'serve-static';
import bodyParser from 'body-parser';
import multiparty from 'connect-multiparty';


//var con_redis = require('connect-redis')(express);

module.exports = function(done){
  const debug = $.createDebug('init:express');

  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:false}));
  app.use(multiparty());

  const router = express.Router();
  $.express = app;
  $.router = router;


  const routerWrap = {};
  ['get','head','post','put','del','delete'].forEach(method => {
    routerWrap[method] = function(path,...fnList){
      fnList = fnList.map(fn => {
        return function(req,res,next){
          const ret = fn(req,res,next);
          if(ret.catch)ret.catch(next);
        };
      });

      router[method](path,...fnList);
    }
  });
  $.router = routerWrap;

  app.use(router);
  app.use('/static',serveStatic(path.resolve(__dirname,'../../static')));

  app.use('/api',function(err,req,res,next){
    debug('API error:%s',err && err.stack || err);
    res.json({err:err.toString()});
  });

  debug(`listen: ${$.config.get('web.port')}`);
  app.listen($.config.get('web.port'),(err) => {
    done(err);
  });

  done();
};
