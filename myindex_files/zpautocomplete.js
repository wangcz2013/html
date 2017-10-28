
//obj:绑定的对像
//ktype:1:全文，2：公司名，3：职位名，5：城市
//position:up:向上显示，down:向下显示
 zpAutocomplete = function (obj,ktype,position,charset) {

    if (ktype == "") {
        ktype = 1;
    }
	if(position=="up")
	{
		position={
			my: "left bottom",
			at: "left top",
			collision: "none"
		};
	}else{	
		position={
			my: "left top",
			at: "left bottom",
			collision: "none"
		};
	}
    $(obj).autocomplete({
		position:position,
        source: function (request, response) {
            var hotType='';
            if (ktype != 2) {
                if(ktype == 6){
                    hotType=6;
                }
                if (ktype == "1" || ktype == "") {
                    hotType=4;
                }
                if(ktype != 5 && ktype != 6){
                    hotType=4;
                }
                $.ajax({
                    url: "//smart.zhaopin.com/hotword/jsonp",
                    type:'get',
                    dataType: "jsonp",
                    jsonp: "callback",
                    data: {
                        'client':'edm',
                        'ip':'127.0.0.1',
                        'S_HOT_FULL': request.term,
                        'S_HOT_TYPE':hotType,
                        'rows':10,
                        'format':'small',
                        'sort':'rows'
                    },
                    success: function (data) {
                        response($.map(data.results, function (item) {
                            if (item.word.toLowerCase() !== request.term.toLowerCase()) {
                                return {
                                    label: item.word,
                                    value: item.word
                                }
                            }
                        }));

                    }
                });
            } else {
                return;
            }
        },

        minLength: 0,
        select: function (event, ui) {
            //$("#KeyWord_kw2").val(this.value);
            //  zlzp.searchjob.gotoSearch_t();
        },
        open: function () {
            if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {
                $(".ui-autocomplete").width($(this).innerWidth());
            }
            $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
        },
        close: function () {
            $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
        }
    });

}
$(function(){
    var rdimHtml='<div style="top: 485px; position: fixed; right: 50%; margin-right: -560px; cursor:pointer" onclick="window.open(\'//img00.zhaopin.cn/2014/common/html/rdimpop.html\', \'_blank\', \'width=702,height=702,left=100,top=60,scrollbars=0,overflow=auto,status=0\');"><img src="//img03.zhaopin.cn/2012/img/rdimpic.png"></div>';
    $(rdimHtml).appendTo("body");
})
