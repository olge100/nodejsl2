'use strict'

/**
*pratice node.js project
*@author Andrew Woo <in007@qq.com>
*
*/
import express from 'express';
import session from 'express-session';

module.exports = function(done){
  const app = express();
  // Use the session middleware
  app.use(session({
    secret:$.config.get('web.session.secret'),
    resave: false,
    saveUninitialized: false,
  }));

  const router = express.Router();
  app.use(router);
  // Access the session as req.session
  router.get('/', async function(req, res, next) {
    req.session.count++;
    console.log('session:'+req.session);
    res.json({'node':req.session});
  });
  app.listen(3000,(err) => {
    done(err);
  });
  done();

};
