'use strict'

/**
*pratice node.js project
*@author Andrew Woo <in007@qq.com>
*
*/

module.exports = function(done){

  const debug = $.createDebug('methods:login');

  $.router.get('/api/login_user',async function (req,res,next){

    debug('get:/api/login_user');

    if(typeof(req.session)!='undefined'){
      res.json({user:req.session.user,token:req.session.hasOwnProperty('logout_token')?req.session.logout_token:''});
    }else{
      console.log('req.session:'+req.session);
      res.json({});
    }

  });

  //console.log($.router);
  $.router.post('/api/login',async function (req,res,next){

    debug('get:/api/login');

    if(!req.body.password) throw new Error('missing password');

    const user = await $.method('user.get').call(req.body);
    if(!user) throw new Error('user does not exists');

    if(!$.utils.validatePassword(req.body.password,user.password)){
      throw new Error('incorrect password');
    }
    console.log(req.session);
    req.session.user = user;
    req.session.logout_token = $.utils.randomString(20);

    res.json({success:true,token:req.session.logout_token});

  });

  $.router.post('/api/logout',async function (req,res,next){

    debug('get:/api/logout');

    if (req.session.logout_token && req.query.token != req.session.logout_token) {
      throw new Error('invalid token');
    }

    delete req.session.user;
    delete req.session.logout_token;

    res.json({success:true});

  });

  $.router.post('/api/signup',async function (req,res,next){

    debug('get:/api/logout');

    const user =  await $.method('user.add').call(req.body);

    res.json({user:user});

  });

  done();

};
