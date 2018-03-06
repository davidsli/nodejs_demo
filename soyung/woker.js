const request = require('superagent');
//新密码
const newpassword = "sb123456";

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

let avatarheaders = {
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    Origin: 'http://www.soyoung.com',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.104 Safari/537.36',
    'Cache-Control': 'no-cache',
     Connection: 'keep-alive',
     Host: 'www.soyoung.com',
     Pragma: 'no-cache',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Upgrade-Insecure-Requests':1
};

const origin = 'http://www.soyoung.com';
let urls = {
        login: origin + '/passport/dologinnew',
        modifyAvatar: origin + '/profile/avatar/act/edit',
        modifyAvatar2: origin + '/profile/avatar/act',
		changePassword: origin + '/profile/password'
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
                remember_me: 0,
                username: account.username,
                password: account.password
            })
            .redirects(0) // 防止页面重定向
            .end(function (err,res) {
                    try{
                        var cookie = res.headers['set-cookie'];
                                    
                        let data = {
                            session: cookie.join(',').match(/(PHPSESSID=.+?);/)[1],
                            login_uid: cookie.join(',').match(/(login_uid=.+?);/)[1],
                            login_token: cookie.join(',').match(/(login_token=.+?);/)[1]
                        }
                        callback(data);
                    }catch(error){
                        console.log(account.username +"登陆失败");
                        console.log(error);
                    }
            });
}

function modifyAvatar(account,callback){
    let imgpath = __dirname +"/pic/"+ account.avatar;
    request
            .post(urls.modifyAvatar)
            .set(avatarheaders)
            .set('Cookie', account.session+";"+account.login_uid+";"+account.login_token)
            .attach("imgpath",imgpath,account.avatar)
            .end(function(err,res){
                if(err){
                    console.log(err);
                }else{
                    request.get(urls.modifyAvatar2).end(function(err,res){
                        console.log(account.username,"修改头像成功");
                        callback("ok");
                    });
                }
            });   
}

function changePassword(account,callback){
     request
            .post(urls.changePassword)
            .set(avatarheaders)
            .set('Cookie', account.session+";"+account.login_uid+";"+account.login_token)
            .field('password_old',account.password)
            .field('password_new1',newpassword)
            .field('password_new2',newpassword)
            .end(function(err,res){
                if(err){
                    console.log(err);
                }else{
                    console.log(account.username,"修改密码成功");
                    callback("ok");
                }
            }); 
}


module.exports.login = login;
module.exports.modifyAvatar = modifyAvatar;
module.exports.changePassword = changePassword;