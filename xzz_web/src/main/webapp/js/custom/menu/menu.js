/*
 * 菜单显示
 */
$(function() {
	var active = 0;
	//设置选中的菜单
	$("#accordion > div").each(function(index){
		if($(this).has("a[class=selected]").length>0){
			active = index;
		    return false;
		}
	});
	//取得窗口高度
	var pageHeight = $(window).innerHeight();
	//实例化抽屉菜单
	$( "#accordion" ).accordion({active: active,autoHeight: false , fillSpace: true ,navigation: true});
	$(".ui-accordion-content").css("height",pageHeight*0.6);
	
	//显示菜单，刚开始菜单隐藏，防止菜单样式没有完全生成造成页面抖动严重
	$( "#accordion" ).show();
	$( "#left_menu_context" ).remove();
	 
	//设置窗口改变时执行方法
	$(window).resize(function() {
		$( "#accordion" ).accordion( "resize" );
		$(".ui-accordion-content").css("height",pageHeight*0.6);
	});
});