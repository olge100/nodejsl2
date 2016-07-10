'use strict'

/**
*pratice node.js project
*@author Andrew Woo <in007@qq.com>
*
*/
import validator from 'validator';

module.exports = function(done){

  const debug = $.createDebug('middleware:user');

  $.checkLogin = function(req,res,next){
    debug('check login');
    if (!(req.session && req.session.user && req.session.user._id)) {
      throw new Error('please login firstly');
    }
    debug(`user._id:${req.session.user._id}`);
    next();
  };

  done();

};
