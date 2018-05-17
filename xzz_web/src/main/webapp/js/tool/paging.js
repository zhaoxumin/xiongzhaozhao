(function(){
if(!window.PageUtil) {
	var PageUtil = window.PageUtil = {
		pageSearch : function(formId, pageNo) {
			var formObj = $("#" + formId);
			$("#" + formId + "__pagingNo").val(pageNo);
			formObj.submit();
		},

        ajaxPageSearch : function(callback, pageNo) {
            $("#ajax__pagingNo").val(pageNo);
            callback();
        },
		
		jumpPageSearch : function(formId, searchButton) {
			var pageNo = $(searchButton).prev("input").val();
			this.pageSearch(formId, pageNo);
		},
		
		pageSizeChange : function(formId,dom){
			
			BlockWin.block();
			 
			var formObj = $("#" + formId);
			
			$("#" + formId + "__pageSize").val($(dom).val());
			
			$("#" + formId + "__pagingNo").val(1);
		
			formObj.submit();
			
		}
		
	};
}
})();