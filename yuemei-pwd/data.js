const fs = require('fs');
console.log("========初始化数据===========");
let accounts = fs.readFileSync(__dirname + '/account.txt');
accounts = accounts.toString().split('\r\n');
let files = fs.readdirSync(__dirname+"/pic");

module.exports["accounts"] = accounts;
module.exports["imgs"] = files;