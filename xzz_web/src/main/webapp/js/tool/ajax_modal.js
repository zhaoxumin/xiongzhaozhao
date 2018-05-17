/*
 * ajax动态弹出层
 * 
*/
;(function( window, $ ) {
	
	var _ajax_modal = {
		
		//打开modal
		openModal : function( targetDivId , url , isModal, dataArray){
			$.ajax({
			   type: "POST",
			   url: url,
			   data: dataArray,
			   dataType:"html",
			   success: function(html){
			      $( "#" + targetDivId ).empty().append(html);
                  if (isModal) {

                      $( '#' + targetDivId ).modal({
                          keyboard: false
                      })
                  }
			   }
			 });
		}
	}
	 
	window.AjaxModal = _ajax_modal;
	
})( window, window[ "jQuery" ] );