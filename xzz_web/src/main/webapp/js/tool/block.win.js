

(function(window, $){
	
	 var Block = {
		
		_default : {
			css : {
			border: 'none',
			background: 'none' }
		},
		
		init : {},
		
	    block : function (){
			$.blockUI( $.extend( BlockWin._default
			,BlockWin.init || {} 
			));
		},
	    
		unBlock : function (){
			$.unblockUI();
		}
	 	
	 };
	 
     window.BlockWin = Block;
 
})(window, window['jQuery']);
