/*
 * 表单提交
*/
;(function(window, $){
	
	var params = {
		url : ""
	};
	
	$.fn.extend({
		
		mySubmit : function(paramsJson){
			if(null != paramsJson && "" != paramsJson && typeof paramsJson != "undefinded"){
				$.extend( params ,paramsJson || {} );
				$(this).attr("action",params.url);
			}
			$( this ).submit();
		}
		
	}); 
    
 
})(window, window['jQuery']);