const request = require('superagent');
const data = require('./data');
let userid = data.did;

let headers = {
    Accept: 'application/json, text/javascript, */*; q=0.01',
    Origin: 'http://user.yuemei.com',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.104 Safari/537.36',
    'Cache-Control': 'no-cache',
     Connection: 'keep-alive',
     Host: 'user.yuemei.com',
     Pragma: 'no-cache',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'X-Requested-With': 'XMLHttpRequest'
};

let sendheaders = {
    Accept: 'application/json, text/javascript, */*; q=0.01',
    Origin: 'http://www.yuemei.com',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.104 Safari/537.36',
    'Cache-Control': 'no-cache',
     Connection: 'keep-alive',
     Host: 'www.yuemei.com',
     Pragma: 'no-cache',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'X-Requested-With': 'XMLHttpRequest'
};

const origin = 'http://user.yuemei.com';
let urls = {
        login: origin + '/user/login',
        sendmessage: origin + '/c/doccase/reply',
        clicklike: origin + '/c/doccase/agree'
    };

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

function login(account,callback){
    request
            .post(urls.login)
            .set(headers)
            .type('form')
            .send({
                username: account.username,
                password: account.password,
                json: 1,
                autologin: 0
            })
            .redirects(1)
            .end(function (err,res) {
                    try{
                        var cookie = res.headers['set-cookie'];
                        if(cookie[0].indexOf("yuemeiinfo") == -1){
                            throw account.username + "密码错误";
                        }
                                    
                        //let session = cookie.join(',').match(/(PHPSESSID=.+?);/)[1];
                        console.log(account.username,"登录",getTime("Y-m-d H:i:s"));
                        callback(cookie);
                    }catch(error){
                        console.log(account.username +"登陆失败");
                        console.log(error);
                    }
            });
}

function sendmessage(account){
    request
            .post(urls.sendmessage)
            .set(sendheaders)
            .set('Cookie', account.session)
            .field("id",data.aid)
            .field("cid",0)
            .field("content","<p>"+account.content+"</p>")
            .end(function(err,res){
                if(err){
                    console.log(err);
                }else{
                    console.log(account.username,"回复",account.content,getTime("Y-m-d H:i:s"));
                }
            });   
}

function clicklike(account){
     request
            .get(urls.clicklike)
            .set(sendheaders)
            .set('Cookie', account.session)
            .query({ id: data.aid })
            .query({ cid: 0 })
            .query({ uid: userid.uid })
            .query({ t: Math.random() })
            .end(function(err,res){
                if(err){
                    console.log(err);
                }else{
                    console.log(account.username,"点赞",getTime("Y-m-d H:i:s"));
                }
            }); 
}


module.exports.login = login;
module.exports.sendmessage = sendmessage;
module.exports.clicklike = clicklike;