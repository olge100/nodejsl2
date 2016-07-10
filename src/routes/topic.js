'use strict'

/**
*pratice node.js project
*@author Andrew Woo <in007@qq.com>
*
*/


module.exports = function(done){

  const debug = $.createDebug('routes:topic');

  $.router.post('/api/topic/add', $.checkLogin, async function(req,res,next){

    debug('/api/topic/add:'+req.session.user._id);
    req.body.authorId = req.session.user._id;

    if ('tags' in req.body) {
      req.body.tags = req.body.tags.split(',').map(v => v.trim()).filter(v => v);
    }

    const topic = await $.method('topic.add').call(req.body);
    res.json({success:true,topic:topic});

  });

  $.router.get('/api/topic/list',async function(req,res,next){

    debug('/api/topic/list');

    if ('tags' in req.query) {
      const tags = req.query.tags;
      const tagsplit = tags.split(',');
      debug('tags:'+tags);
      debug('tags split:'+ Array.isArray(tagsplit));
      req.query.tags = req.query.tags.split(',').map(v => v.trim()).filter(v => v);
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

    $.router.get('/api/topic/item/:topic_id/comment/add',async function(req,res,next){
      req.body._id = req.params.topic_id;
      req.body.authorId = req.session.user_id;
      const comment = await

      const query = {
        _id:
      }
    });

    $.router.get('/api/topic/item/:topic_id/comment/add',async function(req,res,next){

    });

  done();
};
