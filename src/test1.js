'use strict'

/**
*pratice node.js project
*@author Andrew Woo <in007@qq.com>
*
*/

import path from "path";
import ProjectCore from "project-core";
import createDebug from 'debug';

const $ = global.$ = new ProjectCore();
//初建debug函数
$.createDebug = function(name){
  return createDebug('my:'+name);
};
const debug = $.createDebug('server');

$.init.add((done)=>{
  $.config.load(path.resolve(__dirname,'config.js'));
  done();
});

$.init.load(path.resolve(__dirname,'init','express.js'));

//初始化
$.init((err)=>{
  if(err){
    console.error(err);
    process.exit(-1);
  }else {
    debug(`inited[env=${$.env}]`);
    //console.log("inited[env=%s]",$.env);
  }
});
