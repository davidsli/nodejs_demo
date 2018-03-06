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

console.log(getTime("Y-m-d H:i:s"))