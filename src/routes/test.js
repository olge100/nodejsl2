'use strict'

/**
*pratice node.js project
*@author Andrew Woo <in007@qq.com>
*
*/


module.exports = function(done){
  $.router.get('/',function(req,res,next){
    res.end(`现在是北京时间${new Date()}`);
  });

  done();
};
