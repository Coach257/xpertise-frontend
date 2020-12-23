function titleCase(str){
    var a = str.toLowerCase().split(' ');
    var b = a.map(function(val){return val.replace(val.charAt(0),val.charAt(0).toUpperCase())})
    return b.join(' ');
}
export default {
    titleCase,
}