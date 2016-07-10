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

  const cache = redis;

  //实例化session
  $.session = session({
    /*genid: function(req) {
      return genuuid(); // use UUIDs for session IDs
    },*/
    store:redis,
    secret:$.config.get('web.session.secret'),
    resave:false,
    saveUninitialized:false,
    //cookie: { secure: true }
  });

  done();

};
