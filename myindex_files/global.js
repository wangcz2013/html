//seo统计从搜索引擎直接访问简历、投递统计
(function(){
    var referrer = document.referrer;
    var locationUrl = window.location.href;
    var numDomainMap = {
        121114583 : 'www.baidu.com',
        121122244 : 'www.haosou.com|www.so.com',
        121114589 : 'cn.bing.com|www.bing.com',
        121114584 : 'www.google.com',
        121114587 : 'www.sogou.com',
        121114588 : 'www.soso.com',
        121114585 : 'www.yahoo.com|search.yahoo.com',
        121114586 : 'www.yodao.com|www.youdao.com',
        121126445 : 'none'
    };
    if(!(/site=/g.test(locationUrl))){
        var cooVal = get_mcookie('urlfrom'), numVal = numDomainMap[cooVal] || '', valReg = new RegExp(numVal.replace(/\./g, '\\.'), 'g');    
        if(referrer){
            if(!numVal || (numVal != '' && !valReg.test(referrer))){
                for(var key in numDomainMap){
                    var valAry = numDomainMap[key].split('|');
                    for(var i = 0; i < valAry.length; i++){
                        var doName = valAry[i];
                        var valReg2 = new RegExp(doName.replace(/\./g, '\\.'), 'g');                
                        if(valReg2.test(referrer)){
                            SEOFlow(key, doName);
                        }
                    }
                } 
            }
        }else{
            SEOFlow('121126445', 'none');
        }  
    }
})();

function get_mcookie(Name) {
    var search = Name + '=';
    var returnvalue = '';
    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = document.cookie.indexOf(';', offset);
            if (end == -1)
                end = document.cookie.length;
            returnvalue = unescape(document.cookie.substring(offset, end));
        }
    }
    if (returnvalue.length < 2)
        returnvalue = '12001997';
    return returnvalue;
}
function SEOFlow(bid, cid) {
    (new Image()).src = '//cnt.zhaopin.com/Market/whole_counter.jsp?sid=' + bid + '&site=' + cid;    
}
function operateForCookie(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = (cookies[i] + "").replace(/^\s+/, "").replace(/\s+$/, "");
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
}
//登陆的用户打开页面时如果没有刷新过简历则发送简历刷新的请求
(function(){
    function sendRefreshResume(){
        if(operateForCookie('loginreleased') * 1 < 1 && (operateForCookie("JSsUserInfo") || operateForCookie("JSpUserInfo"))){
            if($ && $.ajax){
                $.ajax({
                    type: "get",
                    url: "//i.zhaopin.com/Login/LoginApi/LoginReleased",
                    dataType: "jsonp",
                    success: function (html) {
                        if(html == true){
                            operateForCookie('loginreleased', 1, { domain: '.zhaopin.com', path: '/' });
                            return true;
                        }
                    }
                });
            }
        }
    }
    if(document.all){
        window.attachEvent('onload',sendRefreshResume);
    }else{
        window.addEventListener('load', sendRefreshResume,false);
    }
})();