(function () {
    function log(info) {
        try {
            console.log(info)
        } catch (e) {
            alert(info)
        }
    }

    var isIE = navigator.appName.indexOf("Microsoft") > -1;
    var isIE6 = navigator.appVersion.indexOf("MSIE 6") > -1;
    var isIE7 = navigator.appVersion.indexOf("MSIE 7") > -1;
    var piximg = "//my.zhaopin.com/images/blank.gif";

    function xhr() {
        var a = null;
        try {
            a = new XMLHttpRequest
        } catch (b) {
            for (var c = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], d = 0, e; e = c[d++];) {
                try {
                    a = new ActiveXObject(e);
                    break
                } catch (f) {
                }
            }
        }
        return a
    }

    function $(id) {
        return document.getElementById(id) || null
    }

    function getUid() {
        return Math.floor(Math.random() * 2147483648).toString(36)
    }

    function hasClass(ele, classname) {
        var r = new RegExp("(^|\\s+)" + classname + "(\\s+|$)", "g");
        return r.test(ele.className)
    }

    function addClass(ele, classname) {
        if (!hasClass(ele, classname)) {
            ele.className += (ele.className == "" ? classname : " " + classname)
        }
    }

    function removeClass(ele, classname) {
        var r = new RegExp("(^|\\s+)" + classname + "(\\s+|$)", "g");
        if (hasClass(ele, classname)) {
            ele.className = ele.className.replace(r, " ").trim()
        }
    }

    function getCookie(name) {
        var dc = document.cookie;
        var prefix = name + "=";
        var begin = dc.indexOf("; " + prefix);
        if (begin == -1) {
            begin = dc.indexOf(prefix);
            if (begin != 0) {
                return null
            }
        } else {
            begin += 2
        }
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
            end = dc.length
        }
        return dc.substring(begin + prefix.length, end).replace(/\+/g, " ").urlDecode()
    }

    function getElementsByClass(name, type, parent) {
        var r = [];
        var re = new RegExp("(^|\\s)" + name + "(\\s|$)");
        var e = (parent && parent.nodeType == 1 ? parent : document).getElementsByTagName(type || "*");
        for (var j = 0; j < e.length; j++) {
            if (re.test(e[j].className)) {
                r.push(e[j])
            }
        }
        return r
    }

    function getParentByTagName(node, pTag) {
        var parent = node;
        while (parent.parentNode) {
            parent = parent.parentNode;
            if (parent.tagName && parent.tagName.toLowerCase() == pTag.toLowerCase()) {
                return parent
            }
        }
        if (parent.tagName && parent.tagName.toLowerCase() == pTag.toLowerCase()) {
            return parent
        } else {
            return null
        }
    }

    function getStyle(ele, name) {
        if (ele.style[name]) {
            return ele.style[name]
        } else {
            if (ele.currentStyle) {
                return ele.currentStyle[name]
            } else {
                if (document.defaultView && document.defaultView.getComputedStyle) {
                    name = name.replace(/([A-Z])/g, "-$1");
                    name = name.toLowerCase();
                    var s = document.defaultView.getComputedStyle(ele, "");
                    return s && s.getPropertyValue(name)
                } else {
                    return null
                }
            }
        }
    }

    function setStyle(ele) {
        for (var i = 1; i < arguments.length; i += 2) {
            var sName = arguments[i];
            var sValue = arguments[i + 1];
            if (sName == "opacity") {
                setOpacity(ele, sValue)
            } else {
                if (sName == "scrollTop") {
                    setWinScrollTop(ele, sValue)
                } else {
                    if (ele.style && sName in ele.style) {
                        ele.style[sName] = sValue
                    } else {
                        if (sName in ele) {
                            ele[sName] = sValue
                        }
                    }
                }
            }
        }
        return ele
    }

    function setOpacity(ele, sValue) {
        ele.style.opacity = sValue;
        if (isIE) {
            ele.style.filter = (ele.style.filter || "").replace(/alpha\([^)]*\)/, "") + "alpha(opacity=" + (sValue * 100) + ")"
        }
        return ele
    }

    function setWinScrollTop(ele, sValue) {
        window.scrollTo(null, sValue)
    }

    function addEvent(a, b, c) {
        if (a.addEventListener) {
            a.addEventListener(b, c, false)
        } else {
            if (a.attachEvent) {
                a.attachEvent("on" + b, c)
            }
        }
    }

    function typeOf(value) {
        var s = typeof value;
        if (s == "object") {
            if (value) {
                if (value instanceof Array || !(value instanceof Object) && Object.prototype.toString.call(value) == "[object Array]" || typeof value.length == "number" && typeof value.splice != "undefined" && typeof value.propertyIsEnumerable != "undefined" && !value.propertyIsEnumerable("splice")) {
                    return "array"
                }
                if (!(value instanceof Object) && (Object.prototype.toString.call(value) == "[object Function]" || typeof value.call != "undefined" && typeof value.propertyIsEnumerable != "undefined" && !value.propertyIsEnumerable("call"))) {
                    return "function"
                }
            } else {
                return "null"
            }
        } else {
            if (s == "function" && typeof value.call == "undefined") {
                return "object"
            }
        }
        return s
    }

    function isDef(val) {
        return val !== undefined
    }

    function isNull(val) {
        return val === null
    }

    function isDefAndNotNull(val) {
        return val != null
    }

    function isArray(val) {
        return typeOf(val) == "array"
    }

    function isArrayLike(val) {
        var type = typeOf(val);
        return type == "array" || type == "object" && typeof val.length == "number"
    }

    function isString(val) {
        return typeof val == "string"
    }

    function isBoolean(val) {
        return typeof val == "boolean"
    }

    function isNumber(val) {
        return typeof val == "number"
    }

    function isFunction(val) {
        return typeOf(val) == "function"
    }

    function isObject(val) {
        var type = typeOf(val);
        return type == "object" || type == "array" || type == "function"
    }

    function getCursorIndex(input) {
        if (!isIE) {
            function vb(a) {
                try {
                    return isNumber(a.selectionStart)
                } catch (err) {
                    return false
                }
            }

            var b = 0, c = 0;
            if (vb(input)) {
                b = input.selectionStart;
                c = input.selectionEnd
            }
            return b && c && b == c ? b : 0
        } else {
            var b = 0, c = 0;
            input = input.createTextRange();
            var d = document.selection.createRange();
            if (input.inRange(d)) {
                input.setEndPoint("EndToStart", d);
                b = input.text.length;
                input.setEndPoint("EndToEnd", d);
                c = input.text.length
            }
            return b && c && b == c ? b : 0
        }
    }

    function getCursorXY(e) {
        var e = e || window.event;
        var s = getScrollPosition();
        var x = e.pageX || e.clientX + s.x;
        var y = e.pageY || e.clientY + s.y;
        return {x: x, y: y}
    }

    function getXY(ele) {
        for (var x = 0, y = 0; ele;) {
            x += ele.offsetLeft;
            y += ele.offsetTop;
            ele = ele.offsetParent
        }
        return {x: x, y: y}
    }

    function getScrollPosition() {
        function scrollbarX() {
            if (typeof window.pageXOffset == "number") {
                return window.pageXOffset
            } else {
                if (document.documentElement && document.documentElement.scrollLeft) {
                    return document.documentElement.scrollLeft
                } else {
                    if (document.body && document.body.scrollLeft) {
                        return document.body.scrollLeft
                    }
                }
            }
            return 0
        }

        function scrollbarY() {
            if (typeof window.pageYOffset == "number") {
                return window.pageYOffset
            } else {
                if (document.documentElement && document.documentElement.scrollTop) {
                    return document.documentElement.scrollTop
                } else {
                    if (document.body && document.body.scrollTop) {
                        return document.body.scrollTop
                    }
                }
            }
            return 0
        }

        return {x: scrollbarX(), y: scrollbarY()}
    }

    function getViewportSize() {
        function viewportWidth() {
            if (typeof window.innerWidth == "number") {
                return window.innerWidth
            } else {
                if (document.documentElement && document.documentElement.clientWidth) {
                    return document.documentElement.clientWidth
                } else {
                    if (document.body && document.body.clientWidth) {
                        return document.body.clientWidth
                    }
                }
            }
            return 0
        }

        function viewportHeight() {
            if (typeof window.innerHeight == "number") {
                return window.innerHeight
            } else {
                if (document.documentElement && document.documentElement.clientHeight) {
                    return document.documentElement.clientHeight
                } else {
                    if (document.body && document.body.clientHeight) {
                        return document.body.clientHeight
                    }
                }
            }
            return 0
        }

        return {w: viewportWidth(), h: viewportHeight()}
    }

    function getPageSize() {
        return {w: document.body.scrollWidth, h: document.body.scrollHeight}
    }

    function fixMozScrollBarWidth() {
        var f = 0;
        if (!isIE) {
            var viewportS = getViewportSize();
            var pageS = getPageSize();
            if (viewportS.h < pageS.h) {
                f = 21
            }
        }
        return f
    }

    String.prototype.trim = function () {
        return this.replace(/^[\s\xa0\u3000]+|[\s\xa0\u3000]+$/g, "")
    };
    String.prototype.trimLeft = function () {
        return this.replace(/^[\s\xa0\u3000]+/, "")
    };
    String.prototype.trimRight = function () {
        return this.replace(/[\s\xa0\u3000]+$/, "")
    };
    String.prototype.urlEncode = function () {
        return window.encodeURIComponent ? encodeURIComponent(this) : escape(this)
    };
    String.prototype.urlDecode = function () {
        return window.decodeURIComponent ? decodeURIComponent(this) : unescape(this)
    };
    String.prototype.realLength = function () {
        return this.replace(/[^\x00-\xff]/g, "aa").length
    };
    function inherits(childCtor, parentCtor) {
        function tempCtor() {
        }

        tempCtor.prototype = parentCtor.prototype;
        childCtor.aa = parentCtor.prototype;
        childCtor.prototype = new tempCtor;
        childCtor.prototype.constructor = childCtor
    }

    function base(me, opt_methodName) {
        var caller = arguments.callee.caller;
        if (caller.aa) {
            return caller.aa.constructor.apply(me, Array.prototype.slice.call(arguments, 1))
        }
        for (var args = Array.prototype.slice.call(arguments, 2), foundCaller = false, ctor = me.constructor; ctor; ctor = ctor.aa && ctor.aa.constructor) {
            if (ctor.prototype[opt_methodName] === caller) {
                foundCaller = true
            } else {
                if (foundCaller) {
                    return ctor.prototype[opt_methodName].apply(me, args)
                }
            }
        }
        if (me[opt_methodName] === caller) {
            return me.constructor.prototype[opt_methodName].apply(me, args)
        } else {
            throw Error("base called from a method of one name to a method of a different name")
        }
    }

    function loadJs(a, b, c) {
        var d = arguments.callee;
        var e = d.queue || (d.queue = {});
        b = b || (((window.document.charset ? window.document.charset : window.document.characterSet) || "").match(/^(gb2312|big5|utf-8)$/gi) || "utf-8").toString().toLowerCase();
        if (a in e) {
            if (c) {
                if (e[a]) {
                    e[a].push(c)
                } else {
                    c()
                }
            }
            return
        }
        e[a] = c ? [c] : [];
        var f = window.document.createElement("script");
        f.type = "text/javascript";
        f.charset = b;
        f.onload = f.onreadystatechange = function () {
            if (f.readyState && f.readyState != "loaded" && f.readyState != "complete") {
                return
            }
            f.onreadystatechange = f.onload = null;
            while (e[a].length) {
                e[a].shift()()
            }
            e[a] = null
        };
        f.src = a;
        window.document.getElementsByTagName("head")[0].appendChild(f)
    }

    function regEveDomReady() {
        if (arguments.length) {
            if (arguments.length > 1) {
                for (var i = 0; i < arguments.length; i++) {
                    regOneEveDomReady(arguments[i])
                }
            } else {
                regOneEveDomReady(arguments[0])
            }
        }
    }

    function regOneEveDomReady(fn) {
        var callFn = arguments.callee;
        if (!callFn.domReadyUtil) {
            var userAgent = navigator.userAgent.toLowerCase();
            callFn.domReadyUtil = {
                browser: {
                    version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
                    safari: /webkit/.test(userAgent),
                    opera: /opera/.test(userAgent),
                    msie: /msie/.test(userAgent) && !/opera/.test(userAgent),
                    mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent)
                }, readyList: [], each: function (object, callback, args) {
                    var name, i = 0, length = object.length;
                    if (args) {
                        if (length == undefined) {
                            for (name in object) {
                                if (callback.apply(object[name], args) === false) {
                                    break
                                }
                            }
                        } else {
                            for (; i < length;) {
                                if (callback.apply(object[i++], args) === false) {
                                    break
                                }
                            }
                        }
                    } else {
                        if (length == undefined) {
                            for (name in object) {
                                if (callback.call(object[name], name, object[name]) === false) {
                                    break
                                }
                            }
                        } else {
                            for (var value = object[0]; i < length && callback.call(value, i, value) !== false; value = object[++i]) {
                            }
                        }
                    }
                    return object
                }, ready: function () {
                    var dom = callFn.domReadyUtil;
                    if (!dom.isReady) {
                        dom.isReady = true;
                        if (dom.readyList) {
                            dom.each(dom.readyList, function () {
                                this.call(document)
                            });
                            dom.readyList = null
                        }
                    }
                }
            }
        }
        var domReadyUtil = callFn.domReadyUtil;
        (function () {
            if (callFn.readyBound) {
                return
            }
            callFn.readyBound = true;
            if (document.addEventListener && !domReadyUtil.browser.opera) {
                document.addEventListener("DOMContentLoaded", domReadyUtil.ready, false)
            }
            if (domReadyUtil.browser.msie && window == top) {
                (function () {
                    if (domReadyUtil.isReady) {
                        return
                    }
                    try {
                        document.documentElement.doScroll("left")
                    } catch (error) {
                        setTimeout(arguments.callee, 0);
                        return
                    }
                    domReadyUtil.ready()
                })()
            }
            if (domReadyUtil.browser.opera) {
                document.addEventListener("DOMContentLoaded", function () {
                    if (domReadyUtil.isReady) {
                        return
                    }
                    for (var i = 0; i < document.styleSheets.length; i++) {
                        if (document.styleSheets[i].disabled) {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                    }
                    domReadyUtil.ready()
                }, false)
            }
            addEvent(window, "load", domReadyUtil.ready)
        })();
        if (domReadyUtil.isReady) {
            fn.call(document, domReadyUtil)
        } else {
            domReadyUtil.readyList.push(function () {
                return fn.call(this, domReadyUtil)
            })
        }
        return this
    }

    zlzp.charW = 6.25;
    zlzp.checkAll = function (trigger, itemname) {
        var allArr = document.getElementsByName(trigger.name);
        var itemArr = document.getElementsByName(itemname);
        for (var i = 0; i < allArr.length; i++) {
            allArr[i].checked = trigger.checked
        }
        for (i = 0; i < itemArr.length; i++) {
            itemArr[i].checked = trigger.checked
        }
    };
    zlzp.uncheckAll = function (allname) {
        var allArr = document.getElementsByName(allname);
        for (var i = 0; i < allArr.length; i++) {
            allArr[i].checked = allArr[i].checked & 0
        }
    };
    zlzp.setDefTxt = function (obj, txt) {
        if (obj.value == "" || obj.value == txt) {
            obj.value = txt;
            removeClass(obj, "inputAction");
            addClass(obj, "inputTips")
        } else {
            removeClass(obj, "inputTips");
            addClass(obj, "inputAction")
        }
    };
    zlzp.clearDefTxt = function (obj, txt) {
        if (obj.value == txt) {
            obj.value = "";
            removeClass(obj, "inputTips");
            addClass(obj, "inputAction")
        }
    };
    zlzp.searchjob = zlzp.searchjob || {};
    zlzp.searchjob.directory = "http://sou.zhaopin.com/jobs/";
    zlzp.searchjob.file_t = "searchresult.ashx";
    zlzp.searchjob.file_a = "searchresult.ashx?isadv=1&";
    zlzp.searchjob.file_k = "jobsearch_keywords.aspx";
    zlzp.searchjob.file_g = "jobsearch_map.aspx";
    zlzp.searchjob.queryStrSepa = ";";
    zlzp.searchjob.f_s = document.frmSearch;
    zlzp.searchjob.f_m = document.frmMain;
    zlzp.searchjob.t = {h_n: "SchJobType", q_n: "bj"};
    zlzp.searchjob.st = {h_n: "subJobtype", q_n: "sj"};
    zlzp.searchjob.i = {h_n: "industry", q_n: "in"};
    zlzp.searchjob.d = {h_n: "PublishDate", q_n: "pd"};
    zlzp.searchjob.l = {h_n: "JobLocation", q_n: "jl"};
    zlzp.searchjob.k = {h_n: "KeyWord", q_n: "kw"};
    zlzp.searchjob.s = {h_n: "sortby", q_n: "sb", null_v: "0"};
    zlzp.searchjob.m = {h_n: "SearchModel", q_n: "sm"};
    zlzp.searchjob.p = {h_n: "page", q_n: "p"};
    zlzp.searchjob.s_f = {h_n: "SchSalaryFromAdv", q_n: "sf"};
    zlzp.searchjob.s_t = {h_n: "SchSalaryToAdv", q_n: "st"};
    zlzp.searchjob.kt = {h_n: "keywordtype", q_n: "kt", null_v: "1"};
    zlzp.searchjob.w = {h_n: "WorkingExp", q_n: "we"};
    zlzp.searchjob.e = {h_n: "EduLevel", q_n: "el"};
    zlzp.searchjob.ct = {h_n: "CompanyType", q_n: "ct"};
    zlzp.searchjob.cs = {h_n: "CompanySize", q_n: "cs"};
    zlzp.searchjob.et = {h_n: "EmplType", q_n: "et", null_v: "checkall"};
    zlzp.searchjob.ga = {h_n: "geo_addr", q_n: "ga"};
    zlzp.searchjob.gc = {h_n: "geo_cat", q_n: "gc"};
    zlzp.searchjob.gr = {h_n: "geo_r", q_n: "gr"};
    zlzp.searchjob.re = {h_n: "re", q_n: "re"};
    zlzp.searchjob.all_ele = ["t", "st", "i", "d", "l", "k", "s", "m", "p", "s_f", "s_t", "kt", "w", "e", "ct", "cs", "et", "ga", "gc", "gr", "re"];
    zlzp.searchjob.v = {h_n: "vacancyid", q_n: "vacancyid"};
    zlzp.searchjob.k_tips = "输入公司名称或职位名称";
    zlzp.searchjob.c_tips = "输入/选择城市";
    zlzp.searchjob.ga_tips = "输入地图位置";
    zlzp.searchjob.moreCondTrigID = "showmoreText";
    zlzp.searchjob.moreCondConID = "linesed";
    zlzp.searchjob.checkKeyword = function (keyword, required) {
        var keyword = keyword.trim();
        if (required) {
            if (keyword == "") {
                alert("关键词输入不能为空, 请重新输入！");
                return false
            }
        }
        if (keyword != "") {
            var regSpecialChar = new RegExp("`|~|!|@|#|\\$|%|\\^|&|\\*|\\(|\\)|-|_|=|\\+|\\[|\\{|\\]|\\}|;|:|'|\"|\\\\|\\||,|<|\\.|>|/|\\?|。|，|《|》|、|？|；|‘|’|：|“|”|【|】|『|』|—|）|（|×|…|￥|！|～|·", "gi");
            keyword = keyword.replace(regSpecialChar, "");
            keyword = keyword.trim();
            if (keyword == "") {
                alert("关键词输入不能全部为特殊字符，请重新输入！");
                return false
            }
        }
        return true
    };
    zlzp.searchjob.submitSearch = function (f, file, q, where) {
        var fObj = f || zlzp.searchjob.f_s;
        zlzp.searchjob.clearTips(fObj);
        var queryStr = typeof q != "undefined" && q !== null ? q : zlzp.searchjob.genSearchQueryStr(fObj);
        var url = ((file && typeof (file) == "string") ? zlzp.searchjob.directory + file : window.location.pathname) + (queryStr != "" ? "?" + queryStr : "");
        if (window.AdsClick && isFunction(AdsClick)) {
            AdsClick(121115223, "jobsearch_shanghai")
        }
        if (typeof where != "undefined" && where == "new") {
            window.open(url)
        } else {
            window.location = url
        }
        return false
    };
    zlzp.searchjob.getFormEleValue = function (o, f) {
        var fObj = f || zlzp.searchjob.f_s;
        var h = fObj[o.h_n];
        var v = "";
        if (h) {
            if (/checkbox|radio/i.test(h.type || (h[0] && h[0].type))) {
                var checkedN = 0;
                if (h.length) {
                    for (var i = 0; i < h.length; i++) {
                        if (h[i].checked) {
                            v += (v == "" ? "" : zlzp.searchjob.queryStrSepa) + h[i].value;
                            checkedN++
                        }
                    }
                    if (typeof (o.null_v) != "undefined" && o.null_v == "checkall" && checkedN == h.length) {
                        v = ""
                    }
                } else {
                    if (h.checked) {
                        v = h.value;
                        if (typeof (o.null_v) != "undefined" && o.null_v == "checkall") {
                            v = ""
                        }
                    }
                }
            } else {
                v = h.value;
                v = typeof (o.null_v) != "undefined" && v == o.null_v ? "" : v
            }
        }
        return v != "" ? "&" + o.q_n + "=" + v.urlEncode() : ""
    };
    zlzp.searchjob.genSearchQueryStr = function (f) {
        var fObj = f || zlzp.searchjob.f_s;
        var getEleVal = zlzp.searchjob.getFormEleValue;

        function genPair(n) {
            var i, h;
            return (i = zlzp.searchjob[n]) && (h = fObj[i.h_n]) ? getEleVal(i, fObj) : ""
        }

        var queryStr = "";
        for (var i = 0; i < zlzp.searchjob.all_ele.length; i++) {
            queryStr += genPair(zlzp.searchjob.all_ele[i])
        }
        return queryStr.charAt(0) == "&" ? queryStr.substring(1) : queryStr
    };
    zlzp.searchjob.updateQueryVal = function (str, qn, qv) {
        if (str != "") {
            str = "&" + str;
            var flag = "&" + qn + "=";
            var indexF = str.indexOf(flag);
            if (indexF > -1) {
                var temp = str.split(flag);
                var postfix = temp[1].indexOf("&") > -1 ? temp[1].substring(temp[1].indexOf("&")) : "";
                str = temp[0] + (qv != "" ? flag + qv : "") + postfix
            } else {
                str += qv != "" ? "&" + qn + "=" + qv : ""
            }
            str = str.substring(1)
        } else {
            if (qv != "") {
                str = qn + "=" + qv
            }
        }
        return str
    };
    zlzp.searchjob.setTips = function (f) {
        var fObj = f || zlzp.searchjob.f_s;
        var k, c, ga;
        (k = fObj[zlzp.searchjob.k.h_n]) && k.onfocus && zlzp.setDefTxt(k, zlzp.searchjob.k_tips);
        (c = fObj[zlzp.searchjob.l.h_n]) && c.onfocus && zlzp.setDefTxt(c, zlzp.searchjob.c_tips);
        (ga = fObj[zlzp.searchjob.ga.h_n]) && ga.onfocus && zlzp.setDefTxt(ga, zlzp.searchjob.ga_tips)
    };
    zlzp.searchjob.clearTips = function (f) {
        var fObj = f || zlzp.searchjob.f_s;
        var k, c, ga;
        (k = fObj[zlzp.searchjob.k.h_n]) && k.onfocus && zlzp.clearDefTxt(k, zlzp.searchjob.k_tips);
        (c = fObj[zlzp.searchjob.l.h_n]) && c.onfocus && zlzp.clearDefTxt(c, zlzp.searchjob.c_tips);
        (ga = fObj[zlzp.searchjob.ga.h_n]) && ga.onfocus && zlzp.clearDefTxt(ga, zlzp.searchjob.ga_tips)
    };
    zlzp.searchjob.clearGeo = function (f) {
        var fObj = f || zlzp.searchjob.f_s;
        var ga, gc, gr;
        (ga = fObj[zlzp.searchjob.ga.h_n]) && (ga.value = "");
        (gc = fObj[zlzp.searchjob.gc.h_n]) && (gc.value = "");
        (gr = fObj[zlzp.searchjob.gr.h_n]) && (gr.value = "")
    };
    zlzp.searchjob.gotoSearch_t = function (f, where) {
        var fObj = f || zlzp.searchjob.f_s;
        zlzp.searchjob.clearTips(fObj);
        var keywords = fObj[zlzp.searchjob.k.h_n].value.trim();
        if (!zlzp.searchjob.checkKeyword(keywords)) {
            zlzp.searchjob.setTips(fObj);
            return false
        }
        zlzp.searchjob.clearGeo(fObj);
        fObj[zlzp.searchjob.p.h_n].value = "1";
        return zlzp.searchjob.submitSearch(fObj, zlzp.searchjob.file_t, null, where)
    };
    if (typeof (window.sjModIns) == "undefined" || !window.sjModIns) {
        window.sjModIns = []
    }
    function initSJModule() {
        var e = /<[^>]+\ssjmodule=[\'\"]?([\w|]+)[^>]+/g;
        var g = /id=[\'\"]?([\w\-]+)/i;
        var i, j, c;
        window.document.body.innerHTML.replace(e, function (a, b) {
            if ((i = a.match(g)) && (j = $(i[1]))) {
                if ((c = eval(b)) && isFunction(c)) {
                    var x, y, z;
                    if (b == "MetroHotCity" || b == "MetroLine") {
                        if (window.__hardPois) {
                            window.sjModIns[i[1]] = new c(j)
                        } else {
                            x = c;
                            y = i[1];
                            z = j;
                            loadJs("//sou.zhaopin.com/javascript/hardpois.js", "utf-8", function () {
                                window.sjModIns[y] = new x(z)
                            })
                        }
                    } else {
                        window.sjModIns[i[1]] = new c(j)
                    }
                }
            }
            return ""
        })
    }

    function AniSlide(h) {
        var s = this;
        s.html = h;
        s.trigger = getElementsByClass("zoomtitle", "div", s.html)[0];
        s.aniCon = getElementsByClass("selectlist", "div", s.html)[0];
        s.aniHeight = s.aniCon.getElementsByTagName("ul")[0].offsetHeight;
        s.C = function (e) {
            s.fnClick(e)
        };
        addEvent(s.trigger, "click", s.C)
    }

    AniSlide.prototype.fnClick = function () {
        var s = this;
        var h = getStyle(s.aniCon, "height");
        if (parseInt(h) == 0) {
            s.aniShow = s.aniShow || centralTimer.animation(600, [[s.aniCon, "height", 0, s.aniHeight, "easeOut", "px"]], function () {
                s.html.className = "zoomMinus"
            });
            s.aniShow.restart()
        } else {
            s.aniHide = s.aniHide || centralTimer.animation(600, [[s.aniCon, "height", s.aniHeight, 0, "easeOut", "px"]], function () {
                s.html.className = "zoomPlus"
            });
            s.aniHide.restart()
        }
    };
    function AniSlideshow(h) {
        var s = this;
        s.html = h;
        s.direction = s.html.getAttribute("slidedir") || "left";
        s.width = s.html.getAttribute("slidewidth");
        s.height = s.html.getAttribute("slideheight");
        s.interval = s.html.getAttribute("slideinterval") || 1000;
        s.speed = s.html.getAttribute("slidespeed") || 600;
        s.inner = s.html.getElementsByTagName("ul")[0];
        s.items = s.inner.getElementsByTagName("li");
        s.itemNum = s.items.length;
        s.initPosition();
        s.aniSlide = centralTimer.animation(s.speed, [[s.inner, s.dirClass, (s.direction == "up" || s.direction == "down" ? s.startPointY : s.startPointX), (s.direction == "up" || s.direction == "down" ? s.endPointY : s.endPointX), "linear", "px"]], function () {
            s.eachFrame()
        });
        s.intervalControl = centralTimer.delay(function () {
            s.aniSlide.restart()
        }, s.interval)
    }

    AniSlideshow.prototype.initPosition = function () {
        var s = this;
        setStyle(s.html, "position", "relative");
        if (s.direction == "up" || s.direction == "down") {
            s.dirClass = "top";
            setStyle(s.inner, "width", s.width + "px");
            setStyle(s.inner, "height", s.height * s.itemNum + "px")
        } else {
            s.dirClass = "left";
            setStyle(s.inner, "width", s.width * s.itemNum + "px");
            setStyle(s.inner, "height", s.height + "px");
            for (var i = 0; i < s.itemNum; i++) {
                setStyle(s.items[i], "width", s.width + "px");
                setStyle(s.items[i], "styleFloat", "left");
                setStyle(s.items[i], "cssFloat", "left")
            }
        }
        setStyle(s.html, "overflow", "hidden");
        setStyle(s.inner, "position", "absolute");
        s.startPointX = 0;
        s.startPointY = 0;
        if (s.direction == "down") {
            s.startPointY = -1 * s.height
        }
        if (s.direction == "right") {
            s.startPointX = -1 * s.width
        }
        s.endPointX = s.direction == "left" ? -1 * s.width : 0;
        s.endPointY = s.direction == "up" ? -1 * s.height : 0;
        if (s.direction == "down" || s.direction == "right") {
            s.inner.insertBefore(s.inner.lastChild, s.inner.firstChild)
        }
        setStyle(s.inner, "left", s.startPointX + "px");
        setStyle(s.inner, "top", s.startPointY + "px")
    };
    AniSlideshow.prototype.eachFrame = function () {
        var s = this;
        if (s.direction == "down" || s.direction == "right") {
            s.inner.insertBefore(s.inner.lastChild, s.inner.firstChild)
        } else {
            s.inner.appendChild(s.inner.firstChild)
        }
        setStyle(s.inner, "left", s.startPointX + "px");
        setStyle(s.inner, "top", s.startPointY + "px");
        if (s.intervalControl) {
            s.intervalControl.fire()
        } else {
            s.intervalControl = centralTimer.delay(function () {
                s.aniSlide.restart()
            }, s.interval)
        }
    };
    function AutoComplete(i) {
        var s = this;
        s.input = i;
        s.id = s.input.id;
        s.input.deactiIE = 0;
        s.form = s.input.form || null;
        s.asp = s.input.getAttribute("xhrasp") || "";
        s.suggHTML = s.input.getAttribute("xhrstyle") || "";
        s.clickItemSubmit = s.input.getAttribute("submitform") || "0";
        s.isKeyword = s.input.getAttribute("iskeyword") || "0";
        s.suggWidth = s.input.getAttribute("sugwidth") || s.input.offsetWidth;
        s.period = 0;
        s.xhrerr = 0;
        s.xhrcall = null;
        s.jsonpjs = null;
        s.closeDefer = null;
        s.rows = null;
        s.actRowIndex = -1;
        s.actRow = null;
        s.flagActOnRow = false;
        s.arrowKeyIte = 0;
        s.showFocusItem = 0;
        s.cursorIndex;
        s.q_input = s.q_keyboard = s.q_xhr = s.input.value;
        if (!s.input.init) {
            if (s.form) {
                addEvent(s.form, "submit", function () {
                    s.fnSubmitForm()
                })
            }
            s.input.setAttribute("autocomplete", "off");
            addEvent(s.input, "blur", function () {
                s.closeSuggest()
            });
            if (isIE) {
                addEvent(s.input, "beforedeactivate", function () {
                    var src = window.event.srcElement;
                    if (src.deactiIE) {
                        window.event.cancelBubble = true;
                        window.event.returnValue = false
                    }
                    src.deactiIE = 0
                })
            }
            if (isIE) {
                addEvent(s.input, "keydown", function (e) {
                    s.fnKeydown(e)
                })
            } else {
                s.input.onkeypress = function (e) {
                    s.fnKeydown(e)
                }
            }
            addEvent(s.input, "keyup", function (e) {
                s.fnKeyup(e)
            });
            s.h_keyboard = s.createHidden("oq", s.q_keyboard);
            s.h_rowindex = s.createHidden("aq", "f");
            s.suggestTab = document.createElement("table");
            s.suggestTab.cellPadding = s.suggestTab.cellSpacing = 0;
            s.suggestTab.className = "autocomptab";
            ($("zljsc") || s.form || s.input.parentNode).appendChild(s.suggestTab);
            s.input.init = true
        }
        s.closeSuggest();
        s.setSuggestTabStyle();
        if (!AutoComplete.flagCSS) {
            AutoComplete.addCssToBody();
            AutoComplete.flagCSS = true
        }
        s.cursorIndex = getCursorIndex(s.input);
        if (!isIE) {
            addEvent(window, "pageshow", function (e) {
                if (e.persisted) {
                    s.h_keyboard.value = s.input.value;
                    s.h_rowindex.value = "f"
                }
            })
        }
        if (!AutoComplete.start) {
            AutoComplete.PeriodicRefresh();
            AutoComplete.start = true
        }
    }

    AutoComplete.prototype = {
       /**/ submitXHR: function (a, b, c) {
            var s = this;
            s.xhrcall && s.xhrcall.readyState != 0 && s.xhrcall.readyState != 4 && s.xhrcall.abort();
            if (s.xhrcall) {
                s.xhrcall.onreadystatechange = function () {
                }
            }
            if (s.xhrcall = xhr()) {
                s.xhrcall.open("GET", a + "?" + b + "=" + c.urlEncode() + (s.isKeyword == "1" ? s.getKeyType() : ""), true);
                s.xhrcall.onreadystatechange = function () {
                    if (s.xhrcall.readyState == 4) {
                        switch (s.xhrcall.status) {
                            case 403:
                                s.xhrerr = 1000;
                                break;
                            case 302:
                            case 500:
                            case 502:
                            case 503:
                                s.xhrerr++;
                                break;
                            case 200:
                                s.handleResponse(s.xhrcall.responseText);
                            default:
                                s.xhrerr = 0
                        }
                    }
                };
                s.xhrcall.send(null)
            }
        }, handleResponse: function (response) {
            var s = this;
            if (response != "") {
                response = eval("(" + response + ")");
                var q = response[0];
                s.period > 0 && s.period--;
                if (s.suggestTab && q.toLowerCase() == s.q_keyboard.toLowerCase()) {
                    if (s.closeDefer) {
                        window.clearTimeout(s.closeDefer);
                        s.closeDefer = null
                    }
                    s.q_xhr = response[0];
                    s.clearSuggest();
                    var c = response[1];
                    for (var i = 0, I, html, cClick, R; i < c.length; i++) {
                        if (I = c[i]) {
                            if (html = AutoComplete["html_" + s.suggHTML]) {
                                R = s.suggestTab.insertRow(-1);
                                s.addFn2SuggItem(R);
                                R.t = i;
                                html.genHTML(R, I);
                                R.j = html.getQStr ? html.getQStr(I) : I[0]
                            }
                        }
                    }
                    if ((s.rows = s.suggestTab.rows) && s.rows.length > 0) {
                        s.addOtherHTML2SuggTab();
                        s.openSuggest()
                    } else {
                        s.closeSuggest()
                    }
                    s.actRowIndex = -1
                }
            }
        }, /**/submitJSONP: function (a, b, c) {
            var s = this;
            if (!AutoComplete.head) {
                AutoComplete.head = document.getElementsByTagName("head")[0]
            }
            s.jsonpjs && AutoComplete.head.removeChild(s.jsonpjs);
            s.jsonpjs = document.createElement("script");
            s.jsonpjs.src = a + "?" + b + "=" + c.urlEncode() + (s.isKeyword == "1" ? s.getKeyType() : "") + "&sjmodid=" + s.id + "&callback=zlzp.handleAutoComplete";
            AutoComplete.head.appendChild(s.jsonpjs)
        }, addOtherHTML2SuggTab: function () {
            return
        }, addFn2SuggItem: function (r) {
            var s = this;
            r.onclick = function () {
                s.fnClickItem(this)
            };
            r.onmousedown = function (e) {
                return s.fnMousedownItem(e)
            };
            r.onmouseover = function () {
                s.fnMouseoverItem(this)
            };
            r.onmousemove = function () {
                if (s.showFocusItem) {
                    s.showFocusItem = 0;
                    s.fnMouseoverItem(this)
                }
            }
        }, fnClickItem: function (tr) {
            var s = this;
            s.setInputVal(tr.j);
            if (s.clickItemSubmit == "1") {
                s.triggerSubmit()
            } else {
                s.closeSuggest()
            }
        }, fnMousedownItem: function (e) {
            var s = this;
            if (isIE) {
                s.input.deactiIE = 1
            } else {
                e.stopPropagation()
            }
            return false
        }, fnMouseoverItem: function (tr) {
            var s = this;
            s.flagActOnRow = false;
            if (!s.showFocusItem) {
                if (s.actRow) {
                    s.actRow.className = ""
                }
                s.actRow = tr;
                for (var a = 0, b; b = s.getRow(a); a++) {
                    b == s.actRow && (s.actRowIndex = a)
                }
                s.actRow.className = "focusrow"
            }
        }, clearSuggest: function () {
            var s = this;
            if (s.suggestTab) {
                if (isIE) {
                    for (; s.suggestTab.rows.length;) {
                        s.suggestTab.deleteRow(-1)
                    }
                } else {
                    s.suggestTab.innerHTML = ""
                }
            }
        }, fnSubmitForm: function () {
            var s = this;
            s.closeSuggest();
            if (s.rows && s.getRow(s.actRowIndex) && s.h_keyboard.value != s.input.value) {
                s.h_rowindex.value = s.getRow(s.actRowIndex).t
            } else {
                s.h_keyboard.value = "";
                s.h_rowindex.value = "f";
                if (s.period >= 10 || s.xhrerr >= 3) {
                    s.h_rowindex.value = "o"
                }
            }
        }, fnKeydown: function (e) {
            var s = this;
            AutoComplete.activeInput = s;
            var b = e.keyCode;
            if (b == 27 && s.getDivState()) {
                s.closeSuggest();
                s.setInputVal(s.q_keyboard);
                if (e.preventDefault) {
                    e.preventDefault()
                }
                if (e.stopPropagation) {
                    e.stopPropagation()
                }
                e.cancelBubble = true;
                return e.returnValue = false
            }
            if (b == 13) {
                s.pressEnter(e);
                if (e.preventDefault) {
                    e.preventDefault()
                }
                if (e.stopPropagation) {
                    e.stopPropagation()
                }
                e.cancelBubble = true;
                return e.returnValue = false
            }
            if (b == 38 || b == 40) {
                s.arrowKeyIte++;
                s.arrowKeyIte % 3 == 1 && s.operKeyInput(b);
                return false
            }
        }, fnKeyup: function (e) {
            var s = this;
            var b = e.keyCode;
            if (!s.arrowKeyIte) {
                s.operKeyInput(b)
            }
            s.arrowKeyIte = 0
        }, operKeyInput: function (b) {
            var s = this;
            if (s.input.value.toLowerCase() != s.q_input.toLowerCase()) {
                s.q_keyboard = s.input.value;
                s.cursorIndex = getCursorIndex(s.input);
                s.h_keyboard.value = s.q_keyboard
            }
            if (b == 38 || b == 40) {
                s.pressArrow(b == 40);
                s.flagActOnRow = s.getDivState()
            }
            s.setSuggestTabStyle();
            if (s.q_xhr.toLowerCase() != s.q_keyboard.toLowerCase() && !s.closeDefer) {
                s.closeDefer = window.setTimeout(function () {
                    s.closeSuggest()
                }, 500)
            }
            s.q_input = s.input.value
        }, pressArrow: function (down) {
            var s = this;
            if (s.q_keyboard.toLowerCase() == s.q_xhr.toLowerCase() && s.rows && s.rows.length) {
                if (s.getDivState()) {
                    if (s.actRow) {
                        s.actRow.className = ""
                    }
                    for (var b = s.rows.length, c = (s.actRowIndex + 1 + (down ? 1 : b)) % (b + 1) - 1; c != -1 && s.getRow(c).nonSuggItem;) {
                        c = (c + 1 + (down ? 1 : b)) % (b + 1) - 1
                    }
                    s.actRowIndex = c;
                    if (s.actRowIndex == -1) {
                        s.resetInputVal()
                    } else {
                        s.actRow = s.getRow(c);
                        s.actRow.className = "focusrow";
                        s.setInputVal(s.actRow.j);
                        s.h_rowindex.value = s.actRow.t
                    }
                } else {
                    s.openSuggest()
                }
            }
        }, pressEnter: function (e) {
            var s = this;
            if (s.actRow && s.actRowIndex != -1 && s.flagActOnRow) {
                s.actRow.onclick()
            } else {
                if (s.input.value == "") {
                    s.closeSuggest();
                    if (s.clickItemSubmit == "1") {
                        s.triggerSubmit()
                    }
                } else {
                    if (s.clickItemSubmit == "1") {
                        s.triggerSubmit()
                    }
                }
            }
        }, triggerSubmit: function (e) {
            var s = this;
            s.fnSubmitForm();
            if (s.form) {
                s.form.onsubmit && s.form.onsubmit() == false || s.form.submit()
            }
        }, openSuggest: function () {
            var s = this;
            setStyle(s.suggestTab, "visibility", "visible");
            s.setSuggestTabStyle();
            s.showFocusItem = 1
        }, closeSuggest: function () {
            var s = this;
            if (s.closeDefer) {
                window.clearTimeout(s.closeDefer);
                s.closeDefer = null
            }
            setStyle(s.suggestTab, "visibility", "hidden")
        }, getRow: function (i) {
            var s = this;
            if (isIE) {
                return s.rows[i]
            } else {
                return s.rows.item(i)
            }
        }, getDivState: function () {
            var s = this;
            return !!s.suggestTab && s.suggestTab.style.visibility == "visible"
        }, setInputVal: function (str) {
            var s = this;
            s.input.value = s.q_input = str
        }, resetInputVal: function () {
            var s = this;
            s.input.focus();
            s.setInputVal(s.q_keyboard);
            s.actRow = null;
            s.h_rowindex.value = "f"
        }, setSuggestTabStyle: function () {
            var s = this;
            if (s.suggestTab) {
                var coord = getXY(s.input);
                setStyle(s.suggestTab, "left", coord.x + "px");
                setStyle(s.suggestTab, "top", coord.y + s.input.offsetHeight + 1 + "px");
                setStyle(s.suggestTab, "width", s.suggWidth + "px")
            }
        }, createHidden: function (n, v) {
            var s = this;
            var h = document.createElement("input");
            h.type = "hidden";
            h.name = s.input.name + "_" + n;
            h.value = v;
            return (s.form || s.input.parentNode).appendChild(h)
        }, getKeyType: function () {
            var s = this;
            return "&t=" + (s.form && s.form[zlzp.searchjob.kt.h_n] && s.form[zlzp.searchjob.kt.h_n].value ? s.form[zlzp.searchjob.kt.h_n].value : "1")
        }
    };
    AutoComplete.activeInput = null;
    AutoComplete.timer = null;
    AutoComplete.PeriodicRefresh = function () {
        var AC = AutoComplete;
        if (AC.activeInput) {
            var ai = AC.activeInput;
            if (ai.xhrerr >= 3) {
                return
            }
            if (ai.q_keyboard && ai.q_keyboard.toLowerCase() != ai.q_xhr.toLowerCase()) {
                ai.period++;
                //ai.submitJSONP(ai.asp, "k", ai.q_keyboard);
                ai.input.focus()
            }
            ai.q_xhr = ai.q_keyboard;
            for (var a = 100, b = 1; b <= (ai.period - 2) / 2; b++) {
                a *= 2
            }
            a += 50;
            AC.timer = window.setTimeout(AC.PeriodicRefresh, a)
        } else {
            AC.timer = window.setTimeout(AC.PeriodicRefresh, 150)
        }
    };
    AutoComplete.html_d = {
        genHTML: function (tr, data) {
            var d = data;
            var td = document.createElement("td");
            td.innerHTML = d;
            data.j = isIE ? td.innerText : td.textContent;
            tr.appendChild(td)
        }, getQStr: function (a) {
            return a.j
        }
    };
    AutoComplete.html_c = {
        genHTML: function (tr, data) {
            var td = document.createElement("td");
            td.innerHTML = data[0] + (data[1] != "" ? " (" + data[1] + ")" : "");
            td.noWrap = "true";
            tr.appendChild(td);
            td = document.createElement("td");
            td.noWrap = "true";
            setStyle(td, "textAlign", "right");
            setStyle(td, "fontFamily", "Verdana");
            td.innerHTML = data[2];
            tr.appendChild(td)
        }
    };
    AutoComplete.html_k = {
        genHTML: function (tr, data) {
            var td = document.createElement("td");
            td.innerHTML = data[0];
            td.noWrap = "true";
            tr.appendChild(td);
            td = document.createElement("td");
            td.noWrap = "true";
            setStyle(td, "textAlign", "right");
            setStyle(td, "fontFamily", "Verdana");
            setStyle(td, "color", "#090");
            td.innerHTML = "约" + data[1] + "个职位";
            tr.appendChild(td)
        }
    };
    AutoComplete.flagCSS = false;
    AutoComplete.addCssToBody = function () {
        var b = [];

        function a(d, e) {
            b.push(d, "{", e, "}")
        }

        a(".autocomptab", "background:white;border:1px solid #000;cursor:default;font-size:12px;line-height:117%;margin:0;position:absolute;z-index:999;");
        a(".autocomptab td", "line-height:22px;nowrap:nowrap;padding:0 3px");
        a(".autocomptab .focusrow td", "background:#36c;color:#fff !important;");
        a(".autocomptab .focusrow", "background:#36c;color:#fff !important;");
        var c = document.createElement("style");
        c.setAttribute("type", "text/css");
        document.getElementsByTagName("head")[0].appendChild(c);
        b = b.join("");
        if (isIE) {
            c.styleSheet.cssText = b
        } else {
            c.appendChild(document.createTextNode(b))
        }
    };
    addEvent(window, "resize", function () {
        if (AutoComplete.activeInput) {
            AutoComplete.activeInput.setSuggestTabStyle()
        }
    });
    zlzp.handleAutoComplete = function (response) {
        if (response && response.length && sjModIns[response[response.length - 1]]) {
            var s = sjModIns[response[response.length - 1]];
            var AC = AutoComplete;
            var actObj = AC.activeInput;
            var q = response[0];
            s.period > 0 && s.period--;
            if (s.suggestTab && q.toLowerCase() == s.q_keyboard.toLowerCase()) {
                if (s.closeDefer) {
                    window.clearTimeout(s.closeDefer);
                    s.closeDefer = null
                }
                s.q_xhr = response[0];
                s.clearSuggest();
                var c = response[1];
                for (var i = 0, I, html, cClick, R; i < c.length; i++) {
                    if (I = c[i]) {
                        if (html = AutoComplete["html_" + s.suggHTML]) {
                            R = s.suggestTab.insertRow(-1);
                            s.addFn2SuggItem(R);
                            R.t = i;
                            html.genHTML(R, I);
                            R.j = html.getQStr ? html.getQStr(I) : I[0]
                        }
                    }
                }
                if ((s.rows = s.suggestTab.rows) && s.rows.length > 0) {
                    s.addOtherHTML2SuggTab();
                    s.openSuggest()
                } else {
                    s.closeSuggest()
                }
                s.actRowIndex = -1
            }
        }
    };
    window.ajax = ajax = function (options) {
        options = {
            type: (options.type && options.type.toUpperCase()) || "POST",
            url: options.url || "",
            timeout: options.timeout || 5000,
            cache: "cache" in options ? options.cache : true,
            onComplete: options.onComplete || function () {
            },
            onError: options.onError || function () {
            },
            onSuccess: options.onSuccess || function () {
            },
            onAbort: options.onAbort || options.onComplete || function () {
            },
            dataResType: options.dataResType || "",
            dataReqType: options.dataReqType || "form",
            data: options.data || ""
        };
        var reqCt = {form: "application/x-www-form-urlencoded", xml: "application/xml", script: "application/json"};
        var url4get = options.url + (options.data != "" ? "?" + options.data : "");
        if (options.cache === false && options.type == "GET") {
            var ts = +new Date;
            var ret = url4get.replace(/(\?|&)_=.*?(&|$)/, "$1_=" + ts + "$2");
            url4get = ret + ((ret == url4get) ? (url4get.match(/\?/) ? "&" : "?") + "_=" + ts : "")
        }
        var xml = xhr();
        xml.open(options.type, options.type == "GET" ? url4get : options.url, true);
        if (options.type == "POST") {
            xml.setRequestHeader("content-type", reqCt[options.dataReqType])
        }
        var timeoutLength = options.timeout;
        var requestDone = false;
        setTimeout(function () {
            requestDone = true
        }, timeoutLength);
        xml.onreadystatechange = function () {
            if (xml.readyState == 4 && !requestDone) {
                if (httpSuccess(xml)) {
                    options.onSuccess(httpData(xml, options.dataResType))
                } else {
                    options.onError()
                }
                options.onComplete();
                xml = null
            } else {
                if (requestDone) {
                    xml.abort();
                    if (xml) {
                        xml.onreadystatechange = function () {
                        }
                    }
                    options.onAbort()
                }
            }
        };
        xml.send(options.type == "POST" ? options.data : null);
        function httpSuccess(r) {
            try {
                return !r.status && location.protocol == "file:" || (r.status >= 200 && r.status < 300) || r.status == 304 || navigator.userAgent.indexOf("Safari") >= 0 && typeof r.status == "undefined"
            } catch (e) {
            }
            return false
        }

        function httpData(r, type) {
            var ct = r.getResponseHeader("content-type");
            var data = !type && ct && ct.indexOf("xml") >= 0;
            data = type == "xml" || data ? r.responseXML : r.responseText;
            if (type == "script") {
                eval.call(window, data)
            }
            return data
        }
    };
    ajax.serialize = function (a) {
        var s = [];
        if (a.constructor == Array) {
            for (var i = 0; i < a.length; i++) {
                s.push(a[i].name + "=" + a[i].value.urlEncode())
            }
        } else {
            for (var j in a) {
                s.push(j + "=" + a[j].urlEncode())
            }
        }
        return s.join("&")
    };
    window.jsonp = jsonp = function (options) {
        function removeScript(js) {
            var parent = js.parentNode;
            if (parent && parent.nodeType == 1) {
                js.onreadystatechange = js.onload = null;
                parent.removeChild(js)
            }
        }

        options = {
            url: options.url || "",
            data: options.data || "",
            onSuccess: options.onSuccess || function () {
            },
            onError: options.onError || function () {
            },
            beforeCall: options.beforeCall || function () {
            },
            noCallback: options.noCallback || false,
            cache: options.cache || false,
            callback: options.callback || "jsonp" + getUid(),
            callbackParName: options.callbackParName || "callback"
        };
        if (options.url == "") {
            return
        }
        if (!options.noCallback) {
            var callbackPair = options.callbackParName + "=" + options.callback;
            options.data += options.data == "" ? callbackPair : "&" + callbackPair
        }
        if (!options.cache) {
            var cachePair = "_=" + (+new Date);
            options.data += options.data == "" ? cachePair : "&" + cachePair
        }
        options.url += options.data == "" ? "" : "?" + options.data;
        var head = window.document.getElementsByTagName("head")[0];
        var jsflag = false;
        var jsflagok = false;
        if (!options.noCallback && !window[options.callback] && !isFunction(window[options.callback])) {
            jsflagok = true;
            window[options.callback] = function () {
                jsflag = true;
                options.onSuccess.apply(this, arguments)
            }
        }
        var reg = /loaded|complete|undefined/i;
        var js = document.createElement("script");
        js.charset = "utf-8";
        js.type = "text/javascript";
        js.defer = true;
        js.async = true;
        js.onerror = function () {
            options.onError(this);
            removeScript(this)
        };
        js.onreadystatechange = js.onload = function () {
            var myjs = this;
            if (reg.test(myjs.readyState)) {
                centralTimer.delay(function () {
                    jsflagok && !jsflag && options.onError(myjs)
                }, 100);
                removeScript(myjs)
            }
        };
        js.src = options.url;
        if (options.beforeCall && isFunction(options.beforeCall)) {
            options.beforeCall(js)
        }
        head.insertBefore(js, head.firstChild)
    };
    var timerID = 0;
    var timers_reg = [];
    var timers = [];
    var aniType = {
        linear: function (a) {
            return a
        }, easeOut: function (a) {
            return 1 - Math.pow(1 - a, 3)
        }, easeOutCos: function (a) {
            return -(Math.cos(Math.PI * a) - 1) / 2
        }, easeInAndOut: function (a) {
            return (3 - 2 * a) * a * a
        }
    };
    window.centralTimer = centralTimer = {
        frequence: 15, animation: function (duration, htmls, endfn, startfn) {
            for (var i = 0, j; j = htmls[i++];) {
                j[4] = aniType[j[4]] || aniType.linear;
                setStyle(j[0], j[1], j[2] + j[5])
            }
            timers_reg.push({
                duration: duration,
                htmls: htmls,
                endFn: endfn,
                startFn: startfn,
                origPoint: 0,
                index: null,
                aniFlag: true,
                aniDir: "f",
                setStartHTML: function (htmlIndex, newVal) {
                    this.htmls[htmlIndex] && (this.htmls[htmlIndex][2] = newVal)
                },
                setEndHTML: function (htmlIndex, newVal) {
                    this.htmls[htmlIndex] && (this.htmls[htmlIndex][3] = newVal)
                },
                reset: function () {
                    this.origPoint = 0;
                    this.aniDir = "f";
                    for (var i = 0, j; j = this.htmls[i++];) {
                        setStyle(j[0], j[1], j[2] + j[5])
                    }
                },
                restart: function () {
                    if (this.aniFlag) {
                        this.reset();
                        this.startFn && this.startFn();
                        this.onStart()
                    }
                },
                resume: function () {
                    if (this.aniFlag) {
                        this.onStart()
                    }
                },
                forward: function () {
                    if (this.aniFlag) {
                        this.aniDir = "f";
                        this.resume()
                    }
                },
                back: function () {
                    if (this.aniFlag) {
                        this.aniDir = "b";
                        this.resume()
                    }
                },
                pause: function () {
                    if (this.index !== null) {
                        if (this.aniDir == "f") {
                            this.origPoint = (new Date).getTime() - this.origPoint
                        } else {
                            if (this.aniDir == "b") {
                                this.origPoint = this.backPoint * 2 - (new Date).getTime() - this.origPoint
                            }
                        }
                        this.onStop()
                    }
                },
                cancel: function () {
                    if (this.index != null) {
                        this.pause()
                    }
                    timers_reg.splice(this.regIndex, 1)
                },
                onStart: function () {
                    this.aniFlag = false;
                    this.origPoint = (new Date).getTime() - this.origPoint;
                    if (this.aniDir == "b") {
                        this.backPoint = (new Date).getTime()
                    }
                    this.index = timers.length;
                    timers.push(this);
                    timerID = timerID || setInterval(timeControl, centralTimer.frequence)
                },
                onStop: function () {
                    this.aniFlag = true;
                    timers.splice(this.index, 1);
                    for (var i = this.index, j; j = timers[i++];) {
                        j.index--
                    }
                    this.index = null
                },
                step: function () {
                    var elapse = this.aniDir == "f" ? ((new Date).getTime() - this.origPoint) : (this.backPoint * 2 - (new Date).getTime() - this.origPoint);
                    if ((this.aniDir == "f" && elapse >= this.duration) || (this.aniDir == "b" && elapse <= 0)) {
                        for (var i = 0, j; j = this.htmls[i++];) {
                            setStyle(j[0], j[1], (this.aniDir == "f" ? j[3] : j[2]) + j[5])
                        }
                        this.origPoint = elapse < 0 ? 0 : elapse > this.duration ? this.duration : elapse;
                        this.onStop();
                        if (this.aniDir == "f") {
                            this.endFn && this.endFn()
                        }
                        return 0
                    } else {
                        for (var i = 0, j; j = this.htmls[i++];) {
                            var sValue = j[2] + (j[3] - j[2]) * j[4](elapse / this.duration);
                            if (j[5] == "px") {
                                sValue = Math.round(sValue)
                            }
                            setStyle(j[0], j[1], sValue + j[5])
                        }
                        return 1
                    }
                }
            });
            return timers_reg[timers_reg.length - 1]
        }, delay: function (fn, time) {
            var steps = Math.round(time / centralTimer.frequence);
            timers_reg.push({
                index: null, fn: fn, steps: steps, count: 1, fireFlag: true, fire: function () {
                    if (this.fireFlag) {
                        this.fireFlag = false;
                        this.index = timers.length;
                        timers.push(this);
                        timerID = timerID || setInterval(timeControl, centralTimer.frequence)
                    }
                }, cancel: function () {
                    if (this.index !== null) {
                        this.onStop()
                    }
                }, onStop: function () {
                    timers.splice(this.index, 1);
                    for (var i = this.index, j; j = timers[i++];) {
                        j.index--
                    }
                    this.index = null;
                    this.fireFlag = true;
                    this.count = 1
                }, step: function () {
                    if (this.count >= this.steps) {
                        this.onStop();
                        this.fn();
                        return 0
                    } else {
                        this.count++;
                        return 1
                    }
                }
            });
            timers_reg[timers_reg.length - 1].fire();
            return timers_reg[timers_reg.length - 1]
        }, periodical: function () {
        }
    };
    function timeControl() {
        for (var i = 0, j; j = timers[i++];) {
            j.step()
        }
        if (!timers.length) {
            window.clearInterval(timerID);
            timerID = 0
        }
    }

    var Drag = {
        obj: null, init: function (trigO, moveO, minX, maxX, minY, maxY) {
            setStyle(trigO, "cursor", "move");
            trigO.onmousedown = Drag.start;
            trigO.root = isDefAndNotNull(moveO) ? moveO : trigO;
            trigO.minX = typeof minX != "undefined" ? minX : null;
            trigO.minY = typeof minY != "undefined" ? minY : null;
            trigO.maxX = typeof maxX != "undefined" ? maxX : null;
            trigO.maxY = typeof maxY != "undefined" ? maxY : null
        }, start: function (e) {
            var o = Drag.obj = this;
            e = e || window.event;
            var x = parseInt(getStyle(o.root, "left"));
            var y = parseInt(getStyle(o.root, "top"));
            o.lastMouseX = e.clientX;
            o.lastMouseY = e.clientY;
            var scrollP = getScrollPosition();
            if (!isNull(o.minX)) {
                o.minMouseX = e.clientX - x + (isFunction(o.minX) ? (o.minX().w || o.minX()) : o.minX) + scrollP.x
            }
            if (!isNull(o.maxX)) {
                o.maxMouseX = e.clientX - x + (isFunction(o.maxX) ? (o.maxX().w || o.maxX()) : o.maxX) + scrollP.x - parseFloat(getStyle(o.root, "width")) - fixMozScrollBarWidth()
            }
            if (!isNull(o.minY)) {
                o.minMouseY = e.clientY - y + (isFunction(o.minY) ? (o.minY().h || o.minY()) : o.minY) + scrollP.y
            }
            if (!isNull(o.maxY)) {
                o.maxMouseY = e.clientY - y + (isFunction(o.maxY) ? (o.maxY().h || o.maxY()) : o.maxY) + scrollP.y - o.root.offsetHeight
            }
            document.onmousemove = Drag.drag;
            document.onmouseup = Drag.end;
            return false
        }, drag: function (e) {
            e = e || window.event;
            var o = Drag.obj;
            var ey = e.clientY;
            var ex = e.clientX;
            var y = parseInt(getStyle(o.root, "top"));
            var x = parseInt(getStyle(o.root, "left"));
            var nx, ny;
            if (!isNull(o.minX)) {
                ex = Math.max(ex, o.minMouseX)
            }
            if (!isNull(o.maxX)) {
                ex = Math.min(ex, o.maxMouseX)
            }
            if (!isNull(o.minY)) {
                ey = Math.max(ey, o.minMouseY)
            }
            if (!isNull(o.maxY)) {
                ey = Math.min(ey, o.maxMouseY)
            }
            nx = Math.max(ex - o.lastMouseX + x, 0);
            ny = Math.max(ey - o.lastMouseY + y, 0);
            setStyle(o.root, "left", nx + "px");
            setStyle(o.root, "top", ny + "px");
            if (o.root.shim) {
                setStyle(o.root.shim, "left", nx + "px");
                setStyle(o.root.shim, "top", ny + "px")
            }
            o.lastMouseX = ex;
            o.lastMouseY = ey;
            return false
        }, end: function () {
            document.onmousemove = null;
            document.onmouseup = null;
            Drag.obj = null
        }
    };
    var PopupDiv = zlzp.PopupDiv = function (t, h, d, config) {
        var s = this;
        s.trigger = t != "" && $(t);
        s.id = t;
        s.hidden = h;
        s.data = d;
        PopupDiv.allIns[s.id] = s;
        s.config = config || {};
        s.divWidth = config.width || s.trigger.offsetWidth;
        if (!s.div) {
            s.genDiv()
        }
        s.trigger && s.initShowVal()
    };
    PopupDiv.opened = null;
    PopupDiv.allIns = {};
    PopupDiv.itemSepa = "@";
    PopupDiv.dataSepa = "|";
    PopupDiv.hotCity = "@530@538@763@765@531@736@854@801@600@613@599@635@702@703@653@639@636@654@551@719@749@681@682@622@565@664@773@576@831@707@768@691@822@";
    PopupDiv.chId = 489;
    PopupDiv.chTxt = "全国";
    PopupDiv.gwId = 480;
    PopupDiv.gwTxt = "国外";
    PopupDiv.qtId = 512;
    PopupDiv.qtTxt = "其他";
    PopupDiv.zxId = "@530@538@531@551@";
    PopupDiv.spId = "@561@562@563@";
    PopupDiv.getCById = function (str, id, fn) {
        var dd = [];
        var r = new RegExp("@(" + id + ")\\|([^\\|@]*)(\\|([^@]*)|@)", "gi");
        if (fn && isFunction(fn)) {
            str.replace(r, function (a, x, y, z, u) {
                fn(x, y, u);
                return ""
            })
        } else {
            str.replace(r, function (a, x, y, z, u) {
                dd.push([x, y, u]);
                return ""
            });
            return dd
        }
    };
    PopupDiv.getCByPid = function (str, pid, fn) {
        var dd = [];
        var r = new RegExp("([^@]*)\\|([^\\|]*)\\|(" + pid + ")@", "gi");
        if (fn && isFunction(fn)) {
            str.replace(r, function (a, x, y, z) {
                fn(x, y, z);
                return ""
            })
        } else {
            str.replace(r, function (a, x, y, z) {
                dd.push([x, y, z]);
                return ""
            });
            return dd
        }
    };
    PopupDiv.getCByTxt = function (str, txt, fn) {
        var dd = [];
        var r = new RegExp("([^@]*)\\|(" + txt + ")(\\|([^@]*)|@)", "gi");
        if (fn && isFunction(fn)) {
            str.replace(r, function (a, x, y, z, u) {
                fn(x, y, u);
                return ""
            })
        } else {
            str.replace(r, function (a, x, y, z, u) {
                dd.push([x, y, u]);
                return ""
            });
            return dd
        }
    };
    PopupDiv.idStr2txtStr = function (idstr, datastr) {
        var arrId = idstr.split(PopupMutil.dataSepa);
        var txt = "";
        for (var i = 0, dItem; i < arrId.length; i++) {
            if (arrId[i] != "") {
                dItem = PopupDiv.getCById(datastr, arrId[i]);
                if (dItem.length) {
                    txt += (txt != "" ? PopupMutil.textSepa : "") + dItem[0][1]
                }
            }
        }
        return txt
    };
    PopupDiv.htmlEleContainerId = "zljsc";
    PopupDiv.htmlEleContainer = $(PopupDiv.htmlEleContainerId) || null;
    PopupDiv.addHTMLElement = function (ele, o) {
        (o || PopupDiv.htmlEleContainer || document.body).appendChild(ele)
    };
    PopupDiv.buildHTMLMainFrame = function (pdiv, o) {
        var div;
        var w = o.divWidth;

        function g(cl) {
            var dd = document.createElement("div");
            dd.className = cl;
            pdiv.appendChild(dd);
            return dd
        }

        var flag = false;
        if (o.config.popdir && o.config.popdir == "up") {
            div = g("sPopupBlock");
            o.div.cb = div;
            flag = true
        }
        var popupTitW = parseInt(getStyle(o.trigger.parentNode, "width")) || "";
        div = g(o.config.popdir && o.config.popdir == "up" ? "sPopupTitle_down" + popupTitW : "sPopupTitle" + popupTitW);
        o.div.tb = div;
        div = g("clear");
        if (!flag) {
            div = g("sPopupBlock");
            o.div.cb = div
        }
    };
    PopupDiv.buildSubdiv = function (o, c) {
        var div = document.createElement("div");
        div.className = c || "sPopupDivSub";
        div.state = "close";
        div.flagClose = true;
        div.p = null;
        o.sdivWidth && isNumber(o.sdivWidth) && setStyle(div, "width", o.sdivWidth + "px");
        addEvent(div, "click", function (e) {
            e = e || window.event;
            if (e.stopPropagation) {
                e.stopPropagation()
            } else {
                e.cancelBubble = true
            }
        });
        PopupDiv.addHTMLElement(div);
        if (false) {
            var shim = PopupDiv.buildShim(div);
            PopupDiv.addHTMLElement(shim);
            div.shim = shim
        }
        return div
    };
    PopupDiv.buildMask = function () {
        if (!isDef(PopupDiv.mask)) {
            var div = document.createElement("div");
            div.className = "divMask";
            setStyle(div, "opacity", 0.3);
            setStyle(div, "zIndex", 990);
            setStyle(div, "width", 0);
            setStyle(div, "height", 0);
            setStyle(div, "left", 0);
            setStyle(div, "top", 0);
            setStyle(div, "visibility", "hidden");
            PopupDiv.addHTMLElement(div);
            PopupDiv.mask = div;
            PopupDiv.mask.state = "hidden";
            PopupDiv.mask.show = function () {
                if (!isNull(PopupDiv.opened) && PopupDiv.opened.needMask) {
                    if (this.state == "hidden") {
                        this.state = "visible";
                        var pageS = getPageSize();
                        setStyle(this, "width", pageS.w + "px");
                        setStyle(this, "height", pageS.h + "px");
                        setStyle(this, "visibility", "visible")
                    } else {
                        PopupDiv.fixPopupDivMask()
                    }
                }
            };
            PopupDiv.mask.hide = function () {
                if (this.state == "visible") {
                    this.state = "hidden";
                    setStyle(this, "visibility", "hidden");
                    setStyle(this, "width", 0);
                    setStyle(this, "height", 0)
                }
            };
            if (PopupDiv.opened !== null && PopupDiv.opened.needMask) {
                PopupDiv.mask.show()
            }
        }
    };
    PopupDiv.fixPopupDivMask = function () {
        if (!isNull(PopupDiv.opened) && PopupDiv.opened.needMask && isDef(PopupDiv.mask) && PopupDiv.mask.state == "visible") {
            var pageS = getPageSize();
            if (parseFloat(getStyle(PopupDiv.mask, "width")) != pageS.w * 1) {
                setStyle(PopupDiv.mask, "width", pageS.w * 1 + "px")
            }
            if (parseFloat(getStyle(PopupDiv.mask, "height")) != pageS.h * 1) {
                setStyle(PopupDiv.mask, "height", pageS.h * 1 + "px")
            }
        }
    };
    PopupDiv.buildShim = function (div) {
        var shim = document.createElement("iframe");
        shim.src = "javascript:''";
        shim.frameBorder = "0";
        shim.scrolling = "no";
        shim.className = "iframeShim";
        setStyle(shim, "position", "absolute");
        setStyle(shim, "visibility", "hidden");
        setStyle(shim, "zIndex", getStyle(div, "zIndex") - 1);
        setStyle(shim, "top", "-100px");
        setStyle(shim, "left", "-100px");
        setStyle(shim, "width", isNaN(parseFloat(getStyle(div, "width"))) ? "0px" : parseFloat(getStyle(div, "width")) + "px");
        setStyle(shim, "height", "0px");
        return shim
    };
    PopupDiv.fnClickBody = function () {
        if (!isNull(PopupDiv.opened) && (!isDef(PopupDiv.mask) || PopupDiv.mask.state == "hidden")) {
            PopupDiv.opened.hidePopup()
        }
    };
    PopupDiv.fnMOver = function (h, c) {
        addClass(h, c || "mOverItem")
    };
    PopupDiv.fnMOut = function (h, c) {
        removeClass(h, c || "mOverItem")
    };
    PopupDiv.fnClickChebox = function (h) {
        (h.parentNode.tagName.toLowerCase() == "label" ? h.parentNode : h).className = h.checked ? "seledItem" : "noselItem"
    };
    PopupDiv.fnClickCheckbox_all = function (abox, iboxs) {
        for (var i = 0; i < iboxs.length; i++) {
            if (iboxs[i].checked != abox.checked) {
                iboxs[i].checked = abox.checked;
                PopupDiv.fnClickChebox(iboxs[i])
            }
        }
    };
    PopupDiv.fnClickCheckbox_item = function (abox, iboxs) {
        for (var i = 0; i < iboxs.length; i++) {
            if (!iboxs[i].checked) {
                if (abox.checked) {
                    abox.checked = false;
                    PopupDiv.fnClickChebox(abox)
                }
                return
            }
        }
        if (!abox.checked) {
            abox.checked = true
        }
    };
    PopupDiv.fixIEBack = function () {
        if (isIE) {
            for (var i in PopupDiv.allIns) {
                PopupDiv.allIns[i].initShowVal()
            }
        }
    };
    PopupDiv.fixXY = function (actionX, actionY, x, y, div, ox, oy) {
        var dw = div.offsetWidth;
        var dh = div.offsetHeight;
        var scrollP = getScrollPosition();
        var viewportS = getViewportSize();
        if (typeof (ox) != "undefined" && isNumber(ox)) {
            x += ox
        }
        if (typeof (oy) != "undefined" && isNumber(oy)) {
            y += oy
        }
        if (actionX && (x + dw - scrollP.x > viewportS.w - fixMozScrollBarWidth())) {
            x = Math.max(viewportS.w - fixMozScrollBarWidth() - dw, 0) + scrollP.x
        }
        if (actionY && (y + dh - scrollP.y > viewportS.h)) {
            y = y - dh - scrollP.y < 0 ? Math.max(viewportS.h - dh, 0) + scrollP.y : y - dh
        }
        return {x: x, y: y}
    };
    PopupDiv.scrollBodyY = function (div) {
        var dh = div.offsetHeight;
        var scrollP = getScrollPosition();
        var viewportS = getViewportSize();
        var pointer = getXY(div);
        var ani;
        if (pointer.y + dh > viewportS.h + scrollP.y && pointer.y > scrollP.y) {
            ani = centralTimer.animation(600, [[window, "scrollTop", scrollP.y, pointer.y, "easeOut", ""]]);
            ani.restart()
        } else {
            if (scrollP.y > pointer.y) {
                ani = centralTimer.animation(600, [[window, "scrollTop", scrollP.y, pointer.y, "easeOut", ""]]);
                ani.restart()
            }
        }
    };
    PopupDiv.prototype.offsetX = 0;
    PopupDiv.prototype.offsetY = 0;
    PopupDiv.prototype.needMask = true;
    PopupDiv.prototype.initShowVal = function () {
        var s = this;
        var txt = "";
        if (s.hidden.value != "") {
            txt = PopupDiv.idStr2txtStr(s.hidden.value, s.data);
            if (s.shidden && s.shidden.value != "") {
                (txt != "") && (txt += "：");
                txt += PopupDiv.idStr2txtStr(s.shidden.value, s.sdata)
            }
            if (txt != "") {
                s.showTxtOnTrigg(txt)
            }
        }
    };
    PopupDiv.prototype.getDefTriggTxt = function () {
        var s = this;
        return "请选择" + s.config.title
    };
    PopupDiv.prototype.genDiv = function () {
        var s = this;
        if (!s.div) {
            var div = document.createElement("div");
            addEvent(div, "click", function (e) {
                e = e || window.event;
                if (e.stopPropagation) {
                    e.stopPropagation()
                } else {
                    e.cancelBubble = true
                }
            });
            setStyle(div, "width", s.divWidth + "px");
            div.className = "sPopupDiv";
            s.div = div;
            PopupDiv.buildHTMLMainFrame(s.div, s);
            PopupDiv.addHTMLElement(div);
            if (false) {
                var shim = PopupDiv.buildShim(s.div);
                PopupDiv.addHTMLElement(shim);
                s.div.shim = shim
            }
            s.div.tb.innerHTML = s.genTitleHTML();
            addEvent(s.trigger, "click", function (e) {
                s.fnClickTrigger(e)
            });
            addEvent(s.trigger, "focus", function () {
                s.trigger.blur()
            })
        }
    };
    PopupDiv.prototype.isNotSelected = function (txt) {
        var s = this;
        return (PopupMutil.dataSepa + s.hidden.value + PopupMutil.dataSepa).indexOf(PopupMutil.dataSepa + txt + PopupMutil.dataSepa) < 0
    };
    PopupDiv.prototype.fnClickTrigger = function (e) {
        if (e.stopPropagation) {
            e.stopPropagation()
        } else {
            e.cancelBubble = true
        }
        var s = this;
        if (PopupDiv.opened != s) {
            if (PopupDiv.opened !== null) {
                PopupDiv.opened.hidePopup()
            }
            PopupDiv.opened = s;
            s.genHTML();
            var y = null;
            if (s.config.popdir && s.config.popdir == "up") {
                y = getXY(s.trigger).y - s.div.offsetHeight + s.trigger.offsetHeight
            }
            s.showPopup(null, y, true);
            if (s.needMask) {
                if (!PopupDiv.mask) {
                    PopupDiv.buildMask()
                } else {
                    PopupDiv.mask.show()
                }
            }
        }
    };
    PopupDiv.prototype.hidePopup = function () {
        var s = this;
        if (PopupDiv.opened == s) {
            PopupDiv.opened = null
        }
        s.div.state = "close";
        setStyle(s.div, "visibility", "hidden");
        setStyle(s.div, "left", "-100px");
        setStyle(s.div, "top", "-100px");
        if (s.div.shim) {
            setStyle(s.div.shim, "visibility", "hidden");
            setStyle(s.div.shim, "width", "0");
            setStyle(s.div.shim, "height", "0");
            setStyle(s.div.shim, "left", "-100px");
            setStyle(s.div.shim, "top", "-100px")
        }
        if (s.div.mask) {
            if (s.div.mask.state == "visible") {
                s.div.mask.hide()
            }
        }
        if (PopupDiv.opened === null && PopupDiv.mask && PopupDiv.mask.state == "visible") {
            PopupDiv.mask.hide()
        }
    };
    PopupDiv.prototype.showPopup = function (xx, yy, fixTitlePosi) {
        var s = this;
        s.div.state = "open";
        var dw = s.div.offsetWidth;
        var dh = s.div.offsetHeight;
        var coord = getXY(s.trigger);
        var offsetX = isNumber(s.config.titOffset) ? s.config.titOffset : 0;
        if (xx && isNumber(xx)) {
            var x = xx
        } else {
            var x = coord.x + offsetX
        }
        if (yy && isNumber(yy)) {
            var y = yy
        } else {
            var y = coord.y
        }
        var pointer = PopupDiv.fixXY(true, false, x, y, s.div, s.offsetX, s.offsetY);
        if (fixTitlePosi && s.div.tb && coord.x > pointer.x) {
            var fixM = coord.x + offsetX - pointer.x;
            if (isIE6) {
                fixM /= 2
            }
            setStyle(s.div.tb, "marginLeft", fixM + "px")
        }
        s.div.x = pointer.x;
        s.div.y = pointer.y;
        setStyle(s.div, "left", pointer.x + "px");
        setStyle(s.div, "top", pointer.y + "px");
        setStyle(s.div, "visibility", "visible");
        if (s.div.shim) {
            setStyle(s.div.shim, "width", dw + "px");
            setStyle(s.div.shim, "height", dh + "px");
            setStyle(s.div.shim, "left", pointer.x + "px");
            setStyle(s.div.shim, "top", pointer.y + "px");
            setStyle(s.div.shim, "visibility", "visible")
        }
        PopupDiv.scrollBodyY(s.div)
    };
    PopupDiv.prototype.fixYIfDirUp = function () {
        var s = this;
        if (s.config.popdir && s.config.popdir == "up") {
            var y = getXY(s.trigger).y - s.div.offsetHeight + s.trigger.offsetHeight;
            s.div.y = y;
            setStyle(s.div, "top", y + "px");
            if (s.div.shim) {
                setStyle(s.div.shim, "top", y + "px")
            }
        }
        PopupDiv.scrollBodyY(s.div)
    };
    PopupDiv.prototype.showTxtOnTrigg = function (txt) {
        var s = this;
        var text = txt;
        if (!s.txtN) {
            s.txtN = parseInt((parseFloat(getStyle(s.trigger, "width")) - (isIE ? parseFloat(getStyle(s.trigger, "paddingLeft")) + parseFloat(getStyle(s.trigger, "paddingRight")) : 0)) / zlzp.charW)
        }
        if (txt.realLength() > s.txtN) {
            text = "";
            for (var i = 0, j = 0, c, f; i < txt.length; i++) {
                c = txt.charAt(i);
                f = /[^\x00-\xff]/.test(c);
                if (f) {
                    j += 2
                } else {
                    j++
                }
                if (j > s.txtN - 1) {
                    break
                }
                text += c
            }
        }
        s.trigger.value = text + (text != txt ? "..." : "");
        s.trigger.title = txt
    };
    PopupDiv.prototype.fnClickClose = function () {
        var s = this;
        s.hidePopup();
        return false
    };
    PopupDiv.prototype.clearValue = function () {
        var s = this;
        s.hidden.value = "";
        s.showTxtOnTrigg(s.getDefTriggTxt())
    };
    PopupDiv.prototype.fnClickAll = function () {
        var s = this;
        s.hidden.value = "";
        s.showTxtOnTrigg("不限");
        s.fnClickClose();
        return false
    };
    PopupDiv.prototype.buildDivMask = function () {
        var s = this;
        if (!s.div.mask) {
            var d = document.createElement("div");
            d.className = "divMask";
            setStyle(d, "opacity", 0.3);
            setStyle(d, "zIndex", 1);
            setStyle(d, "width", 0);
            setStyle(d, "height", 0);
            setStyle(d, "left", 0);
            setStyle(d, "top", 0);
            setStyle(d, "visibility", "hidden");
            (s.div.parentNode && s.div.parentNode.nodeType == 1 ? s.div.parentNode : document.body).appendChild(d);
            s.div.mask = d;
            s.div.mask.state = "hidden";
            s.div.mask.show = function () {
                if (s.div.state == "open") {
                    if (this.state == "hidden") {
                        this.state = "visible";
                        setStyle(this, "width", s.div.offsetWidth + "px");
                        setStyle(this, "height", s.div.offsetHeight + "px");
                        setStyle(this, "zIndex", parseInt(getStyle(s.div, "zIndex")) + 1);
                        setStyle(this, "left", getStyle(s.div, "left"));
                        setStyle(this, "top", getStyle(s.div, "top"));
                        setStyle(this, "visibility", "visible")
                    }
                }
            };
            s.div.mask.hide = function () {
                if (this.state == "visible") {
                    this.state = "hidden";
                    setStyle(this, "visibility", "hidden");
                    setStyle(this, "width", 0);
                    setStyle(this, "height", 0);
                    setStyle(this, "left", "-100px");
                    setStyle(this, "top", "-100px")
                }
            };
            s.div.mask.onclick = function (e) {
                var e = e || window.event;
                if (e.stopPropagation) {
                    e.stopPropagation()
                } else {
                    e.cancelBubble = true
                }
                this.hide();
                var relObj = s.parent || s.child;
                if (relObj && relObj.div.state == "open") {
                    setStyle(s.div, "zIndex", parseInt(getStyle(relObj.div, "zIndex")) + 2);
                    if (!relObj.div.mask) {
                        relObj.buildDivMask()
                    }
                    relObj.div.mask.show()
                }
            }
        }
    };
    PopupDiv.prototype.fnPopupChildren = function (e, p, c) {
        var s = this;
        if (!s.subdiv) {
            s.subdiv = PopupDiv.buildSubdiv(s, c);
            s.moversd = function () {
                s.fnMouOverSubdiv()
            };
            s.moutsd = function () {
                s.fnMouOutSubdiv()
            };
            addEvent(s.subdiv, "mouseover", s.moversd);
            addEvent(s.subdiv, "mouseout", s.moutsd)
        }
        s.subdiv.flagClose = false;
        if (s.subdiv.p != p) {
            s.subdiv.innerHTML = s.genSubdivHTML(p);
            s.subdiv.p = p
        }
        var pointer = getCursorXY(e);
        pointer = PopupDiv.fixXY(true, true, pointer.x, pointer.y, s.subdiv, 0, 0);
        s.showSubdiv(pointer)
    };
    PopupDiv.prototype.showSubdiv = function (coord) {
        var s = this;
        setStyle(s.subdiv, "zIndex", parseInt(getStyle(s.div, "zIndex")) + 1);
        setStyle(s.subdiv, "left", coord.x + "px");
        setStyle(s.subdiv, "top", coord.y + "px");
        setStyle(s.subdiv, "visibility", "visible");
        if (s.subdiv.state != "open") {
            s.subdiv.state = "open"
        }
        if (s.subdiv.shim) {
            setStyle(s.subdiv.shim, "zIndex", getStyle(s.subdiv, "zIndex") - 1);
            setStyle(s.subdiv.shim, "left", coord.x + "px");
            setStyle(s.subdiv.shim, "top", coord.y + "px");
            setStyle(s.subdiv.shim, "width", s.subdiv.offsetWidth + "px");
            setStyle(s.subdiv.shim, "height", s.subdiv.offsetHeight + "px");
            setStyle(s.subdiv.shim, "visibility", "visible")
        }
    };
    PopupDiv.prototype.hideSubdiv = function () {
        var s = this;
        if (s.subdiv.state == "open" && s.subdiv.flagClose) {
            if (s.subdiv.timeControl) {
                clearTimeout(s.subdiv.timeControl);
                s.subdiv.timeControl = null
            }
            setStyle(s.subdiv, "left", "-100px");
            setStyle(s.subdiv, "top", "-100px");
            setStyle(s.subdiv, "visibility", "hidden");
            s.subdiv.state = "close";
            s.subdiv.flagClose = false;
            if (s.subdiv.shim) {
                setStyle(s.subdiv.shim, "left", "-100px");
                setStyle(s.subdiv.shim, "top", "-100px");
                setStyle(s.subdiv.shim, "width", "0");
                setStyle(s.subdiv.shim, "height", "0");
                setStyle(s.subdiv.shim, "visibility", "hidden")
            }
        }
    };
    PopupDiv.prototype.fnMouOverSubdiv = function () {
        var s = this;
        s.subdiv && (s.subdiv.flagClose = false)
    };
    PopupDiv.prototype.fnMouOutSubdiv = function () {
        var s = this;
        if (s.subdiv && s.subdiv.state == "open") {
            s.subdiv.flagClose = true;
            s.subdiv.timeControl = setTimeout(function () {
                s.hideSubdiv.apply(s)
            }, 200)
        }
    };
    var PopupSingle = zlzp.PopupSingle = function (t, h, d, config) {
        var s = this;
        base(s, t, h, d, config || {});
        s.col = s.config.col || 2;
        s.cellW = parseInt(100 / s.col) + "%"
    };
    inherits(PopupSingle, PopupDiv);
    PopupSingle.prototype.genHTML = function () {
        var s = this;
        var html = '<table cellspacing="0" cellpadding="0" border="0">';
        var d = s.dataArr || s.data.split(PopupDiv.itemSepa);
        var i, j = -1, k, dd, avai = true;
        for (i = 0; i < d.length; i++) {
            dd = null;
            if (isArray(d[i])) {
                dd = d[i]
            } else {
                if (isString(d[i]) && d[i] != "") {
                    dd = d[i].split(PopupDiv.dataSepa)
                }
            }
            if (!isNull(dd)) {
                avai = s.hidden.value != dd[0];
                j++;
                if (j % s.col == 0) {
                    html += "<tr>"
                }
                html += s.genItemHTML(avai, dd);
                if (j % s.col == s.col - 1) {
                    html += "</tr>"
                }
            }
        }
        html += "</table>";
        s.div.cb.innerHTML = html
    };
    PopupSingle.prototype.genItemHTML = function (avai, dd) {
        var s = this;
        return '<td class="mOutItem" onmouseover="zlzp.PopupDiv.fnMOver(this)" onmouseout="zlzp.PopupDiv.fnMOut(this)"><span class="' + (avai ? "availItem" : "seledItem") + '"' + (avai ? " onclick=\"zlzp.PopupDiv.allIns['" + s.id + "'].fnClickSingItem('" + dd[0] + "','" + dd[1] + "')\"" : "") + ">" + dd[1] + "</span></td>"
    };
    PopupSingle.prototype.genTitleHTML = function () {
        var s = this;
        var html = "<h1>" + (s.config.title && s.config.title != "" ? s.config.title : "") + "</h1>";
        html += '<div class="sButtonBlock">&nbsp;<a class="blueButton" href="#" onclick="return zlzp.PopupDiv.allIns[\'' + s.id + '\'].fnClickClose()">关闭</a></div><div class="clear"></div>';
        return html
    };
    PopupSingle.prototype.fnClickSingItem = function (id, txt) {
        var s = this;
        s.hidden.value = id;
        s.showTxtOnTrigg(txt);
        s.fnClickClose()
    };
    var PopupMutil = zlzp.PopupMutil = function (t, h, d, config) {
        var s = this;
        base(s, t, h, d, config || {});
        s.cheboxN = "c_" + s.id;
        s.col = s.config.col || 2;
        s.cellW = parseInt(100 / s.col) + "%"
    };
    inherits(PopupMutil, PopupDiv);
    PopupMutil.dataSepa = ";";
    PopupMutil.textSepa = "+";
    PopupMutil.prototype.genHTML = function () {
        var s = this;
        var html = '<table class="chebox" cellspacing="0" cellpadding="0" border="0">';
        var d = s.dataArr || s.data.split(PopupDiv.itemSepa);
        var i, j = -1, k, dd, avai = true;
        s.selNum = 0;
        for (i = 0; i < d.length; i++) {
            dd = null;
            if (isArray(d[i])) {
                dd = d[i]
            } else {
                if (isString(d[i]) && d[i] != "") {
                    dd = d[i].split(PopupDiv.dataSepa)
                }
            }
            if (!isNull(dd)) {
                avai = s.isNotSelected(dd[0]);
                if (!avai) {
                    s.selNum++
                }
                j++;
                if (j % s.col == 0) {
                    html += "<tr>"
                }
                html += s.genItemHTML(avai, dd);
                if (j % s.col == s.col - 1) {
                    html += "</tr>"
                }
            }
        }
        html += "</table>";
        s.div.cb.innerHTML = html
    };
    PopupMutil.prototype.genItemHTML = function (avai, dd) {
        var s = this;
        return '<td class="mOutItem" onmouseover="zlzp.PopupDiv.fnMOver(this)" onmouseout="zlzp.PopupDiv.fnMOut(this)"><label for="c_' + s.id + "_" + dd[0] + '" class="' + (avai ? "noselItem" : "seledItem") + '"><input type="checkbox" name="' + s.cheboxN + '" id="c_' + s.id + "_" + dd[0] + '" value="' + dd[0] + '" iname="' + dd[1] + '" onclick="zlzp.PopupDiv.allIns[\'' + s.id + "'].fnClickChebox(this)\"" + (avai ? "" : ' checked="checked"') + " />" + dd[1] + "</label></td>"
    };
    PopupMutil.prototype.fnClickChebox = function (c) {
        var s = this;
        c.checked ? s.selNum++ : s.selNum--;
        if (s.config.maxsel && isNumber(s.config.maxsel) && s.config.maxsel < s.selNum) {
            alert("您最多可以选择" + s.config.maxsel + "个" + s.config.title);
            c.checked = false;
            s.selNum--
        } else {
            PopupDiv.fnClickChebox(c)
        }
    };
    PopupMutil.prototype.genTitleHTML = function () {
        var s = this;
        var html = "<h1>" + (s.config.title && s.config.title != "" ? s.config.title : "") + "</h1>";
        html += '<div class="sButtonBlock"><a class="blueButton" href="#" onclick="dyweTrackEvent(\'buxian\',\'choosecondition001\');return zlzp.PopupDiv.allIns[\'' + s.id + '\'].fnClickAll()">不限</a> <a class="orgButton" href="#" onclick="dyweTrackEvent(\'ok\',\'choosecondition001\');return zlzp.PopupDiv.allIns[\'' + s.id + '\'].fnClickOk()">确认</a> <a class="blueButton" href="#" onclick="dyweTrackEvent(\'cancel\',\'choosecondition001\');return zlzp.PopupDiv.allIns[\'' + s.id + '\'].fnClickClose()">取消</a></div><div class="clear"></div>';
        return html
    };
    PopupMutil.prototype.fnClickOk = function () {
        var s = this;
        var c = s.getChebox();
        var v = "";
        var t = "";
        for (var i = 0; i < c.length; i++) {
            if (c[i].checked) {
                v += (v == "" ? "" : PopupMutil.dataSepa) + c[i].value;
                t += (t == "" ? "" : PopupMutil.textSepa) + c[i].getAttribute("iname")
            }
        }
        s.hidden.value = v;
        s.showTxtOnTrigg(t == "" ? "不限" : t);
        s.fnClickClose();
        return false
    };
    PopupMutil.prototype.getChebox = function () {
        var s = this;
        var input = s.div.cb.getElementsByTagName("input");
        var chebox = [];
        for (var i = 0; i < input.length; i++) {
            if (input[i].name == s.cheboxN) {
                chebox.push(input[i])
            }
        }
        return chebox
    };
    var PopoupIndustry = zlzp.PopupIndustry = function (t, h, d, config) {
        var s = this;
        base(s, t, h, d, config || {})
    };
    inherits(PopoupIndustry, PopupMutil);
    PopoupIndustry.prototype.genHTML = function () {
        var s = this;
        var html = '<div class="paddingTB"><table class="chebox" cellspacing="0" cellpadding="0" border="0" width="100%">';
        var d = s.dataArr || s.data.split(PopupDiv.itemSepa);
        var i, j = -1, k = -1, n = -1, dd, avai = true;
        s.selNum = 0;
        for (i = 0; i < d.length; i++) {
            dd = null;
            if (isArray(d[i])) {
                dd = d[i]
            } else {
                if (isString(d[i]) && d[i] != "") {
                    dd = d[i].split(PopupDiv.dataSepa)
                }
            }
            if (!isNull(dd)) {
                avai = s.isNotSelected(dd[0]);
                if (!avai) {
                    s.selNum++
                }
                if (j != dd[2]) {
                    if (j != -1) {
                        for (; k % s.col < s.col - 1;) {
                            html += "<td></td>";
                            if (++k % s.col == s.col - 1) {
                                html += "</tr>"
                            }
                        }
                        html += "</table></td></tr>"
                    }
                    j = dd[2];
                    n++;
                    html += '<tr class="zebraCol' + (n % 2) + '"><td class="leftClass industryLCla" nowrap="nowrap" valign="middle">' + dataHandle.getNameById(industryClass, j) + '</td><td class="jobtypeItems"><table cellspacing="0" cellpadding="0" border="0" width="100%">'
                }
                k++;
                if (k % s.col == 0) {
                    html += "<tr>"
                }
                html += s.genItemHTML(avai, dd);
                if (k % s.col == s.col - 1) {
                    html += "</tr>"
                }
            }
        }
        html += "</table></div>";
        s.div.cb.innerHTML = html
    };
    PopoupIndustry.prototype.genItemHTML = function (avai, dd) {
        var s = this;
        return '<td width="' + s.cellW + '" class="mOutItem" onmouseover="zlzp.PopupDiv.fnMOver(this)" onmouseout="zlzp.PopupDiv.fnMOut(this)"><label for="c_' + s.id + "_" + dd[0] + '" class="' + (avai ? "noselItem" : "seledItem") + '"><input type="checkbox" name="' + s.cheboxN + '" id="c_' + s.id + "_" + dd[0] + '" value="' + dd[0] + '" iname="' + dd[1] + '" onclick="zlzp.PopupDiv.allIns[\'' + s.id + "'].fnClickChebox(this)\"" + (avai ? "" : ' checked="checked"') + " />" + dd[1] + "</label></td>"
    };
    PopoupIndustry.prototype.genTitleHTML = function () {
        var s = this;
        var html = "<h1>" + (s.config.title && s.config.title != "" ? s.config.title : "") + "</h1>";
        html += '<div class="sButtonBlock"><a class="orgButton" href="#" onclick="dyweTrackEvent(\'ok\',\'choosecondition001\');return zlzp.PopupDiv.allIns[\'' + s.id + '\'].fnClickOk()">确认</a> <a class="blueButton" href="#" onclick="dyweTrackEvent(\'cancel\',\'choosecondition001\');return zlzp.PopupDiv.allIns[\'' + s.id + '\'].fnClickClose()">取消</a></div><div class="clear"></div>';
        return html
    };
    var PopupCityS = zlzp.PopupCityS = function (t, h, d, config) {
        var s = this;
        s.shidden = config.shidden;
        s.sdata = config.sdata;
        s.sdivWidth = config.swidth;
        s.noAllBtn = config.noAllBtn;
        s.hasSeledArea = config.hasSeledArea === !1 ? !1 : !0;
        s.limit = config.maxsel;
        if (s.limit === 1) {
            s.hasSeledArea = !1, s.noConfirmBtn = this.noAllBtn = !0
        }
        base(s, t, h, d, config || {})
    };
    inherits(PopupCityS, PopupSingle);
    PopupCityS.prototype.hSeled = false;
    PopupCityS.prototype.oSeled = false;
    PopupCityS.prototype.dataTabLM = 21;
    PopupCityS.prototype.initShowVal = function () {
        return
    };
    PopupCityS.prototype.buildDivFrame = function () {
        var s = this;
        if (!s.divFrame) {
            var s = this;

            function cc(cl, id) {
                var d = document.createElement("div");
                d.className = cl;
                if (id) {
                    d.id = id
                }
                s.div.cb.appendChild(d);
                return d
            }

            var seledCity = cc("seledCity", "seledCity" + this.id);
            var div = cc("clear");
            setStyle(div, "height", "5px");
            div = cc("pCityTitB");
            s.div.hctb = div;
            div = cc("pCityItemB");
            s.div.hcb = div;
            s.div.hcb.state = "open";
            div = cc("pCityTitB");
            s.div.pctb = div;
            div = cc("pCityItemB");
            s.div.pcb = div;
            s.div.pcb.state = "open";
            div = cc("pCityTitB");
            s.div.octb = div;
            div = cc("pCityItemB");
            s.div.ocb = div;
            s.div.ocb.state = "open";
            div = cc("clear");
            setStyle(div, "height", "5px");
            s.divFrame = true
        }
    };
    PopupCityS.prototype.genTitleHTML = function () {
        var a = "<h1>" + (this.config.title && this.config.title != "" ? this.config.title : "") + "</h1>";
        a += '<div class="sButtonBlock">';
        this.noConfirmBtn || (a += '<a class="orgButton" href="javascript:void(0)" onclick="dyweTrackEvent(\'ok\',\'choosecondition001\');return zlzp.PopupDiv.allIns[\'' + this.id + "'].fnClickOk()\">确定</a> ");
        this.noAllBtn || (a += '<a class="blueButton" href="javascript:void(0)" onclick="dyweTrackEvent(\'cancel\',\'choosecondition001\');return zlzp.PopupDiv.allIns[\'' + this.id + "'].fnClickClose()\">取消</a> ");
        a += '</div><div class="clear"></div>';
        return a
    };
    PopupCityS.prototype.fnSwitch = function (flag) {
        var s = this;
        var t = s.div[flag + "ctb"];
        var c = s.div[flag + "cb"];
        if (t && c) {
            if (c.state == "open") {
                setStyle(c, "display", "none");
                t.getElementsByTagName("span")[0].className = "pIconPlus";
                c.state = "close"
            } else {
                if (c.state == "close") {
                    setStyle(c, "display", "block");
                    t.getElementsByTagName("span")[0].className = "pIconMinus";
                    c.state = "open"
                }
            }
        }
        if (s.div.shim) {
            setStyle(s.div.shim, "width", s.div.offsetWidth + "px");
            setStyle(s.div.shim, "height", s.div.offsetHeight + "px")
        }
        s.fixYIfDirUp()
    };
    PopupCityS.prototype.genHTML = function () {
        this.selNum = 0;
        var s = this;
        if (!s.divFrame) {
            s.buildDivFrame()
        }
        s.genHotHTML();
        s.genProOveHTML();
        s.genSeledHTML()
    };
    PopupCityS.prototype.fnClickSingItem = function (txt) {
        var s = this;
        s.hidden.value = txt;
        zlzp.setDefTxt(s.hidden, zlzp.searchjob.c_tips);
        s.fnClickClose()
    };
    PopupCityS.prototype.fnClickProvItem = function (id, txt) {
        var s = this;
        s.hidden.value = txt;
        zlzp.setDefTxt(s.hidden, zlzp.searchjob.c_tips);
        s.genProvinceHTML(id);
        if (s.hSeled) {
            s.genHotHTML(s.div.hcb.state);
            s.hSeled = false
        }
        if (s.oSeled) {
            s.genOverseaHTML(s.div.ocb.state);
            s.oSeled = false
        }
        if (s.div.shim) {
            setStyle(s.div.shim, "width", s.div.offsetWidth + "px");
            setStyle(s.div.shim, "height", s.div.offsetHeight + "px")
        }
        s.fixYIfDirUp()
    };
    PopupCityS.prototype.gotoChinaPro = function () {
        var s = this;
        s.genProvinceHTML(PopupDiv.chId);
        if (s.div.shim) {
            setStyle(s.div.shim, "width", s.div.offsetWidth + "px");
            setStyle(s.div.shim, "height", s.div.offsetHeight + "px")
        }
        s.fixYIfDirUp()
    };
    PopupCityS.prototype.genHotHTML = function (a) {
        a = a || "open";
        this.cheboxN = this.cheboxN || "c_" + this.id;
        setStyle(this.div.hcb, "display", a == "open" ? "block" : "none");
        this.div.hcb.state != a && (this.div.hcb.state = a);
        var b = PopupDiv.hotCity.split(PopupDiv.itemSepa), a = '<span class="' + (a == "open" ? "pIconMinus" : "pIconPlus") + '" onclick="zlzp.PopupDiv.allIns[\'' + this.id + "'].fnSwitch('h')\"></span>主要城市";
        this.div.hctb.innerHTML = a;
        for (var a = '<div class="sPopupTabCB"><table cellspacing="0" cellpadding="0" border="0" class="sPopupTabC">', c = 0, d, h, g = !0, n = !1, j = 0; c < b.length; c++) {
            if (b[c] != "" && (d = PopupDiv.getCById(this.data, b[c]), d.length)) {
                h = d[0][0];
                d = d[0][1];
                g = this.isNotSelected(h);
                n = !1;
                RegExp("@" + h + "\\|[^@]+\\|([^@]+)@").test(this.data) && RegExp.$1 && this.hidden.value.search(RegExp.$1) > -1 && (g = !1, n = !0);
                if (!this.hSeled && !g) {
                    this.hSeled = !0
                }
                j % this.col == 0 && (a += "<tr>");
                a += '<td width="' + this.cellW + '" class="mOutItem" onmouseover="zlzp.PopupDiv.fnMOver(this)" onmouseout="zlzp.PopupDiv.fnMOut(this)">';
                a += this.genItem(h, d, "", g, n);
                a += "</td>";
                j % this.col == this.col - 1 && (a += "</tr>");
                j++
            }
        }
        a += "</table></div>";
        this.div.hcb.innerHTML = a
    };
    PopupCityS.prototype.genProOveHTML = function () {
        this.div.pcb.state = "open";
        this.div.ocb.state = "close";
        this.proId = PopupDiv.chId;
        this.genProvinceHTML(this.proId, this.div.pcb.state);
        this.genOverseaHTML(this.div.ocb.state)
    };
    PopupCityS.prototype.genProvinceHTML = function (proId, state) {
        var c = this, e = PopupDiv, a = proId, b = state, b = b || "open";
        setStyle(c.div.pcb, "display", "block");
        c.div.pcb.state != b && (c.div.pcb.state = b);
        if (!c.tdWPix) {
            c.tdWPix = (c.div.pcb.offsetWidth - c.dataTabLM) / c.col
        }
        setStyle(c.div.pcb, "display", b == "open" ? "block" : "none");
        var d = "";
        if (a == e.chId) {
            d = e.chTxt
        } else {
            var h = e.getCById(c.data, a);
            h.length && (d = h[0][1])
        }
        h = e.getCByPid(c.data, a);
        if (h.length) {
            var g = c.isNotSelected(a), d = '<span class="' + (b == "open" ? "pIconMinus" : "pIconPlus") + '" onclick="zlzp.PopupDiv.allIns[\'' + c.id + "'].fnSwitch('p')\"></span>" + (a != e.chId ? '<font class="mOutItem" onmouseover="zlzp.PopupDiv.fnMOver(this)" onmouseout="zlzp.PopupDiv.fnMOut(this)"><span class="' + (g ? "availItem" : "availItem") + '"' + (g ? " onclick=\"zlzp.PopupDiv.allIns['" + c.id + "'].fnClickSingItem('" + d + "')\"" : "") + ">" + d + '</span></font>&nbsp;&nbsp;<a href="#" onclick="zlzp.PopupDiv.allIns[\'' + c.id + '\'].gotoChinaPro();return false;" class="gotoup">[返回上一级]</a>' : "省市");
            c.div.pctb.innerHTML = d;
            for (var g = !0, d = '<div class="sPopupTabCB"><table cellspacing="0" cellpadding="0" border="0" class="sPopupTabC">', n = 0, j = -1, i, l, k = 1; n < h.length; n++) {
                i = h[n][0], l = h[n][1], a == e.chId && (e.itemSepa + e.zxId + e.itemSepa).indexOf(e.itemSepa + i + e.itemSepa) > -1 || (l = a == e.chId && i !== "563" && i !== "562" && i !== "561" ? l.substr(0, 2) : l, l = l == "黑龙" ? "黑龙江" : l, k = Math.min(Math.ceil(l.realLength() * zlzp.charW / c.tdWPix), c.col), (g = c.isNotSelected(i)) && e.getCByPid(c.data, i, function (a) {
                    c.isNotSelected(a) || (g = !1)
                }), c.data.indexOf(e.dataSepa + i + e.itemSepa), j++, j % c.col > (j + k - 1) % c.col && (d += "</tr>", j = 0), j % c.col == 0 && (d += "<tr>"), a == e.chId && (e.itemSepa + e.spId + e.itemSepa).indexOf(e.itemSepa + i + e.itemSepa) > -1 ? (d += '<td width="' + (parseInt(c.cellW) * k + "%") + '" class="mOutItem" onmouseover="zlzp.PopupDiv.fnMOver(this)" onmouseout="zlzp.PopupDiv.fnMOut(this)">', d += c.genItem(i, l, "", g), d += "</td>") : d += '<td width="' + (parseInt(c.cellW) * k + "%") + '" class="blurItem" onmouseover="zlzp.PopupDiv.allIns[\'' + c.id + "'].fnMOverParent(this,'" + i + "')\" onmouseout=\"zlzp.PopupDiv.allIns['" + c.id + '\'].fnMOutParent(this)"><span class="' + (g ? "availItem" : "availItem") + '" onclick="zlzp.PopupDiv.allIns[\'' + c.id + "'].fnPopupChildren(this,['" + i + "','" + l + "'])\">" + l + "</span></td>", j += k - 1, j % c.col == c.col - 1 && (d += "</tr>"))
            }
            d += "</table></div>";
            c.div.pcb.innerHTML = d
        }
    };
    PopupCityS.prototype.genOverseaHTML = function (a) {
        a = a || "open";
        this.cheboxN = this.cheboxN || "c_" + this.id;
        setStyle(this.div.ocb, "display", a == "open" ? "block" : "none");
        this.div.ocb.state != a && (this.div.ocb.state = a);
        var b = PopupDiv.getCByPid(this.data, "0");
        if (b.length) {
            var c = this.isNotSelected(b[0]);
            if (!this.oSeled && !c) {
                this.oSeled = !0
            }
            a = '<span class="' + (a == "open" ? "pIconMinus" : "pIconPlus") + '" onclick="zlzp.PopupDiv.allIns[\'' + this.id + "'].fnSwitch('o')\"></span>" + PopupDiv.gwTxt;
            this.div.octb.innerHTML = a;
            for (var a = '<div class="sPopupTabCB"><table cellspacing="0" cellpadding="0" border="0" class="sPopupTabC">', d = 0, h = -1, g, n; d < b.length; d++) {
                if (g = b[d][0], n = b[d][1], g != PopupDiv.gwId && g != PopupDiv.chId) {
                    h++;
                    c = this.isNotSelected(g);
                    if (!this.oSeled && !c) {
                        this.oSeled = !0
                    }
                    h % this.col == 0 && (a += "<tr>");
                    a += '<td width="' + this.cellW + '" class="mOutItem" onmouseover="zlzp.PopupDiv.fnMOver(this)" onmouseout="zlzp.PopupDiv.fnMOut(this)">';
                    a += this.genItem(g, n, "", c);
                    a += "</td>";
                    h % this.col == this.col - 1 && (a += "</tr>")
                }
            }
            a += "</table></div>";
            this.div.ocb.innerHTML = a
        }
    };
    PopupCityS.prototype.genItem = function (a, b, c, d, e) {
        var f = "", c = c ? "_" + c : "";
        f += this.config.maxsel === 1 ? "<span onclick=\"zlzp.PopupDiv.allIns['" + this.id + "'].fnClickSingItem('" + a + "', '" + b + '\')" class="' + (d ? "availItem" : "availItem") + '" />' + b + "</span>" : '<label for="c_' + c + this.id + "_" + a + '" class="' + (d ? "noselItem" : "noselItem") + '"><input type="checkbox" name="' + this.cheboxN + '" id="c_' + c + this.id + "_" + a + '" value="' + a + '" iname="' + b + '" onclick="zlzp.PopupDiv.allIns[\'' + this.id + "'].fnClickChebox" + c + '(this)"' + (d ? "" : ' checked="checked"') + (e ? ' disabled = "true"' : "") + " />" + b + "</label>";
        return f
    };
    PopupCityS.prototype.fnClickChebox = function (a) {
        a.checked ? this.selNum++ : this.selNum--;
        this.config.maxsel && isNumber(this.config.maxsel) && this.config.maxsel < this.selNum ? (alert("您最多可以选择" + this.config.maxsel + "个" + this.config.title), a.checked = !1, this.selNum--) : this.fnClickChebox_new(a)
    };
    PopupCityS.prototype.fnMOverParent = function (a, b) {
        PopupDiv.fnMOver(a);
        this.subdiv && this.subdiv.state == "open" && this.subdiv.p && this.subdiv.p[0] == b && (this.subdiv.flagClose = !1)
    };
    PopupCityS.prototype.fnMOutParent = function (a) {
        PopupDiv.fnMOut(a);
        this.fnMouOutSubdiv()
    };
    PopupCityS.prototype.genSubdivHTML = function () {
        var a = this, b = '<div class="paddingBlock">';
        if (a.subdiv && a.subdiv.p) {
            var c = 0;
            a.cheboxN = a.cheboxN || "c_" + a.id;
            PopupDiv.getCByPid(a.data, a.subdiv.p[0], function (d, e) {
                var f = a.isNotSelectedSub(d);
                b += '<span style="width:' + (e.length > 7 ? 219 : 107) + 'px;" class="subCboxItem mOutItem" onmouseover="zlzp.PopupDiv.fnMOver(this)" onmouseout="zlzp.PopupDiv.fnMOut(this)">';
                b += a.genItem(d, e, "sub", f);
                b += "</span>";
                c++
            })
        }
        b += '<div class="clear"></div></div>';
        return b
    };
    PopupCityS.prototype.isNotSelectedSub = function (a) {
        return (PopupDiv.dataSepa + this.shidden.value + PopupDiv.dataSepa).indexOf(PopupDiv.dataSepa + a + PopupDiv.dataSepa) < 0
    };
    PopupCityS.prototype.fnPopupChildren = function (a, b) {
        var c = this;
        c.buildSubTitle(a, b, 10);
        if (!c.subdiv || !(c.subdiv.state == "open" && c.subdiv.p[0] == b[0])) {
            if (!c.subdiv) {
                c.subdiv = this.buildSubdiv(c, "sPopupDivSubJobname"), c.moversd = function () {
                    c.fnMouOverSubdiv()
                }, c.moutsd = function () {
                    c.fnMouOutSubdiv()
                }, addEvent(c.subdiv, "mouseover", c.moversd), addEvent(c.subdiv, "mouseout", c.moutsd)
            }
            c.subdiv.flagClose = !1;
            var d = a.parentNode;
            if (c.subdiv.p != b) {
                c.subdiv.p = b;
                if (c.subdiv.trig && c.subdiv.trig != d) {
                    c.subdiv.trig.className = "blurItem"
                }
                c.subdiv.trig = d;
                c.subdiv.innerHTML = c.genSubdivHTML()
            }
            if (c.getSeledItemById(b[0])) {
                c.cbox.checked = !0
            }
            for (var d = c.subdiv.getElementsByTagName("input"), h = 0; h < d.length; h++) {
                if (d[h].checked = c.cbox.checked, d[h].disabled = c.cbox.checked, c.getSeledItemById(d[h].value)) {
                    d[h].checked = !0
                }
            }
            d = c.fixXYByTrig();
            c.showSubdiv(d)
        }
    };
    PopupCityS.prototype.buildSubTitle = function (a, b, c) {
        var d = b[0], b = b[1], e = a.parentNode.offsetWidth, f = a.parentNode.offsetHeight;
        if (!this.scdiv) {
            this.scdiv = document.createElement("div")
        }
        this.scdiv.style.display = "block";
        a.style.display = "none";
        a.parentNode.insertBefore(this.scdiv, a);
        this.config.maxsel === 1 ? this.scdiv.innerHTML = '<div style="float:left;cursor:pointer;width:16px;height:' + (f - 8) + 'px;" onclick="return zlzp.PopupDiv.allIns[\'' + this.id + "'].fnMouOutSubdiv()\"></div>" + b.slice(0, c) : (this.scdiv.innerHTML = '<div style="float:left;cursor:pointer;width:16px;height:' + (f - 8) + 'px;" onclick="return zlzp.PopupDiv.allIns[\'' + this.id + '\'].fnMouOutSubdiv()"></div><label style="float:right;margin-left:0px;text-indent:0;height:14px;line-height:14px;width:' + (e - 32) + 'px;" for="c_' + this.id + "_" + d + '"><input id="c_' + this.id + "_" + d + '" name="' + this.cheboxN + "_" + d + '" class="availCbox" type="checkbox" onclick="return zlzp.PopupDiv.allIns[\'' + this.id + '\'].fnClickAll_sub(this)" value="' + d + '" iname="' + b + '" style="margin:0 2px 0 0;" />' + b.slice(0, c) + "</label>", this.cbox = this.scdiv.getElementsByTagName("input")[0])
    };
    PopupCityS.prototype.buildSubdiv = function (a, b) {
        var c = document.createElement("div");
        c.className = b || "sPopupDivSub";
        c.state = "close";
        c.flagClose = !0;
        c.p = null;
        a.sdivWidth && t(a.sdivWidth) && setOpacity(c, "width", a.sdivWidth + "px");
        addEvent(c, "click", function (a) {
            a = a || window.event;
            a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
        });
        PopupDiv.addHTMLElement(c);
        return c
    };
    PopupCityS.prototype.fixXYByTrig = function () {
        var a = getXY(this.subdiv.trig), b = a.x, a = a.y + this.subdiv.trig.offsetHeight;
        this.subdiv.trig.className = "focusItemTop";
        a -= 2;
        if (isIE6 || isIE7) {
            a -= 2
        }
        var c = "", c = this.subdiv.trig.offsetWidth - 4 + "px";
        c += " top";
        this.subdiv.style.backgroundPosition = c;
        addClass(this.subdiv, "sPopupDivSubCity");
        return {x: b, y: a}
    };
    PopupCityS.prototype.fnClickAll = function () {
        var s = this;
        s.shidden.value = "";
        s.hidden.value = "输入/选择城市";
        s.fnClickClose();
        return false
    };
    PopupCityS.prototype.fnClickAll_sub = function (a) {
        var b = 0;
        if (this.subdiv && this.subdiv.p) {
            for (var c = this.subdiv.getElementsByTagName("input"), d = 0; d < c.length; d++) {
                if (c[d].name == this.cheboxN && a.checked && this.getSeledItemById(c[d].value)) {
                    b++;
                    break
                }
            }
        }
        if (b || !this.isSeledMax(a)) {
            if (this.subdiv && this.subdiv.p) {
                c = this.subdiv.getElementsByTagName("input");
                b = [];
                for (d = 0; d < c.length; d++) {
                    if (c[d].name == this.cheboxN) {
                        var f = c[d].value;
                        a.checked && this.removeSeledItem(f);
                        c[d].disabled = a.checked;
                        this.fnCbox_checked(f, a.checked);
                        this.fnCbox_disabled(f, a.checked);
                        b.push(c[d])
                    }
                }
                PopupDiv.fnClickCheckbox_all(a, b)
            }
            a.checked ? this.genSeledCityHTML(a) : this.removeSeledItem(a.value)
        }
    };
    PopupCityS.prototype.getSeledItemById = function (a) {
        for (var b = this.getSeledItems(), c = 0; c < b.length; c++) {
            if (b[c].getAttribute("val") === a) {
                return b[c]
            }
        }
        return null
    };
    PopupCityS.prototype.getSeledItems = function () {
        for (var a = [], b = this.seledCity ? this.seledCity.getElementsByTagName("span") : [], c = 0; c < b.length; c++) {
            b[c].className === "seledCityItem" && a.push(b[c])
        }
        return a
    };
    PopupCityS.prototype.isSeledMax = function (a) {
        a.getAttribute("iname");
        var b = this.getSeledItemById(a.getAttribute("value")) ? this.getSeledItems().length : a.checked ? this.getSeledItems().length + 1 : this.getSeledItems().length - 1;
        return this.config.maxsel && isNumber(this.config.maxsel) && this.config.maxsel < b ? (alert("您最多可以选择" + this.config.maxsel + "个" + this.config.title), a.checked = !1, !0) : !1
    };
    PopupCityS.prototype.removeSeledItem = function (a) {
        var b = this, c = b.getSeledItemById(a);
        c && (b.seledCity.removeChild(c), b.fnCbox_checked(a, !1), b.fnCbox_disabled(a, !1), PopupDiv.getCByPid(b.data, a, function (a) {
            b.fnCbox_checked(a, !1);
            b.fnCbox_disabled(a, !1)
        }))
    };
    PopupCityS.prototype.fnCbox_disabled = function (a, b) {
        for (var c = this.div.getElementsByTagName("input"), d = 0; d < c.length; d++) {
            if (c[d].value === a) {
                c[d].disabled = b
            }
        }
    };
    PopupCityS.prototype.fnCbox_checked = function (a, b) {
        for (var c = this.div.getElementsByTagName("input"), d = 0; d < c.length; d++) {
            if (c[d].value === a) {
                c[d].checked = b
            }
        }
    };
    PopupCityS.prototype.genSeledCityHTML = function (a) {
        var b = a.getAttribute("iname"), c = a.getAttribute("value");
        this.isSeledMax(a) || a.checked && !(this.seledCity.innerHTML.indexOf(b) > -1) && (this.seledCity.innerHTML += '<span class="seledCityItem" val="' + c + '" iname="' + b + '">' + b + '<a href="javascript:void(0);" class="seledCityClose" onclick="zlzp.PopupDiv.allIns[\'' + this.id + "'].fnClickSeled_close(this)\">&nbsp;</a></span>")
    };
    PopupCityS.prototype.genSeledHTML = function () {
        var a, b, c = "";
        this.seledCity = this.seledCity || $("seledCity" + this.id);
        if (!this.seledCity) {
            return ""
        }
        if (this.shidden && this.shidden.value) {
            a = this.shidden.value.replace(/\s/g, "").split(this.dataSepa);
            for (var d = 0; d < a.length; d++) {
                a[d] && (b = PopupDiv.getCById(this.data, a[d]), (b = b.length ? b[0] : null) && b[1] && (c += '<span class="seledCityItem" val="' + b[0] + '" iname="' + b[1] + '">' + b[1] + '<a href="javascript:void(0);" class="seledCityClose" onclick="zlzp.PopupDiv.allIns[\'' + this.id + "'].fnClickSeled_close(this)\">&nbsp;</a></span>"))
            }
        }
        this.seledCity.innerHTML = c
    };
    PopupCityS.prototype.fnClickChebox_sub = function (a) {
        if (!this.isSeledMax(a)) {
            var b = a.value;
            if (this.subdiv && this.subdiv.p) {
                $("c_sub_" + this.id + "_" + b);
                for (var c = this.subdiv.getElementsByTagName("input"), d = [], e = 0; e < c.length; e++) {
                    c[e].name == this.cheboxN && d.push(c[e])
                }
                this.fnCbox_checked(b, a.checked);
                a.checked ? this.genSeledCityHTML(a) : this.removeSeledItem(a.value)
            }
        }
    };
    PopupCityS.prototype.fnClickOk = function () {
        for (var a = this.getSeledItems(), b = "", c = "", d = 0; d < a.length; d++) {
            b += (b == "" ? "" : this.dataSepa) + a[d].getAttribute("val"), c += (c == "" ? "" : this.textSepa) + a[d].getAttribute("iname")
        }
        this.hidden.value = c || "输入\选择城市";
        this.shidden.value = b;
        this.hidden.title = c;
        this.fnClickClose();
        return !1
    };
    PopupCityS.prototype.onClose = function () {
    };
    PopupCityS.prototype.fnClickClose = function () {
        base(this, "fnClickClose");
        if (this.subdiv) {
            this.subdiv.flagClose = !0, this.hideSubdiv()
        }
        this.onClose();
        return !1
    };
    PopupCityS.prototype.fnClickSeled_close = function (a) {
        this.removeSeledItem(a.parentNode.getAttribute("val"))
    };
    PopupCityS.prototype.fnClickChebox_new = function (a) {
        this.isSeledMax(a) || (a.checked ? this.genSeledCityHTML(a) : this.removeSeledItem(a.value))
    };
    PopupCityS.prototype.hideSubdiv = function () {
        if (this.subdiv.state == "open" && this.subdiv.flagClose) {
            this.subdiv.trig.className = "blurItem";
            if (this.subdiv.timeControl) {
                clearTimeout(this.subdiv.timeControl), this.subdiv.timeControl = null
            }
            setStyle(this.subdiv, "left", "-100px");
            setStyle(this.subdiv, "top", "-100px");
            setStyle(this.subdiv, "visibility", "hidden");
            if (this.subdiv.state == "open" && this.subdiv.flagClose && this.subdiv.trig) {
                this.subdiv.trig.className = "blurItem"
            }
            if (this.scdiv) {
                this.scdiv.nextSibling.style.display = "block", this.scdiv.style.display = "none"
            }
            this.subdiv.shim && (setStyle(this.subdiv.shim, "left", "-100px"), setStyle(this.subdiv.shim, "top", "-100px"), setStyle(this.subdiv.shim, "width", "0"), setStyle(this.subdiv.shim, "height", "0"), setStyle(this.subdiv.shim, "visibility", "hidden"));
            this.subdiv.state = "close";
            this.subdiv.flagClose = !1
        }
    };
    PopupCityS.prototype.fnMouOverSubdiv = function () {
        this.subdiv && (this.subdiv.flagClose = !1)
    };
    PopupCityS.prototype.fnMouOutSubdiv = function () {
        var a = this;
        if (a.subdiv && a.subdiv.state == "open") {
            a.subdiv.flagClose = !0, a.subdiv.timeControl = setTimeout(function () {
                a.hideSubdiv.apply(a)
            }, 200)
        }
    };
    PopupCityS.prototype.genParentItemHTML = function (a, b) {
        return '<td width="' + 100 / this.col + '%" class="blurItem" onmouseover="zlzp.PopupDiv.allIns[\'' + this.id + "'].fnMOverParent(this,'" + b[0] + "')\" onmouseout=\"zlzp.PopupDiv.allIns['" + this.id + '\'].fnMOutParent(this)"><span class="' + (a ? "availItem" : "availItem") + '" onclick="zlzp.PopupDiv.allIns[\'' + this.id + "'].fnPopupChildren(this,['" + b[0] + "','" + b[1] + "'])\">" + b[1] + "</span></td>"
    };
    PopupCityS.prototype.getLeft = function (e) {
        var i = e.offsetLeft;
        if (e.offsetParent != null) i += arguments.callee(e.offsetParent);
        return i
    }, PopupCityS.prototype.getTop = function (e) {
        var i = e.offsetTop;
        if (e.offsetParent != null) i += arguments.callee(e.offsetParent);
        return i
    }, PopupCityS.prototype.showSubdiv = function (a) {
        setStyle(this.subdiv, "zIndex", parseInt(getStyle(this.div, "zIndex")) + 1);
        if (this.config.issubauto) {
            var boderwidth = parseInt(getStyle(this.div, "borderLeftWidth"));
            if (isNaN(boderwidth)) {
                boderwidth = 0
            }
            var subLeft = this.getLeft(this.subdiv.trig);
            var subWidth = subLeft + parseInt(this.subdiv.offsetWidth);
            var divWidth = parseInt(this.div.offsetLeft) + parseInt(this.div.offsetWidth);
            var subDivLeft = 0;
            if (subWidth > divWidth) {
                subDivLeft = subLeft - (parseInt(this.subdiv.offsetWidth) - parseInt(this.subdiv.trig.offsetWidth));
                var isChrome = window.navigator.userAgent.indexOf("Chrome") !== -1;
                var isIE = !!window.ActiveXObject;
                var isIE6 = isIE && !window.XMLHttpRequest;
                if (!(isChrome || isIE6)) {
                    var trigInner = this.subdiv.trig.getElementsByTagName("span")[0].innerHTML;
                    if (this.col == 6) {
                        if (trigInner == "辽宁" || trigInner == "安徽" || trigInner == "江西" || trigInner == "西藏") {
                            subDivLeft -= 1
                        }
                    }
                    if (this.col = 5) {
                        if (trigInner == "四川" || trigInner == "浙江" || trigInner == "内蒙" || trigInner == "湖南" || trigInner == "甘肃") {
                            subDivLeft -= 1
                        }
                    }
                }
                var c = "", c = -(400 - parseInt(this.subdiv.offsetWidth) + parseInt(this.subdiv.trig.offsetWidth)) + "px";
                c += " top";
                this.subdiv.style.backgroundPosition = c
            } else {
                subDivLeft = subLeft
            }
            setStyle(this.subdiv, "left", subDivLeft + "px")
        } else {
            setStyle(this.subdiv, "left", a.x + parseInt(getStyle(this.div, "borderLeftWidth")) + "px")
        }
        setStyle(this.subdiv, "top", a.y + "px");
        setStyle(this.subdiv, "visibility", "visible");
        if (this.subdiv.state != "open") {
            this.subdiv.state = "open"
        }
        this.subdiv.shim && (setStyle(this.subdiv.shim, "zIndex", getStyle(this.subdiv, "zIndex") - 1), setStyle(this.subdiv.shim, "left", a.x + "px"), setStyle(this.subdiv.shim, "top", a.y + "px"), setStyle(this.subdiv.shim, "width", this.subdiv.offsetWidth + "px"), setStyle(this.subdiv.shim, "height", this.subdiv.offsetHeight + "px"), setStyle(this.subdiv.shim, "visibility", "visible"))
    };
    PopupCityS.prototype.textSepa = "+";
    PopupCityS.prototype.dataSepa = ";";
    PopupCityS.prototype.genDiv = function () {
        var s = this;
        if (!s.div) {
            var div = document.createElement("div");
            addEvent(div, "click", function (e) {
                e = e || window.event;
                if (e.stopPropagation) {
                    e.stopPropagation()
                } else {
                    e.cancelBubble = true
                }
            });
            setStyle(div, "width", s.divWidth + "px");
            div.className = "sPopupDiv";
            s.div = div;
            s.buildHTMLMainFrame(s.div, s);
            PopupDiv.addHTMLElement(div);
            if (false) {
                var shim = PopupDiv.buildShim(s.div);
                PopupDiv.addHTMLElement(shim);
                s.div.shim = shim
            }
            s.div.tb.innerHTML = s.genTitleHTML();
            addEvent(s.trigger, "click", function (e) {
                s.fnClickTrigger(e)
            });
            addEvent(s.trigger, "focus", function () {
                s.trigger.blur()
            })
        }
    };
    PopupCityS.prototype.buildHTMLMainFrame = function (pdiv, o) {
        var div;
        var w = o.divWidth;

        function g(cl) {
            var dd = document.createElement("div");
            dd.className = cl;
            pdiv.appendChild(dd);
            return dd
        }

        var flag = false;
        if (o.config.popdir && o.config.popdir == "up") {
            div = g("sPopupBlock");
            o.div.cb = div;
            flag = true
        }
        var popupTitW = 250;
        div = g(o.config.popdir && o.config.popdir == "up" ? "sPopupTitle_down" + popupTitW : "sPopupTitle" + popupTitW);
        o.div.tb = div;
        div = g("clear");
        if (!flag) {
            div = g("sPopupBlock");
            o.div.cb = div
        }
    };
    PopupCityS.prototype.showPopup = function (xx, yy, fixTitlePosi) {
        var s = this;
        s.div.state = "open";
        var dw = s.div.offsetWidth;
        var dh = s.div.offsetHeight;
        var coord = getXY(s.trigger);
        var offsetX = isNumber(s.config.titOffset) ? s.config.titOffset : 0;
        if (xx && isNumber(xx)) {
            var x = xx
        } else {
            var x = coord.x + offsetX
        }
        if (yy && isNumber(yy)) {
            var y = yy
        } else {
            var y = coord.y
        }
        var pointer = PopupDiv.fixXY(true, false, x, y, s.div, s.offsetX, s.offsetY);
        if (fixTitlePosi && s.div.tb && coord.x > pointer.x) {
            var fixM = coord.x + offsetX - pointer.x;
            setStyle(s.div.tb, "marginLeft", fixM + "px")
        }
        s.div.x = pointer.x;
        s.div.y = pointer.y;
        setStyle(s.div, "left", pointer.x + "px");
        setStyle(s.div, "top", pointer.y + "px");
        setStyle(s.div, "visibility", "visible");
        if (s.div.shim) {
            setStyle(s.div.shim, "width", dw + "px");
            setStyle(s.div.shim, "height", dh + "px");
            setStyle(s.div.shim, "left", pointer.x + "px");
            setStyle(s.div.shim, "top", pointer.y + "px");
            setStyle(s.div.shim, "visibility", "visible")
        }
        PopupDiv.scrollBodyY(s.div)
    };
    PopupCityS.prototype.isNotSelected = function (a) {
        return (this.dataSepa + this.shidden.value + this.dataSepa).indexOf(this.dataSepa + a + this.dataSepa) < 0
    };
    var PopupJobTypeName = zlzp.PopupJobTypeName = function (t, h, d, config) {
        var s = this;
        s.shidden = config.shidden;
        s.sdata = config.sdata;
        s.sdivWidth = config.swidth;
        base(s, t, h, d, config || {})
    };
    inherits(PopupJobTypeName, PopupSingle);
    PopupJobTypeName.prototype.fnClickAll = function () {
        var s = this;
        base(s, "fnClickAll");
        s.shidden.value = "";
        if (s.subdiv) {
            s.subdiv.flagClose = true;
            s.hideSubdiv()
        }
        return false
    };
    PopupJobTypeName.prototype.fnClickClose = function () {
        var s = this;
        base(s, "fnClickClose");
        if (s.subdiv) {
            s.subdiv.flagClose = true;
            s.hideSubdiv()
        }
        return false
    };
    PopupJobTypeName.prototype.genTitleHTML = function () {
        var s = this;
        var html = "<h1>" + (s.config.title && s.config.title != "" ? s.config.title : "") + "</h1>";
        html += '<div class="sButtonBlock"><a class="blueButton" href="#" onclick="dyweTrackEvent(\'buxian\',\'choosecondition001\');return zlzp.PopupDiv.allIns[\'' + s.id + '\'].fnClickAll()">不限</a> <a class="blueButton" href="#" onclick="dyweTrackEvent(\'cancel\',\'choosecondition001\');return zlzp.PopupDiv.allIns[\'' + s.id + '\'].fnClickClose()">关闭</a></div><div class="clear"></div>';
        return html
    };
    PopupJobTypeName.prototype.genHTML = function () {
        var s = this;
        var html = '<table cellspacing="0" cellpadding="0" border="0" width="100%" id="jobTab">';
        var d = s.dataArr || s.data.split(PopupDiv.itemSepa);
        var i, j = -1, k = -1, n = -1, dd, avai = true;
        for (i = 0; i < d.length; i++) {
            dd = null;
            if (isArray(d[i])) {
                dd = d[i]
            } else {
                if (isString(d[i]) && d[i] != "") {
                    dd = d[i].split(PopupDiv.dataSepa)
                }
            }
            if (!isNull(dd)) {
                avai = s.isNotSelected(dd[0]);
                if (j != dd[2]) {
                    if (j != -1) {
                        for (; k % s.col < s.col - 1;) {
                            html += "<td></td>";
                            if (++k % s.col == s.col - 1) {
                                html += "</tr>"
                            }
                        }
                        html += "</table></td></tr>"
                    }
                    j = dd[2];
                    n++;
                    html += '<tr class="zebraCol' + (n % 2) + '"><td class="leftClass jobtypeLCla" nowrap="nowrap" valign="middle">' + dataHandle.getNameById(jobtypeClass, j) + '</td><td class="jobtypeItems"><table cellspacing="0" cellpadding="0" border="0" width="100%">'
                }
                k++;
                if (k % s.col == 0) {
                    html += "<tr>"
                }
                html += s.genItemHTML(avai, dd);
                if (k % s.col == s.col - 1) {
                    html += "</tr>"
                }
            }
        }
        html += '</table></td></tr></table><div class="clear"></div>';
        s.div.cb.innerHTML = html
    };
    PopupJobTypeName.prototype.genItemHTML = function (avai, dd) {
        var s = this;
        return '<td width="' + s.cellW + '" class="blurItem" onmouseover="zlzp.PopupDiv.allIns[\'' + s.id + "'].fnMOverJobtype(this,'" + dd[0] + "')\" onmouseout=\"zlzp.PopupDiv.allIns['" + s.id + '\'].fnMOutJobtype(this)"><span class="' + (avai ? "availItem" : "seledAvailItem") + '" onclick="zlzp.PopupDiv.allIns[\'' + s.id + "'].fnPopupChildren(this,['" + dd[0] + "','" + dd[1] + "'])\">" + dd[1] + "</span></td>"
    };
    PopupJobTypeName.prototype.fnMOverJobtype = function (ele, pid) {
        var s = this;
        PopupDiv.fnMOver(ele);
        s.subdiv && s.subdiv.state == "open" && s.subdiv.p && s.subdiv.p[0] == pid && (s.subdiv.flagClose = false)
    };
    PopupJobTypeName.prototype.fnMOutJobtype = function (ele) {
        var s = this;
        PopupDiv.fnMOut(ele);
        s.fnMouOutSubdiv()
    };
    PopupJobTypeName.prototype.fnPopupChildren = function (ele, p) {
        var s = this;
        if (s.subdiv && s.subdiv.state == "open" && s.subdiv.p == p) {
            return
        }
        if (!s.subdiv) {
            s.subdiv = PopupDiv.buildSubdiv(s, "sPopupDivSubJobname");
            s.moversd = function () {
                s.fnMouOverSubdiv()
            };
            s.moutsd = function () {
                s.fnMouOutSubdiv()
            };
            addEvent(s.subdiv, "mouseover", s.moversd);
            addEvent(s.subdiv, "mouseout", s.moutsd)
        }
        s.subdiv.flagClose = false;
        var parentEle = ele.parentNode;
        if (s.subdiv.p != p) {
            s.subdiv.p = p;
            if (s.subdiv.trig && s.subdiv.trig != parentEle) {
                s.subdiv.trig.className = "blurItem"
            }
            s.subdiv.trig = parentEle;
            s.subdiv.innerHTML = s.genSubdivHTML()
        }
        var pointer = s.fixXYByTrig();
        s.showSubdiv(pointer)
    };
    PopupJobTypeName.prototype.fixXYByTrig = function () {
        var s = this;
        var maxX = s.div.x + s.div.offsetWidth;
        var maxY = s.div.y + s.div.offsetHeight;
        var dw = s.sdivWidth;
        var dh = s.subdiv.offsetHeight;
        var pointer = getXY(s.subdiv.trig);
        var x = pointer.x;
        var y = pointer.y + s.subdiv.trig.offsetHeight;
        var classN = "sPopupDiv";
        if (x + dw > maxX) {
            x = x + s.subdiv.trig.offsetWidth - dw - 2 - 2;
            classN += "Right"
        } else {
            classN += "Left"
        }
        if (y + dh > maxY) {
            y = y - s.subdiv.trig.offsetHeight - dh;
            s.subdiv.trig.className = "focusItemBottom";
            classN += "Bottom";
            y += 2
        } else {
            s.subdiv.trig.className = "focusItemTop";
            classN += "Top";
            y -= 2
        }
        removeClass(s.subdiv, "sPopupDivLeftTop");
        removeClass(s.subdiv, "sPopupDivLeftBottom");
        removeClass(s.subdiv, "sPopupDivRightTop");
        removeClass(s.subdiv, "sPopupDivRightBottom");
        addClass(s.subdiv, classN);
        return {x: x, y: y}
    };
    PopupJobTypeName.prototype.hideSubdiv = function () {
        var s = this;
        if (s.subdiv.state == "open" && s.subdiv.flagClose && s.subdiv.trig) {
            s.subdiv.trig.className = "blurItem";
            if (s.subdiv.p && s.isNotSelected(s.subdiv.p[0]) && s.subdiv.trig.firstChild.className != "availItem") {
                s.subdiv.trig.firstChild.className = "availItem"
            }
        }
        base(s, "hideSubdiv")
    };
    PopupJobTypeName.prototype.genSubdivHTML = function () {
        var s = this;
        var html = '<div class="paddingBlock"><table width="100%" cellspacing="0" cellpadding="0" border="0" class="chebox">';
        if (s.subdiv && s.subdiv.p) {
            var i = 0;
            var col = s.config.scol || s.col;
            s.cheboxN = s.cheboxN || "c_" + s.id;
            PopupDiv.getCByPid(s.sdata, s.subdiv.p[0], function (cid, ctxt, cpid) {
                var avai = s.isNotSelectedSub(cid);
                if (i % col == 0) {
                    html += "<tr>"
                }
                html += '<td width="' + parseInt(100 / col) + '%" class="mOutItem" onmouseover="zlzp.PopupDiv.fnMOver(this)" onmouseout="zlzp.PopupDiv.fnMOut(this)"><label for="c_' + s.id + "_" + cid + '" class="' + (avai ? "noselItem" : "seledItem") + '"><input type="checkbox" name="' + s.cheboxN + '" id="c_' + s.id + "_" + cid + '" value="' + cid + '" iname="' + ctxt + '" onclick="zlzp.PopupDiv.allIns[\'' + s.id + "'].fnClickChebox_sub(this)\"" + (avai ? "" : ' checked="checked"') + " />" + ctxt + "</label></td>";
                if (i % col == col - 1) {
                    html += "</tr>"
                }
                i++
            })
        }
        html += "</table></div>";
        html += s.genSubDivTitleHTML();
        return html
    };
    PopupJobTypeName.prototype.genSubDivTitleHTML = function () {
        var s = this;
        var html = "";
        if (s.subdiv && s.subdiv.p) {
            var pid = s.subdiv.p[0];
            html = '<div class="sButtonBlock"><label for="c_' + s.id + "_" + pid + '" class="noselItem_selAll"><input type="checkbox" name="' + s.cheboxN + "_" + pid + '" id="c_' + s.id + "_" + pid + '" value="' + pid + '" onclick="zlzp.PopupDiv.allIns[\'' + s.id + '\'].fnClickAll_sub(this)" />全选</label>&nbsp;&nbsp;&nbsp;&nbsp;<a class="orgButton" href="#" onclick="dyweTrackEvent(\'ok\',\'choosecondition001\');return zlzp.PopupDiv.allIns[\'' + s.id + '\'].fnClickOk_sub()">确认</a> <a class="blueButton" href="#" onclick="dyweTrackEvent(\'ok\',\'choosecondition001\');return zlzp.PopupDiv.allIns[\'' + s.id + '\'].fnClickClose_sub()">取消</a></div><div class="clear"></div>'
        }
        return html
    };
    PopupJobTypeName.prototype.fnClickChebox_sub = function (c) {
        var s = this;
        PopupDiv.fnClickChebox(c);
        if (s.subdiv && s.subdiv.p) {
            var a = $("c_" + s.id + "_" + s.subdiv.p[0]);
            var input = s.subdiv.getElementsByTagName("input");
            var c = [];
            if (s.subdiv.trig) {
                s.subdiv.trig.firstChild.className = "availItem"
            }
            for (var i = 0; i < input.length; i++) {
                if (input[i].name == s.cheboxN) {
                    c.push(input[i]);
                    if (s.subdiv.trig && input[i].checked && s.subdiv.trig.firstChild.className != "seledAvailItem") {
                        s.subdiv.trig.firstChild.className = "seledAvailItem"
                    }
                }
            }
            PopupDiv.fnClickCheckbox_item(a, c)
        }
    };
    PopupJobTypeName.prototype.fnClickAll_sub = function (abox) {
        var s = this;
        if (s.subdiv && s.subdiv.p) {
            var input = s.subdiv.getElementsByTagName("input");
            var c = [];
            for (var i = 0; i < input.length; i++) {
                if (input[i].name == s.cheboxN) {
                    c.push(input[i])
                }
            }
            PopupDiv.fnClickCheckbox_all(abox, c);
            if (s.subdiv.trig) {
                if (abox.checked) {
                    s.subdiv.trig.firstChild.className = "seledAvailItem"
                } else {
                    s.subdiv.trig.firstChild.className = "availItem"
                }
            }
        }
    };
    PopupJobTypeName.prototype.fnClickOk_sub = function () {
        var s = this;
        if (s.subdiv && s.subdiv.p) {
            s.hidden.value = s.subdiv.p[0];
            var input = s.subdiv.getElementsByTagName("input");
            var c = [];
            for (var i = 0; i < input.length; i++) {
                if (input[i].name == s.cheboxN) {
                    c.push(input[i])
                }
            }
            var a = $("c_" + s.id + "_" + s.subdiv.p[0]);
            if (a.checked) {
                s.shidden.value = "";
                s.showTxtOnTrigg(s.subdiv.p[1])
            } else {
                var v = "";
                var t = "";
                for (var i = 0, cid, ctxt; i < c.length; i++) {
                    if (c[i].checked) {
                        cid = c[i].value;
                        ctxt = c[i].getAttribute("iname");
                        v += (v == "" ? "" : PopupMutil.dataSepa) + cid;
                        t += (t == "" ? "" : PopupMutil.textSepa) + ctxt
                    }
                }
                s.shidden.value = v;
                s.showTxtOnTrigg(s.subdiv.p[1] + (t == "" ? "" : "：" + t))
            }
            s.subdiv.flagClose = true;
            s.hideSubdiv();
            s.fnClickClose()
        }
        return false
    };
    PopupJobTypeName.prototype.fnClickClose_sub = function () {
        var s = this;
        s.subdiv.flagClose = true;
        s.hideSubdiv();
        return false
    };
    PopupJobTypeName.prototype.isNotSelectedSub = function (txt) {
        var s = this;
        return (PopupMutil.dataSepa + s.shidden.value + PopupMutil.dataSepa).indexOf(PopupMutil.dataSepa + txt + PopupMutil.dataSepa) < 0
    };
    addEvent(window, "resize", PopupDiv.fixPopupDivMask);
    addEvent(document, "click", PopupDiv.fnClickBody);
    addEvent(window, "load", PopupDiv.fixIEBack);
    zlzp.fnShowMoreCity = function () {
        var mC_trig = document.getElementById("moreCityTrig");
        if (mC_trig) {
            mC_trig.className = "org more opened"
        }
        var p = getXY(document.getElementById("ctt"));
        var cD = document.getElementById("light1");
        var fD = document.getElementById("fade");
        setStyle(cD, "top", p.y + 160 + "px");
        setStyle(cD, "left", p.x + "px");
        setStyle(cD, "display", "block");
        setStyle(fD, "display", "block")
    };
    zlzp.cityChannel = function () {
        function setLastCityHTML(c) {
            var cityD = city[c];
            var container = document.getElementById("cityList");
            var html = '<span>城市频道</span><ul><li><a href="http://www.zhaopin.com/' + cityD[0] + '/" onmousedown="return AdsClick(121115223,\'' + cityD[0] + '\')" class="hl">' + c + "</a></li>";
            var cs = cityD[1].split("|");
            for (var j = 0; j < cs.length; j++) {
                PopupDiv.getCById(dCity, cs[j], function (id, txt, pid) {
                    if (id == "749") {
                        txt = city_1
                    }
                    if (id == "773") {
                        txt = city_2
                    }
                    if (city[txt]) {
                        var pinying = city[txt][0];
                        var zhongwen = txt;
                        html += '<li><a href="http://www.zhaopin.com/' + pinying + '/" onmousedown="return AdsClick(121115223,\'' + pinying + "')\">" + zhongwen + "</a></li>"
                    }
                })
            }
            html += "</u>";
            container.innerHTML = html
        }

        function setLastCity(v) {
            var ids = "";
            if (v == city_1) {
                v = city_[city_1];
                ids = "749;750;751"
            } else {
                if (v == city_2) {
                    v = city_[city_2];
                    ids = "779;780;768;766;769;773;772"
                } else {
                    PopupDiv.getCByTxt(dCity, v.replace(/;/g, "|"), function (id, txt, pid) {
                        ids += (ids == "" ? "" : ";") + id;
                        return ""
                    })
                }
            }
            var expireT = new Date(new Date().getTime() + 2592000000).toGMTString();
            document.cookie = "LastCity=" + v.urlEncode().toLowerCase() + "; expires=" + expireT + "; path=/; domain=zhaopin.com";
            document.cookie = "LastCity%5Fid=" + ids.urlEncode().toLowerCase() + "; expires=" + expireT + "; path=/; domain=zhaopin.com"
        }

        var cityInput = zlzp.searchjob.f_s[zlzp.searchjob.l.h_n];
        var cityName = "", cityName4Ip = "";
        var lastCity = getCookie("LastCity");
        var city = {
            "北京": ["beijing", "538|763|765|531|600|599|702|565|568|566|570|567|704|708|707", 1],
            "上海": ["shanghai", "530|763|765|635|653|664|639|654|641|645|655|637|656|636|638", 1],
            "天津": ["tianjin", "530|538|763|765|565|600|599|702|703|570|566|567|568|704|708", 1],
            "重庆": ["chongqing", "530|538|763|765|801|749|736|854|664|635|645|806|822|740|831", 1],
            "合肥": ["hefei", "530|538|763|765|635|639|653|665|637|645|641|638|636|656|658", 1],
            "芜湖": ["wuhu", "530|538|763|765|635|639|653|665|637|645|641|638|636|656|658", 1],
            "福州": ["fuzhou", "530|538|763|765|682|766|773|685|687|749|780|769|768|697|691", 1],
            "泉州": ["quanzhou", "530|538|763|765|682|766|773|681|687|749|780|769|768|697|691", 1],
            "厦门": ["xiamen", "530|538|763|765|766|773|681|682|687|749|780|769|768|697|691", 1],
            "漳州": ["zhangzhou", "530|538|763|765|682|766|773|681|687|749|780|769|768|697|691", 1],
            "兰州": ["lanzhou", "530|538|763|765|854|801|551|719|565|702|890|806|576|721", 1],
            "东莞": ["dongguan", "530|538|763|765|682|681|773|766|768|763|769|767|780|770|772", 1],
            "佛山": ["foshan", "530|538|763|765|682|681|773|766|779|763|769|767|780|770|772", 1],
            "广州": ["guangzhou", "530|538|765|682|681|773|766|779|768|769|767|780|770|772|778", 1],
            "江门": ["jiangmen", "530|538|763|765|682|681|773|766|779|768|763|767|780|770|772", 1],
            "清远": ["qingyuan", "530|538|763|765|682|681|773|766|779|768|763|769|767|780|770", 1],
            "汕头": ["shantou", "530|538|763|765|682|681|773|766|779|768|763|769|780|770|772", 1],
            "中山": ["zhongshan", "530|538|763|765|682|681|773|766|779|768|763|769|767|770|772", 1],
            "珠海": ["zhuhai", "530|538|763|765|682|681|773|779|768|763|769|767|780|770|772", 1],
            "珠三角": ["zhusanjiao", "530|538|763|765|682|681|766|779|768|763|769|767|780|770|772", 1],
            "湛江": ["zhanjiang", "530|538|763|765|682|681|773|766|779|768|763|769|767|780|772", 1],
            "肇庆": ["zhaoqing", "530|538|763|765|682|681|773|766|779|768|763|769|767|780|770", 1],
            "深圳": ["shenzhen", "530|538|763|682|681|773|766|779|768|769|767|780|770|778|772", 1],
            "柳州": ["liuzhou", "530|538|763|765|801|551|682|785|681|780|769|766|779|773|768", 1],
            "南宁": ["nanning", "530|538|763|765|801|551|682|786|681|780|769|766|779|773|768", 1],
            "贵阳": ["guiyang", "530|538|763|765|801|551|749|806|831|785|780|769|766|779|773", 1],
            "海口": ["haikou", "530|538|763|765|831|736|664|551|801|635|800|653|785|749|691", 1],
            "三亚": ["sanya", "530|538|763|765|831|736|664|551|801|635|799|653|785|749|691", 1],
            "保定": ["baoding", "530|538|763|765|531|565|600|599|702|703|566|568|567|573|711", 1],
            "沧州": ["cangzhou", "530|538|763|765|531|565|600|599|702|703|570|568|574|567|566", 1],
            "邯郸": ["handan", "530|538|763|765|531|565|600|599|702|703|566|570|567|573|711", 1],
            "廊坊": ["langfang", "530|538|763|765|531|565|600|599|702|703|566|570|568|573|711", 1],
            "秦皇岛": ["qinhuangdao", "530|538|763|765|531|565|600|599|702|703|566|570|568|573|711", 1],
            "石家庄": ["shijiazhuang", "530|538|763|765|531|600|599|702|703|707|566|570|568|567|573", 1],
            "唐山": ["tangshan", "530|538|763|765|531|565|600|599|702|703|570|568|567|573|711", 1],
            "洛阳": ["luoyang", "530|538|763|765|719|635|703|702|664|854|704|711|714|707|708", 1],
            "郑州": ["zhengzhou", "530|538|763|765|702|703|635|664|854|721|704|711|714|707|708", 1],
            "大庆": ["daqing", "530|538|763|765|622|600|613|599|531|702|614|567|568|570|566", 1],
            "哈尔滨": ["haerbin", "530|538|763|765|599|600|613|531|702|614|627|567|568|570|566", 1],
            "荆州": ["jingzhou", "530|538|763|765|736|664|749|551|635|740|739|636|638|641|645", 1],
            "武汉": ["wuhan", "530|538|763|765|664|749|551|635|744|740|739|636|638|641|645", 1],
            "襄阳": ["xiangfan", "530|538|763|765|736|664|749|551|635|744|739|636|638|641|645", 1],
            "宜昌": ["yichang", "530|538|763|765|736|664|749|551|635|744|740|636|638|641|645", 1],
            "常德": ["changde", "530|538|763|765|736|551|801|749|740|691|697|822|806|768|779", 1],
            "长株潭": ["changzhutan", "530|538|763|765|736|551|801|755|740|691|697|822|806|768|779", 1],
            "长春": ["changchun", "530|538|763|765|599|600|622|531|702|614|568|627|570|566|567", 1],
            "吉林": ["jilin", "530|538|763|765|613|599|600|622|531|702|627|567|568|570|566", 1],
            "常州": ["changzhou", "530|538|763|765|653|639|664|635|642|643|641|647|636|637|644", 1],
            "淮安": ["huaian", "530|538|763|765|653|639|664|635|642|638|641|647|636|637|644", 1],
            "连云港": ["lianyungang", "530|538|763|765|653|639|664|635|638|643|641|647|636|637|644", 1],
            "南京": ["nanjing", "530|538|763|765|653|639|664|642|638|643|641|647|636|637|644", 1],
            "南通": ["nantong", "530|538|763|765|653|639|664|635|642|638|643|647|636|637|644", 1],
            "泰州": ["tzhou", "530|538|763|765|653|639|664|635|642|638|643|641|636|637|644", 1],
            "无锡": ["wuxi", "530|538|763|765|653|639|664|635|642|638|643|641|647|637|644", 1],
            "徐州": ["xuzhou", "530|538|763|765|653|639|664|635|642|638|643|641|647|636|644", 1],
            "盐城": ["yancheng", "530|538|763|765|653|639|664|635|642|638|643|641|647|636|637", 1],
            "镇江": ["zhenjiang", "530|538|763|765|653|639|664|635|642|638|643|641|647|636|637", 1],
            "苏州": ["suzhou", "530|538|763|765|653|635|642|645|643|641|647|636|637|644|646", 1],
            "扬州": ["yangzhou", "530|538|763|765|653|635|642|639|643|641|647|636|637|644|646", 1],
            "赣州": ["ganzhou", "530|538|763|765|664|749|653|736|639|691|665|656|658|654|655", 1],
            "南昌": ["nanchang", "530|538|763|765|664|749|653|736|639|697|665|656|658|654|655", 1],
            "鞍山": ["anshan", "530|538|763|765|613|599|622|531|600|604|602|610|606|627|567", 1],
            "大连": ["dalian", "530|538|763|765|613|599|622|531|604|602|610|606|601|627|567", 1],
            "丹东": ["dandong", "530|538|763|765|613|599|622|531|600|602|610|606|601|627|567", 1],
            "抚顺": ["fushun", "530|538|763|765|613|599|622|531|600|604|610|606|601|627|567", 1],
            "沈阳": ["shenyang", "530|538|763|765|613|622|531|600|604|602|610|606|601|627|567", 1],
            "铁岭": ["tieling", "530|538|763|765|613|599|622|531|600|604|602|606|601|627|567", 1],
            "营口": ["yingkou", "530|538|763|765|613|599|622|531|600|604|602|610|601|627|567", 1],
            "包头": ["baotou", "530|538|763|765|613|599|622|600|565|531|854|736|587|592|627", 1],
            "鄂尔多斯": ["eerduosi", "530|538|763|765|613|599|622|600|565|531|854|736|587|588|627", 1],
            "呼和浩特": ["huhehaote", "530|538|763|765|613|599|622|600|565|531|854|736|592|588|627", 1],
            "宁夏": ["ningxia", "530|538|763|765|890|555|801|864|854|551|822|806|576|721|568", 1],
            "青海": ["qinghai", "530|538|763|765|890|555|801|864|854|551|822|806|576|721|568", 1],
            "滨州": ["binzhou", "530|538|763|765|702|714|703|711|708|709|706|707|715|710|716|712", 1],
            "德州": ["dezhou", "530|538|763|765|702|714|703|711|708|709|706|717|707|710|716|712", 1],
            "东营": ["dongying", "530|538|763|765|702|714|703|711|708|709|707|717|715|710|716|712", 1],
            "济宁": ["jining", "530|538|763|765|702|714|703|711|708|707|706|717|715|710|716|712", 1],
            "济南": ["jinan", "530|538|763|765|709|714|703|711|708|707|706|717|715|710|716|712", 1],
            "聊城": ["liaocheng", "530|538|763|765|702|714|703|711|708|709|706|717|715|710|707|712", 1],
            "临沂": ["linyi", "530|538|763|765|709|702|703|711|708|707|706|717|715|710|716|712", 1],
            "青岛": ["qingdao", "530|538|763|765|709|702|714|711|708|707|706|717|715|710|716|712", 1],
            "日照": ["rizhao", "530|538|763|765|702|714|703|711|708|709|706|717|715|710|716|707", 1],
            "泰安": ["taian", "530|538|763|765|702|714|703|711|708|709|706|717|715|707|716|712", 1],
            "威海": ["weihai", "530|538|763|765|709|702|714|703|708|707|706|717|715|710|716|712", 1],
            "潍坊": ["weifang", "530|538|763|765|709|702|714|703|711|707|706|717|715|710|716|712", 1],
            "烟台": ["yantai", "530|538|763|765|709|702|714|703|711|708|706|717|715|710|716|712", 1],
            "淄博": ["zibo", "530|538|763|765|709|702|714|703|711|708|707|706|717|715|710|716", 1],
            "太原": ["taiyuan", "530|538|763|765|565|531|719|854|702|703|566|570|568|567|721", 1],
            "宝鸡": ["baoji", "530|538|763|765|854|736|719|801|551|702|565|576|861|864|806", 1],
            "西安": ["xian", "530|538|763|765|736|719|801|551|702|565|576|861|856|864|806", 1],
            "榆林": ["yulin", "530|538|763|765|854|736|719|801|551|702|565|576|856|864|806", 1],
            "成都": ["chengdu", "530|538|763|765|551|719|854|736|749|721|740|822|691|697|721", 1],
            "绵阳": ["mianyang", "530|538|763|765|801|551|854|719|736|749|721|740|822|691|697", 1],
            "西藏": ["xizang", "530|538|763|765|890|558|801|551|635|854|749|822|806|831|785", 1],
            "乌鲁木齐": ["wulumuqi", "530|538|763|765|854|801|551|719|565|702|864|806|576|721|568", 1],
            "昆明": ["kunming", "530|538|763|765|801|551|749|822|806|831|785|780|769|766|779", 1],
            "湖州": ["huzhou", "530|538|763|765|635|664|653|656|659|654|658|639|662|655|645|10004", 1],
            "杭州": ["hangzhou", "530|538|763|765|635|664|657|656|659|654|658|639|662|655|645|10004", 1],
            "金华": ["jinhua", "530|538|763|765|635|664|653|657|656|654|658|639|662|655|645|10004", 1],
            "嘉兴": ["jiaxing", "530|538|763|765|635|664|653|657|659|654|658|639|662|655|645|10004", 1],
            "宁波": ["ningbo", "530|538|763|765|635|664|653|657|656|659|658|639|662|655|645|10004", 1],
            "绍兴": ["shaoxing", "530|538|763|765|635|664|653|657|656|659|654|639|662|655|645|10004", 1],
            "台州": ["taizhou", "530|538|763|765|635|664|653|657|656|659|654|658|639|655|645|10004", 1],
            "温州": ["wenzhou", "530|538|763|765|635|664|653|657|656|659|654|658|639|662|645|10004", 1],
            "义乌": ["yiwu", "530|538|763|765|635|664|653|657|656|659|654|658|639|662|655|645", 1]
        };
        var city_1 = "长株潭", city_2 = "珠三角";
        var city_ = {"长株潭": "长沙;株洲;湘潭", "珠三角": "惠州"};
        var prov_ = {"西藏自治区": "西藏"};
        if (lastCity !== null && lastCity != "" && lastCity != "null" && lastCity != "全国") {
            if (lastCity == city_[city_1]) {
                cityName = "长沙";
                cityName4Ip = city_1
            } else {
                if (lastCity == city_[city_2]) {
                    cityName = "珠海";
                    cityName4Ip = city_2
                } else {
                    var rs = lastCity.replace(new RegExp(";", "gi"), "|");
                    var cd = PopupDiv.getCByTxt(dCity, rs);
                    if (!cd.length) {
                        cd = PopupDiv.getCById(dCity, rs)
                    }
                    if (cd.length) {
                        cityName = cd[0][1]
                    }
                    cityName4Ip = cityName;
                    if (prov_[cityName4Ip]) {
                        cityName4Ip = prov_[cityName4Ip]
                    }
                    if (cityName4Ip.slice(-1) === "省") {
                        cityName4Ip = cityName4Ip.slice(0, -1)
                    }
                }
            }
            cityInput.value = zlzp.cityChannel.city = cityName;
            if (lastCity.indexOf(";") < 0) {
                if (city_[city_1].indexOf(lastCity) > -1) {
                    cityName4Ip = city_1
                }
                if (city_[city_2].indexOf(lastCity) > -1) {
                    cityName4Ip = city_2
                }
            }
            if (cityName4Ip != "" && city[cityName4Ip] && city[cityName4Ip][2]) {
                setLastCityHTML(cityName4Ip)
            }
        } else {
            ajax({
                type: "get", url: "/jobs/ajax/ip2city.aspx", onSuccess: function (response) {
                    if (response != "" && response.indexOf("|") > 0) {
                        var lastCity = response.split("|")[0];
                        if (lastCity) {
                            if (city[lastCity] && city[lastCity][2]) {
                                setLastCityHTML(lastCity)
                            }
                            setLastCity(lastCity);
                            if (lastCity == city_1) {
                                lastCity = city_[city_1]
                            } else {
                                if (lastCity == city_2) {
                                    lastCity = city_[city_2]
                                }
                            }
                            cityInput.value = zlzp.cityChannel.city = lastCity.split(";")[0]
                        }
                    }
                }, onError: function () {
                    cityInput.value = ""
                }, onComplete: function () {
                    zlzp.setDefTxt(cityInput, zlzp.searchjob.c_tips)
                }, data: ""
            })
        }
    };
    zlzp.cityChannel.city = "";
    zlzp.cityChannel.fixIEBug = function () {
        try {
            if (isIE && zlzp.searchjob.f_s) {
                var cityInput = zlzp.searchjob.f_s[zlzp.searchjob.l.h_n];
                if (cityInput) {
                    if (cityInput.value != zlzp.cityChannel.city) {
                        cityInput.value = zlzp.cityChannel.city
                    }
                    zlzp.searchjob.setTips()
                }
            }
        } catch (e) {
        }
    };
    regEveDomReady(initSJModule, zlzp.cityChannel.fixIEBug);
    if (zlzp.first) {
        for (var a = 0, b; b = zlzp.first[a]; ++a) {
            b()
        }
        delete zlzp.first
    }
})();