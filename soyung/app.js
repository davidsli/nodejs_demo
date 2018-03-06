const async = require('async');
const data = require('./data');
const woker = require('./woker');

let accounts = data.accounts;
let imgs = data.imgs;
let account = {
	username: "",
	password: "",
	avatar: "",
	session: "",
	login_uid: "",
	login_token: ""
}
let count = 0;

var login = function(callback){
	let user = accounts[count];
	let a = user.split("----");
	account.username = a[0];
	account.password = a[1];
	account.avatar = imgs[count];
	woker.login(account,function(data){
		account.session = data.session;
		account.login_uid = data.login_uid;
		account.login_token = data.login_token;
		callback(null,account);
	});
}

var modifyAvatar = function(account,callback){
	woker.modifyAvatar(account,function(res){
		callback(null,account);
	});	
}

var changePassword = function(account,callback){
	woker.changePassword(account,function(res){
		callback(null,account.username+"修改完毕");
	});	
}

function start(){
	async.waterfall([login,modifyAvatar,changePassword],function(err,result){
		if(err){
			console.log(err);
		}
		console.log(result);
		count++;
		if(accounts.length === count+1){
			console.log('=========全部账号已经执行完毕===========');
		}else{
			start();
		}
	});
}

console.log('========自动服务运行中..=========');
start();