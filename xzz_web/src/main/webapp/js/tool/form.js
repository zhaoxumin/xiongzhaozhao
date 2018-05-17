/*
 * ajax动态弹出层
 * 
*/
;(function( window, $ ) {
	
	var _common_form = {
		
		//form提交
		submit : function( formId , url ){
			 BlockWin.block();
			 $( "#" + formId ).attr("action",url);
			 $( "#" + formId ).submit();
			 
		}
	}
	 
	window.CommonForm = _common_form;
	
})( window, window[ "jQuery" ] );