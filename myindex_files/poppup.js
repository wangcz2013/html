//window.open("http://jobseeker.zhaopin.com/zhaopin/watting/info.html","","top=0,left=0,width=380,height=350,scrollbars=no");
window.onbeforeunload = unloadPromt;
function unloadPromt(){
	if ((event.clientX>document.body.clientWidth && event.clientY<0||event.altKey)&&(window.history.length<1))
{
	window.open("http://cnt.zhaopin.com/Market/whole_counter.jsp?sid=121111261&site=zphome_flash&url=http://images.zhaopin.com/zhaopin/denglu/index.htm","zppromt","width=760,height=480,top="+(window.screen.Height-700)/2+",left="+(window.screen.width-760)/2+",scrollbars=no,toolbar=no,menubar=no,resizable=yes,location=no,status=no,hotkeys=no");
}
}

