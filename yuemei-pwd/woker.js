const request = require('superagent');
//新密码
const newpassword = "sb123456"; 

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

let uploadheader = {
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    Origin: 'http://www.yuemei.com',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.104 Safari/537.36',
    'Cache-Control': 'no-cache',
     Connection: 'keep-alive',
     Host: 'www.yuemei.com',
     Pragma: 'no-cache',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Upgrade-Insecure-Requests': 1
};

let pwdheader = {
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
        upload: origin + '/domain/user/uploadphoto/type/3',
        modifyAvatar: origin + '/domain/ucenter/set/',
		changePassword: origin + '/domain/ucenter/set/'
    };

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
                        console.log(account.username,"登录成功");            
                        callback(cookie);
                    }catch(error){
                        console.log(account.username,"登陆失败");
                        console.log(error);
                    }
            });
}

function modifyAvatar(account){
    let imgpath = __dirname +"/pic/"+ account.avatar;
    request
            .post(urls.upload)
            .set(uploadheader)
            .set('Cookie', account.session)
            .attach("upfile",imgpath,account.avatar)
            .end(function(err,res){
                if(err){
                    console.log(err);
                }
                var data = JSON.parse(res.text);
                console.log(data.message,data.img)
                if(data.img){
                    uploadpic(account,data.img);
                }
            });   
}

function uploadpic(account,name){
    request
            .post(urls.modifyAvatar)
            .set(pwdheader)
            .set('Cookie', account.session)
            .field('x','')
            .field('y','')
            .field('width','')
            .field('name',name)
            .field('action','photo')
            .end(function(err,res){
                if(err){
                    console.log(err);
                }
                console.log(account.username,"修改头像成功");
            }); 
}

function changePassword(account){
     request
            .post(urls.changePassword)
            .set(pwdheader)
            .set('Cookie', account.session)
            .field('password',account.password)
            .field('repassword1',newpassword)
            .field('repassword2',newpassword)
            .field('action','password')
            .end(function(err,res){
                if(err){
                    console.log(err);
                }
                console.log(account.username,"修改密码成功");
            }); 
}


module.exports.login = login;
module.exports.modifyAvatar = modifyAvatar;
module.exports.changePassword = changePassword;