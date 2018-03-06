function contentCenter(){
	this.dataStore = new Map();
	this.init = init;
	this.isEmpty = isEmpty;
	this.get = get;
}

function init(data){
	this.dataStore = data;
}

function get(key){
	return this.dataStore.get(key).dequeue();
}

function isEmpty(){
	let empty = true;
	this.dataStore.forEach(function (item, key, mapObj) {
		if(!item.empty()){
			empty = false;
			return;
		}
	});
	return empty;
}

module.exports = function(){
    return new contentCenter();
}();