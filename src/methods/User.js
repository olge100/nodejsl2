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
const debug = $.createDebug('user');

module.exports = function(done){
  debug('adding... ');
  $.method('user.add').check({
    name:{required:true,validate: (v)=>validator.isLength(v,{min:6, max:20} && /^[a-zA-z]/.test(v))},
    email:{required:true,validate: (v)=>validator.isEmail(v)},
    password:{required:true,validate: (v)=>validator.isLength(v,{min:6})},
  });
  $.method('user.add').register(async function(params,callback){

    params.name = params.name.toLowerCase();
    {
      const user = await $.method('user.get').call({name:params.name});
      if(user) return callback(new Error(`user ${params.name} already exists`));
    }
    {
      const user = await $.method('user.get').call({name:params.email});
      if(user) return callback(new Error(`user ${params.email} already exists`));
    }

    params.password = $.utils.encryptPassword(params.password.toString());
    const user = new $.model.User(params);
    user.save(callback);
    debug('add end ');
  });

  $.method('user.get').check({
    _id:{validate: (v)=>validator.isMongoId(v)},
    name:{validate: (v)=>validator.isLength(v,{min:6, max:20} && /^[a-zA-z]/.test(v))},
    email:{validate: (v)=>validator.isEmail(v)},
  });

  $.method('user.get').register(async function(params,callback){
    debug('getting... ');
    const query = {};

    if(params._id){
      query._id = params._id;
    }else if(params.name){
      query.name =params.name;
    }else if(params.email){
      query.email =params.email;
    }else{
      return new Error('missing params _id|name|email');
    }
    debug('get end... ');
    return $.model.User.findOne(query);

  });

  $.method('user.update').check({
    _id:{validate: (v)=>validator.isMongoId(v)},
    name:{validate: (v)=>validator.isLength(v,{min:6, max:20} && /^[a-zA-z]/.test(v))},
    email:{validate: (v)=>validator.isEmail(v)},
  });

  $.method('user.update').register(async function(params,callback){
    debug('updating... ');
    const user = await $.method('user.get').call(params);
    if (!user) {
      return new Error('user does not exists');
    }
    debug('user.get end ');

    const update = {};
    if (params.name && user.name !== params.name) {
      update.name = params.name;
    }
    if (params.email && user.email !== params.email) {
      update.email = params.email;
    }
    if (params.password && user.password !== params.password) {
      update.password = params.password;
    }
    if (params.nickname && user.nickname !== params.nickname) {
      update.nickname = params.nickname;
    }
    if (params.about && user.about !== params.about) {
      update.about = params.about;
    }
    debug('update end ');
    return $.model.User.update({_id:user._id},{$set:update});

  });

  done();
};
