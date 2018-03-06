const data = require('../data');
const worker = require('./worker');
// 引入 events 模块
const events = require('events');
// 创建 eventEmitter 对象
const emitter = new events.EventEmitter();
let min = data.rmin;
let max = data.rmax;

function eventCenter(){
	this.init = init;
	this.start = start;
	this.count = 0;
	this.users;
	this.contents;
}

function init(users,contents){
	this.count = users.size();
	this.users = users;
	this.contents = contents;
}

function start(){
	for (let i=0;i<this.count;i++) {
		let user = this.users.get(i);
		let content = this.contents.get(i);
		let time = (Math.random()*(max-min)+min).toFixed(2);
		setTimeout(function(){
			worker.dosend(user,content,callback);
		},time * 1000);	
	}
}

function run(index,that){
	let content = that.contents.get(index);
	if(content){
		let user = that.users.get(index);
		let i = (Math.random()*(max-min)+min).toFixed(2);
		setTimeout(function(){
			worker.dosend(user,content,callback);
		},i * 1000);
	}
}

emitter.on('complate',run);

function callback(index){
	emitter.emit('complate',index,instance);
}

var instance = new eventCenter();
module.exports = function(){
    return instance;
}();