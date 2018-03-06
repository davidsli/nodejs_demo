const config = require('./configs');
const request = require('superagent');
const fs = require('fs')

let min = config.rmin;
let max = config.rmax;
let count = 1;

var headers = {
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    Origin: 'http://www.soyoung.com',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.104 Safari/537.36',
    'Cache-Control': 'no-cache',
     Connection: 'keep-alive',
     Host: 'www.soyoung.com',
     Pragma: 'no-cache',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.8',
    'Upgrade-Insecure-Requests': 1
};

function access(){
	var a = parseInt(Math.random()*190)+1;
    var b = parseInt(Math.random()*253)+1;
    var c = parseInt(Math.random()*253)+1;
    var d = parseInt(Math.random()*253)+1;
    var wzip = a+'.'+b+'.'+c+'.'+d;

    request
        .get(config.url)
        .end(function(err,data){
            if(err){
                console.log(`请求第${count++}次失败`);
            }else{
                console.log(`请求第${count++}次成功`);
            }
            if(config.israndom){
				let i = (Math.random()*(max-min)+min).toFixed(2);
				console.log(`下次请求延时${i}秒`);
				setTimeout(function(){
					access();
				},i * 1000);  
			}else{
				access();
			}
        });
}

access();