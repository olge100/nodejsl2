'use strict'

/**
*pratice node.js project
*@author Andrew Woo <in007@qq.com>
*
*/
import connectRedis from 'connect-redis';
import session from 'express-session';

module.exports = function(done){

  const redisStore = connectRedis(session);
  const redis = new redisStore({
    host:$.config.get('cache.redis.host'),
    port:$.config.get('cache.redis.port')
  });

  $.cache = redis;
  $.express.use(session({
    store:redis,
    secret:$.config.get('web.session.secret'),
    resave:false,
    saveUninitialized:false,
  }));

  done();

};
