/*
 * 日历初始化
*/
;(function(window, $){
	
	$.fn.extend({
		
		myDatepicker : function(){
			$( this ).datepicker({
				changeMonth: true,
				changeYear: true
			});
		}
		
	}); 
    
 
})(window, window['jQuery']);