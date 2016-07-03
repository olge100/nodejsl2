'use strict'

/**
*pratice node.js project
*@author Andrew Woo <in007@qq.com>
*
*/


module.exports = function(done){

  $.router.post('/api/topic/add', $.checkLogin, async function(req,res,next){
    req.body.authorId = req.session.user._id;

    if ('tag' in req.body) {
      req.body.tags = req.body.tags.split(',').map(v = v.trim()).filter(v => v);
    }

    const topic = await $.method('topic.add').call(req.body);
    res.json({success:true,topic:topic});

  });

  $.router.get('/api/topic/list',async function(req,res,next){

    if ('tag' in req.query) {
      req.body.tags = req.body.tags.split(',').map(v = v.trim()).filter(v => v);
    }

    const list = await $.method('topic.list').call(req.query);
    res.json({success:true,list:list});

  });

  $.router.get('/api/topic/item/:topic_id',async function(req,res,next){

    const topic = $.method.call({_id:req.params.topic_id});
    if (!topic) {
      throw new Error(`topic ${req.params.topic_id} does not exists`);
    }
    res.json({success:true,topic:topic});

  });

  done();
};
