const config = require('./configs');
const fs = require('fs');
const queue = require('./queue');

let accounts = fs.readFileSync(__dirname +"/"+ config.account);
accounts = accounts.toString().split('\r\n');

let content = fs.readFileSync(__dirname +"/"+ config.content);
content = content.toString().split('\r\n');

let index = 0;
let contents = new Map();
let data = queue();
for(let i=0;i<content.length;i++){
	if(content[i] != ''){
		data.enqueue(content[i]);
	}else{
		contents.set(index,data);
		if(index++ >= accounts.length){
			break;
		}
		data = queue();
	}
}
if(index <= accounts.length-1){
	contents.set(index,data);
}

module.exports["accounts"] = accounts;
module.exports["contents"] = contents;
module.exports["fid"] = config.fid;
module.exports["rmin"] = config.rmin;
module.exports["rmax"] = config.rmax;