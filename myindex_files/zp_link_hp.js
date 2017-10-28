(function(){
    try {
        function addLinkPara(link, cookie) {
            if (cookie && link.indexOf('cku=') == -1) {
                link.indexOf('?') == -1 ? (link = link.concat('?' + cookie)) : (link = link.concat('&' + cookie));
            }
            return link;
        }
        function getCookie(cName) {
            var name = cName + "=", ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1);
                if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
            }
            return "";
        }
        var _domain_ = document.domain,
            _cookie_at = getCookie('at'),
            _cookie_rt = getCookie('rt'),
            _cookie_param_ = (_cookie_at ? 'at=' + _cookie_at + '&' + (_cookie_rt ? 'rt=' + _cookie_rt : '') : _cookie_rt ? '?rt=' + _cookie_rt : ''),
            _hp_url = '',
            $hpLink = null,
            $logoutBtn = null,
            logoutBtn = null;
        switch (_domain_){
            case 'www.zhaopin.com':
                //简历中心
                if (location.href.indexOf('www.zhaopin.com/jobseeker/index_industry.html') != -1) {
                    var me = document.getElementById('me');
                    $hpLink = me.getElementsByTagName('a')[7];
                    $hpLink.href=addLinkPara($hpLink.href,_cookie_param_);
                }
                //智联招聘首页
                else{
                    if(typeof $ === 'function'){
                        $hpLink=$('.nav-bar>ul>li:eq(5) a');
                        _hp_url  = $hpLink.attr('href');
                        $hpLink.attr('href',addLinkPara(_hp_url,_cookie_param_));
                        $logoutBtn=$('#logout');
                        if($logoutBtn.length>0){
                            logoutBtn = $logoutBtn.get(0);
                            logoutBtn.onclick= function(){ $hpLink.attr('href',_hp_url) };
                        }
                    }
                }
                break;
            //简历中心
            case 'i.zhaopin.com':
                if(typeof $ === 'function'){
                    $hpLink=$('.nav_con>ul>li:eq(4) a');
                    $hpLink.attr('href',addLinkPara($hpLink.attr('href'),_cookie_param_));
                }
                break;
            //职位搜索
            case 'sou.zhaopin.com':
            //求职指导
            case 'article.zhaopin.com':
                if(typeof $ === 'function'){
                    $hpLink=$('.all_navlist>li:eq(4)>a');
                    $hpLink.attr('href',addLinkPara($hpLink.attr('href'),_cookie_param_));
                    $logoutBtn=$('#personcheckout');
                    //退出
                    if($logoutBtn.length>0){
                        logoutBtn = $logoutBtn.get(0);
                        logoutBtn.onclick= function(){
                            _hp_url  = $hpLink.attr('href');
                            if (_hp_url.indexOf('at=') != -1) {
                                $hpLink.attr('href', _hp_url.substring(0, _hp_url.indexOf('at=') - 1));
                            } else if (_hp_url.indexOf('rt=') != -1) {
                                $hpLink.attr('href', _hp_url.substring(0, _hp_url.indexOf('rt=') - 1));
                            }
                        };
                    }
                }
                break;
            default :break;
        }
    }catch(ex){}
})();