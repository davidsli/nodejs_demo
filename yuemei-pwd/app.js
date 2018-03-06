const async = require('async');
const data = require('./data');
const woker = require('./woker');

let accounts = data.accounts;
let imgs = data.imgs;

function Account(username,password,avatar){
	this.username = username;
	this.password = password;
	this.avatar = avatar;
	this.session = "";
}

let count = 0;

var login = function(callback){
	let user = accounts[count];
	let a = user.split("----");
	let account = new Account(a[0],a[1],imgs[count]);
	woker.login(account,function(data){
		account.session = data;
		callback(null,account);
	});
}

var modifyAvatar = function(account,callback){
	woker.modifyAvatar(account);
	callback(null,account);
}

var changePassword = function(account,callback){
	woker.changePassword(account);
	callback(null,"ok");
}

function start(){
	async.waterfall([login,modifyAvatar,changePassword],function(err,result){
		if(err){
			console.log(err);
		}
		count++;
		if(accounts.length === count){
			console.log('=========全部账号已经执行===========');
		}else{
			start();	
		}
	});
}

console.log('========自动服务运行中=========');
start();