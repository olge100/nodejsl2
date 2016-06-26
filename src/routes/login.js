'use strict'

/**
*pratice node.js project
*@author Andrew Woo <in007@qq.com>
*
*/
module.exports = function(done){
  $.router.post('/api/login',async function (req,res,next){
    const user = $.method('user.get').call(req,body);

    if(!user) return nex(new Error('user does not exists'));
    if(!$.utils.validatePassword(req.body.password,user.password)){
      return next(new Error('incorrect password'));
    }

    res.json({success:true});
  });

  $.router.post('/api/logout',async function (req,res,next){

  });

  $.router.post('/api/signup',async function (req,res,next){

  });
};
