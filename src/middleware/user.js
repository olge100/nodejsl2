'use strict'

/**
*pratice node.js project
*@author Andrew Woo <in007@qq.com>
*
*/
import validator from 'validator';
import createDebug from 'debug';

//初建debug函数
$.createDebug = function(name){
  return createDebug('my:'+name);
};
const debug = $.createDebug('middleware:user');

module.exports = function(done){

  $.checkLogin = function(req,res,next){
    if (!(req.session && req.session.user && req.session.user._id)) {
      throw new Error('please login firstly');
    }
    next();
  };

  done();

};
