const request = require('request');
const cheerio = require("cheerio");
const config = require('./configs');
const fs = require('fs');

let accounts = fs.readFileSync(__dirname + '/' + config.account);
accounts = accounts.toString().split('\r\n');

let contents = fs.readFileSync(__dirname + '/' + config.content);
contents = contents.toString().split('\r\n');

function Data(){
	this.uid = 0;
}
let did = new Data();

request.get({url:config.aurl,gzip:true},function(err,res,body){
	let $ = cheerio.load(body);
	let tmp = $(".diary-data > a:nth-child(1)").attr('href');
	did.uid = tmp.replace(/[^0-9]/ig,"");
});

module.exports["accounts"] = accounts;
module.exports["contents"] = contents;
module.exports["aid"] = config.aurl.replace(/[^0-9]/ig,"");
module.exports.did = did;
module.exports["rmin"] = config.op_min;
module.exports["rmax"] = config.op_max;
module.exports["todo"] = config.todo;