const ucenter = require('./center/userCenter');
const ccenter = require('./center/contentCenter');
const ecenter = require('./center/eventCenter');
const data = require('./data');
const accounts = data.accounts;
const worker = require('./center/worker');

let count = accounts.length;

//登录所有
for(let i=0;i<accounts.length;i++){
	let user = accounts[i];
	let a = user.split("----");
	let username = a[0];
	let password = a[1];
	worker.login(username,password,function(session){
		ucenter.set(i,username,password,session);
		count--;
		if(count <= 0){
			start();
		}
	});
}

function start(){
	ccenter.init(data.contents);
	ecenter.init(ucenter,ccenter);
	ecenter.start();
}
