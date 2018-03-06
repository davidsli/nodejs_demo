const fs = require('fs');

let accounts = fs.readFileSync(__dirname + '/account.txt');
accounts = accounts.toString().split('\r\n');
let files = fs.readdirSync(__dirname+"/pic");

module.exports["accounts"] = accounts;
module.exports["imgs"] = files;