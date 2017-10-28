//-- Zhaopin Web Analytics Module 2006.12.19

//cookieValue= 1234567890123  . 123456  .  1234567890  .1234567890 . n
//             first millSect . radomIn . previous sec .  now sec  . n

var cookie_name="__zpWAM",query_name="DYWE",s1_name="__zpWAMs1",s2_name="__zpWAMs2",querySV="-",querySV_firstRef="-",query_name_firstRef="firstRef";
var wam_timeout="3600"// set the inactive session(s1_name) timeout in seconds
var wam_dn="zhaopin.com";
var wam_cp="/";

var wam_d=document;
var wam_dl=wam_d.location;
var wam_u,wam_dt,wam_st=0,wam_ns=0,wam_do="",wam_ff,id_value;

function zpWAM_tracker(){
	if(wam_ff) return;
	tracker_cookie();
	firstRefURL_cookie();
	tracker_form();
	wam_ff=1;
}

function tracker_cookie(){
	if(wam_dl.protocol=="file:") return;
	var index,s1,s2,x="";
	var nx=" expires=Sun, 18 Jan 2038 00:00:00 GMT;";
	var dc=wam_d.cookie;
	wam_u=Math.round(Math.random()*483647);
	wam_dt=new Date();
	wam_st=Math.round(wam_dt.getTime());
	index=dc.indexOf(cookie_name+"=");
	s1=dc.indexOf(s1_name+"=1");
	s2=dc.indexOf(s2_name+"=1");
	wam_do=" domain="+wam_dn+";";
	if(wam_timeout && wam_timeout!=""){
  		x=new Date(wam_dt.getTime()+(wam_timeout*1000));
  		x=" expires="+x.toGMTString()+";";
 	}
	if(index>=0 && s1>=0 && s2>=0){
		wam_d.cookie=s1_name+"=1; path="+wam_cp+";"+x+wam_do;
	}
	else{
		if(index>=0) id_value=wam_FixC(wam_d.cookie,";",Math.round(wam_st/1000));
		else id_value=wam_st+"."+wam_u+"."+Math.round(wam_st/1000)+"."+Math.round(wam_st/1000)+".1";
		wam_d.cookie=cookie_name+"="+id_value+"; path="+wam_cp+";"+nx+wam_do;
		wam_d.cookie=s1_name+"=1; path="+wam_cp+";"+x+wam_do;
		wam_d.cookie=s2_name+"=1; path="+wam_cp+";"+wam_do;
	}
	querySV = wam_GC(wam_d.cookie,cookie_name+'=',';');
}

function tracker_form(){
	if(querySV!='-'){
		var f=document.forms,i;  
		for(i=0;f[i];i++) if(f[i].method.toLowerCase()=="get") genQueryString(f[i]); //form : method=get
		else{                                              
			queryS=genQueryString();                                                   //form : method=post
			if(!existQueryString(f[i].action,query_name+"=")) f[i].action=addQueryString(f[i].action,queryS);
		}
	}
}

function wam_FixC(c,s,t) {
 	if(!c || c=="" || !s || s=="" || !t || t=="") return "-";
 	var value=wam_GC(c,cookie_name+"=",s);
 	var lt=0,i=0;
 	if((i=value.lastIndexOf(".")) > 9){
  		wam_ns=value.substring(i+1,value.length);
  		wam_ns=(wam_ns*1)+1;
  		value=value.substring(0,i);
  		if((i=value.lastIndexOf(".")) > 7){
   			lt=value.substring(i+1,value.length);
   			value=value.substring(0,i);
  		}
  		if((i=value.lastIndexOf(".")) > 5){
   			value=value.substring(0,i);
  		}
  		value+="."+lt+"."+t+"."+wam_ns;
 	}
 	return value;
}
function wam_GC(l,n,s) {
	if(!l || l=="" || !n || n=="" || !s || s=="") return "-";
 	var i,i2,i3,c="-";
 	i=l.indexOf(n);
 	i3=n.indexOf("=")+1;
 	if(i > -1){
  		i2=l.indexOf(s,i);
		if(i2 < 0) i2=l.length;
  		c=l.substring((i+i3),i2);
 	}
 	return c;
}

function genQueryString(f){
	if(f){
		var flagEle=false,newHidden,i;
		for(i=0;i<f.length;i++) if(f.elements[i].name==query_name){flagEle=true;break;}
		if(!flagEle){
			newHidden = document.createElement("input");
			newHidden.name=query_name;
			newHidden.type="hidden";
			newHidden.value=querySV;
			f.appendChild(newHidden);
		}
		if(flagWriteRef){
			newHidden = document.createElement("input");
			newHidden.name=query_name_firstRef;
			newHidden.type="hidden";
			newHidden.value=querySV_firstRef;
			f.appendChild(newHidden);
		}
	}
	else{
		var str = '';
		str = query_name+"="+querySV;
		if(flagWriteRef) str += '&'+query_name_firstRef+'='+querySV_firstRef;
		return str;
	}
}

function addQueryString(s,q){
	var hashS='',hashIndex;
	hashIndex=s.indexOf('#');
	if(hashIndex>-1) hashS=s.substring(hashIndex);
	if(hashS!='') s=s.substring(0,hashIndex);
	if(s.indexOf("?")>-1) s+="&"+q+hashS;
	else s+="?"+q+hashS;
	return s;
}
function existQueryString(s,q){
	if(s.indexOf("&"+q)>-1 || s.indexOf("?"+q)>-1) return true;
	else return false;
}
//myAttachEvent(window,"load",zpWAM_tracker);

function myAttachEvent(d,e,f){
	try {
		if(d.attachEvent) d.attachEvent("on"+e,f);
		else if(d.addEventListener) d.addEventListener(e,f,false);
		else{
			var oldF = eval("d.on"+e);
			if(typeof oldF!="function") eval("d.on"+e+"=f");
			else eval("d.on"+e)=function(){oldF();f();}
		}
	}
	catch (error){}
}

function findElement(el,element){
  newel = el;
  while(newel.tagName.toLowerCase()!=element && newel.parentNode && newel.tagName.toLowerCase()!='html'){
    newel = newel.parentNode;
  }
  if(newel.tagName.toLowerCase() == element) return newel;
  else return false;
}

var existFormEle = false;
function eventHander(e){
	if(querySV!='-'){
		queryS=genQueryString();
		
		var pObj;
		if(pObj = findElement((e.srcElement?e.srcElement:e.target),'a')){        //link
			var a = pObj,indexT,aInnerHTML=a.innerHTML;
			if(a.href.indexOf('zhaopin.com')>=0 && a.href.toLowerCase().indexOf('ads.jsp')==-1 && a.href.toLowerCase().indexOf('www1.zhaopin.com')==-1 && a.href.toLowerCase().indexOf("cnt.zhaopin.com")==-1){
				if(a.href.indexOf("http://cnt.zhaopin.com/Market/whole_counter.jsp?")==0 && a.href.indexOf("&url=")>-1 && !existQueryString(a.href,query_name+"=")){//ad link
					indexT=a.href.indexOf("&url=");
					if(a.href.indexOf("?",indexT)>-1) a.href+="&"+queryS;//location.href=a.href+"&"+queryS;
					else a.href+="?"+queryS;//location.href=a.href+"?"+queryS;
				}
				/*else if(a.href.indexOf("http://cnt.zhaopin.com/Market/ads.jsp?")==0 && a.href.indexOf("&url=")>-1 && !existQueryString(a.href,query_name+"=")){//ad link
					indexT=a.href.indexOf("&url=");
					if(a.href.indexOf("?",indexT)>-1) a.href+="&"+queryS;//location.href=a.href+"&"+queryS;
					else a.href+="?"+queryS;//location.href=a.href+"?"+queryS;
				}*/
				else if(!(a.href.toLowerCase().indexOf("javascript:")==0 || a.href.toLowerCase().indexOf("mailto:")==0 || a.href.toLowerCase().indexOf("ftp:")==0) && !existQueryString(a.href,query_name+"=")) a.href=addQueryString(a.href,queryS);
				if(a.innerHTML!=aInnerHTML) a.innerHTML=aInnerHTML;//for IE
			}
		}
		/*else if(pObj = findElement((e.srcElement?e.srcElement:e.target),'form')){ //form : method=get  //fireFox:error
			var f = pObj,flagEle=false,newHidden,i;
			if(f.method.toLowerCase()=="get"){
				for(i=0;i<f.length;i++) if(f.elements[i].name==query_name){flagEle=true;break;}
				if(!flagEle){
					newHidden = document.createElement("input");
					newHidden.name=query_name;
					newHidden.type="hidden";
					newHidden.value=querySV;
					f.appendChild(newHidden);
				}
			}
			else{                                              //form : method=post
				if(!existQueryString(f.action,query_name+"=")) f.action=addQueryString(f.action,queryS);
			}
		}*/
	}
}
//myAttachEvent(document,'click',eventHander);

var firstRefCookieN = "firstreferrerurl";
var firstref_cp = "/";
var firstref_dn="zhaopin.com";
var flagWriteRef = false;
function firstRefURL_cookie(){
	if(wam_dl.protocol=="file:") return;
	var index;
	var dc=wam_d.cookie;
	index=dc.indexOf(firstRefCookieN+"=");
	if(index==-1 && wam_dl.toString().indexOf(query_name)==-1){
		wam_d.cookie=firstRefCookieN+"="+(wam_dl.toString().toLowerCase().indexOf('mref=')>-1?escape(wam_dl):escape(document.referrer))+"; path="+firstref_cp+"; domain="+firstref_dn+";";
		flagWriteRef = true;
	}
	querySV_firstRef = wam_GC(wam_d.cookie,firstRefCookieN+'=',';');
}


/*specialAD monitor*/
var zp_specialAD_monitor = {
	cookieName : 'specialADurl',
	query_name : 'adurl',
	specialURL : ['www1.zhaopin.com','www2.zhaopin.com','special.zhaopin.com','search.zhaopin.com/partner/','my.zhaopin.com/partner/'],
	monitorURL : ['index.html','beijing/','shanghai/','guangzhou/','shenzhen/','tianjin/','wuhan/','xian/','chengdu/','dalian/','changchun/','shenyang/','nanjing/','jinan/','qingdao/','hangzhou/','suzhou/','wuxi/','ningbo/','guangxi/','anhui/','chongqing/','zhengzhou/','shijiazhuang/','changzhutan/','fuzhou/','haerbin/','xiamen/','nanchang/','wulumuqi/','taiyuan/','hefei/','changzhou/','kunming/','baoding/','xuzhou/','nantong/','nanning/','wenzhou/','lanzhou/','guiyang/','yantai/','weihai/','fushun/','eerduosi/','baotou/','yangzhou/','lianyungang/','ganzhou/','huhehaote/'],
	searchURL : ['/jobs/request.asp','/jobseeker/job_results.asp','/jobs_nv/jobsearchlistadv.asp','/jobseeker/company.asp'],
	jobURL : ['http://jobs.zhaopin.com/','http://rd2.zhaopin.com/compinfo/showallcitiesofposition.asp'],
	isURLok : function(url,arrURL,prefix){
		if(typeof(url)=='string'){
			var regexpStr = '';
			for(var i=0;i<arrURL.length;i++) regexpStr += regexpStr==''?(prefix?prefix+arrURL[i]:arrURL[i]):'|'+(prefix?prefix+arrURL[i]:arrURL[i]);
			var regexp = new RegExp(regexpStr,'gi');
			return regexp.test(url);
		}
		else return false;
	},
	isNodeok : function(el){
		var okIDRegExp = new RegExp('^(zmf|mqzp|jjzpl|mingqi|mqzp2)$','gi');
		var newel = el;
		var newid = newel.id?newel.id:'';
		var flag = okIDRegExp.test(newid);
  		while(!flag && newel.parentNode && newel.tagName.toLowerCase()!='html'){
			newel = newel.parentNode;
			newid = newel.id?newel.id:'';
			flag = okIDRegExp.test(newid);
		}
  		if(flag) return newel;
  		else return false;
	},
	setADCookie : function(e){
		var pObj = zp_specialAD_monitor;
		var aTag = pObj.findElement((e.srcElement?e.srcElement:e.target),'a');
		if(aTag && aTag.nodeType==1 && aTag.tagName.toLowerCase()=='a'){
			var flag1 = pObj.isURLok(document.location.toString(),pObj.monitorURL,'http://www.zhaopin.com/');
			if(flag1){
				var flag2 = !!pObj.isNodeok(aTag);
				if(flag2) pObj.setCookie(pObj.cookieName,aTag.toString());
			}
		}
		else return;
	},
	delADCookie : function(){
		var pObj = zp_specialAD_monitor;
		var flag = pObj.isURLok(document.location.toString(),pObj.searchURL);
		if(flag) pObj.deleteCookie(pObj.cookieName);
	},
	callImg : function(){
		var pObj = zp_specialAD_monitor;
		var flag = pObj.isURLok(document.location.toString(),pObj.jobURL);
		if(flag){
			var cookieV = pObj.getCookie(pObj.cookieName);
			if(cookieV){
				cookieV = window.encodeURIComponent?encodeURIComponent(cookieV):escape(cookieV);
				var adImg = document.createElement('img');
				adImg.src = 'http://my.zhaopin.com/images/blank_specialad.gif?adurl='+cookieV;
			}
		}
	},
	setCookie : function(name,value,expires,path){
		document.cookie= name + '=' + (window.encodeURIComponent?encodeURIComponent(value):escape(value)) + ((expires) ? '; expires=' + expires.toGMTString() : '') + ((path) ? '; path=' + path : '; path=/') + '; domain=zhaopin.com';
	},
	getCookie : function(name){
		var dc = document.cookie;
   		var prefix = name + '=';
    	var begin = dc.indexOf('; ' + prefix);
    	if(begin == -1){
       		begin = dc.indexOf(prefix);
       		if(begin != 0) return null;
    	}
		else begin += 2;
    	var end = document.cookie.indexOf(';', begin);
    	if(end==-1) end = dc.length;
    	return window.decodeURIComponent?decodeURIComponent(dc.substring(begin + prefix.length, end).replace(/\+/g,' ')):unescape(dc.substring(begin + prefix.length, end).replace(/\+/g,' '));
	},
	deleteCookie : function(name,path){
    	if(this.getCookie(name)){
        	var exp = new Date( new Date().getTime() + (1000 * -10) );
        	document.cookie = name + '=-deleted-' + ((path) ? '; path=' + path : '; path=/') + '; expires=' + exp.toGMTString() + '; domain=zhaopin.com';
    	}
	},
	findElement : function(el,element){
  		newel = el;
  		while(newel.tagName.toLowerCase()!=element && newel.parentNode && newel.tagName.toLowerCase()!='html') newel = newel.parentNode;
  		if(newel.tagName.toLowerCase() == element) return newel;
  		else return false;
	}
}
myAttachEvent(document,'click',zp_specialAD_monitor.setADCookie);
myAttachEvent(window,'load',zp_specialAD_monitor.callImg);
myAttachEvent(window,'load',zp_specialAD_monitor.delADCookie);