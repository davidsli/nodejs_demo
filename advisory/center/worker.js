const request = require('superagent');
const fid = require('../data').fid;

let headers = {
    Accept: 'application/json, text/javascript, */*; q=0.01',
    Origin: 'http://www.soyoung.com',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.104 Safari/537.36',
    'Cache-Control': 'no-cache',
     Connection: 'keep-alive',
     Host: 'www.soyoung.com',
     Pragma: 'no-cache',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.8',
    'X-Requested-With': 'XMLHttpRequest'
};

let sendheaders = {
    Accept: 'text/plain, */*; q=0.01',
    Origin: 'http://www.soyoung.com',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.104 Safari/537.36',
    'Cache-Control': 'no-cache',
     Connection: 'keep-alive',
     Host: 'www.soyoung.com',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Upgrade-Insecure-Requests':1,
    'X-Requested-With':'XMLHttpRequest'
}

const origin = 'http://www.soyoung.com';
let urls = {
        login: origin + '/passport/dologinnew',
        send: origin + '/msg/sendmessage'
    };

function login(username,password,callback){
	request
            .post(urls.login)
            .set(headers)
            .type('form')
            .send({
                remember_me: 0,
                username: username,
                password: password
            })
            .redirects(0) // 防止页面重定向
            .end(function (err,res) {
                    try{
                        let cookie = res.headers['set-cookie'];
                                    
                        let session = cookie.join(',').match(/(PHPSESSID=.+?);/)[1];
                        console.log(username,"登录成功");
                        callback(session);
                    }catch(error){
                        console.log(username,"登陆失败");
                        console.log(error);
                    }
            });
}

function dosend(user,content,callback){
    request
            .post(urls.send)
            .set(sendheaders)
            .set('Cookie', user.session)
            .field('fid',fid)
            .field('content',content)
            .field('flag','add')
            .field('type',1)
            .field('host_uid',0)
            .field('hospital_id',0)
            .field('source_type',0)
            .field('source_id',0)
            .field('async',1)
            .end(function(err,res){
                if(err){
                    console.log(err);
                }
                console.log(user.name,"发送",content,getTime('Y-m-d H:i:s'));
                callback(user.id);
            });	
}

function fix2number(n) {  
    return [0,n].join('').slice(-2);  
}  
function getTime(format) {  
    var curdate = new Date();  
    if (format == undefined) return curdate;  
    format = format.replace(/Y/i, curdate.getFullYear());  
    format = format.replace(/m/i, fix2number(curdate.getMonth() + 1));  
    format = format.replace(/d/i, fix2number(curdate.getDate()));  
    format = format.replace(/H/i, fix2number(curdate.getHours()));  
    format = format.replace(/i/i, fix2number(curdate.getMinutes()));  
    format = format.replace(/s/i, fix2number(curdate.getSeconds()));  
    format = format.replace(/ms/i, curdate.getMilliseconds());  
    return format;  
} 

module.exports.login = login;
module.exports.dosend = dosend;