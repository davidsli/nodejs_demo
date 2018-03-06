const async = require('async');
const data = require('./data');
const woker = require('./woker');

let accounts = data.accounts;
let contents = data.contents;
let min = data.rmin;
let max = data.rmax;

function Account(id,username,password){
	this.id = id;
	this.username = username;
	this.password = password;
	this.content = "";
	this.session = "";
}

let count = 0;

var login = function(callback){
	let user = accounts[count];
	let a = user.split("----");
	let account = new Account(count,a[0],a[1]);
	woker.login(account,function(session){
		account.session = session;
		callback(null,account);
	});
}

var sendmessage = function(account,callback){
	let i = (Math.random()*(max-min)+min).toFixed(2);
	if(account.id > contents.length-1)
		throw "评论已经没有了";
	account.content = contents[account.id];
	setTimeout(function(){
		woker.sendmessage(account);
		callback(null,account);
	},i * 1000);
}

var clicklike = function(account,callback){
	let i = (Math.random()*(max-min)+min).toFixed(2);
	setTimeout(function(){
		woker.clicklike(account);
		callback(null,null);
	},i * 1000);	
}

let todo = data.todo;
let todos = [];
if(todo === 1){
	todos = [login,sendmessage];
}else if(todo === 2){
	todos = [login,clicklike];
}else if(todo === 3){
	todos = [login,sendmessage,clicklike];
}

function start(){
	async.waterfall(todos,function(err,result){
		if(err){
			console.log(err);
		}
		count++;
		if(accounts.length === count){
			console.log('=========全部账号已经执行完毕===========');
		}else{
			start();
		}
	});
}

console.log('========自动服务运行中..=========');
start();