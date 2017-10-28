/*
* 需求及解决方案：SEO 统一URL需求，由于a标签href属性值的URL地址和参数连在一起，导致搜索对职位的搜索结果重复，
* 所以需要在生成模板时把a标签href属性值中的URL地址和参数分开，把参数保存在a标签的自定义属性par中，
* 该js的作用就是在点击a标签时如果该标签中有par则先把par的值拼接到href的URL后作为连接地址的参数，再跳转到连接指向的页面；
* 日期：2015-8-18
* */
(function(){
    if(document.addEventListener){
        window.addEventListener('load', function(){ bodyClickEvent('addEventListener', '');}, false);
    }else{
        window.attachEvent('onload', function(){ bodyClickEvent('attachEvent', 'on');});
    }
    function bodyClickEvent(addEvent, on){
        var body = document.getElementsByTagName('body')[0];
        //除ie外的其他浏览器
        !on && body && body[addEvent]('click', function(event){ joinParam(event);}, false);
        //ie浏览器
        on && body && body[addEvent]( on + 'click', function(){ joinParam(window.event);});
    }
    function joinParam(e){
        var ele = e.target || e.srcElement;
        while(ele != document && ele != document.body && !ele.getAttribute('par') && ele.parentNode){
            //点击了子元素时去找它的父元素
            ele = ele.parentNode;
        }
        var p = ele.getAttribute('par'), href = ele.getAttribute('href') || '';
        if(p && href && href.indexOf('?') == -1){
            if(href && href.indexOf('#') != 0 && href.indexOf('javascript:') == -1){
                var params = p.split('&'), pars_str = '';
                for(var i = 0, l = params.length; i < l; i++){
                    //对par中的参数进行转码
                    var key_val_arr = params[i].split('='), k_v_s = key_val_arr[0] + '=' + encodeURIComponent(key_val_arr[1] ? key_val_arr[1] : '');
                    pars_str += (i ==  0 ? '?' : '&') + k_v_s;
                }
                href += pars_str;
                ele.setAttribute('href', href);
            }
        }
    }
})();