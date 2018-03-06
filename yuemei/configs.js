//=====全局配置=======
var config = {
	//文章url
	aurl: 'http://www.yuemei.com/c/1690977.html',
	//用户数据
	account: 'account.txt',
	//评论数据
	content: 'content.txt',
	//回复/点赞 操作间隔 min秒到max秒内
	op_min: 2,
	op_max: 10,
	//启用功能
	//1.仅回复 2.仅点赞 3.回复并点赞
	todo: 3
}

module.exports = config;