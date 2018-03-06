function UserCenter(){
	this.dataStore = [];
	this.set = set;
	this.get = get;
	this.toString = toString;
	this.size = size;
}

function User(id,name,pwd,session){
	this.id = id;
	this.name = name;
	this.pwd = pwd;
	this.session = session;
}

function set(id,name,pwd,session){
	this.dataStore.push(new User(id,name,pwd,session));
}

function get(index){
	return this.dataStore[index];
}

function size(){
	return this.dataStore.length;
}

function toString(){
    var retStr = "";
    for (var i=0; i<this.dataStore.length; ++i) {
        retStr += this.dataStore[i] + ";"
    }
    return retStr;
}

module.exports = function(){
    return new UserCenter();
}();