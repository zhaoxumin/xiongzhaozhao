/**
 * 表单提交
 * @return {boolean}
 */
function submitForm(){
    var yyId = $("#yyId option:selected").val();
    if(yyId=="selAll") {
        alert("请选择操作人");
        $("#yyId").focus();
        return false;
    }
    var topLocation = $('input[name="matchListBean.top_location"]:checked').val();
    var url= $("#getMaName").val();
    if(topLocation!=1000){
        if(window.confirm('确定要对该比赛进行置顶操作')){
            $("#form").submit();
        }else{
            return false
        }
    }else{
        $("#form").submit();
    }
};

/**
 * 删除奖品
 */
var rmPrice = function rmPrice(){
    var _this = $(this);
    _this.parent().parent().next().remove();
    _this.parent().parent().remove();
    $(".rmPrice").unbind("click",rmPrice);
    $(".rmPrice").bind("click",rmPrice);
}

/**
 * 添加奖品
 */
var addPrice = function addPrice(){
    var _this = $(this);
    var location = _this.parent().parent().next();
    location.append("<div class='control-group'>"+
                        "<label class='control-label'>奖品名称</label>"+
                        "<div class='controls'>"+
                            "<input type='text' name='priceName' class='input-xlarge'>"+
                            "&nbsp;&nbsp;<a href='#' class='addPrice'>添加</a>"+
                            "&nbsp;&nbsp;<a href='#' class='rmPrice'>删除</a>"+
                        "</div>"+
                    "</div>"+
                    "<div class='control-group'>"+
                        "<label class='control-label'>对应名次</label>"+
                            "<div class='controls' >"+
                            "从<input type='text' name='priceStart' style='width:20px;'/>&nbsp;到&nbsp;"+
                            "<input type='text' name='priceEnd' style='width:20px;'/>"+
                            "<font color='red'>*</font>"+
                        "</div>"+
                    "</div>");
    $(".addPrice").unbind("click",addPrice);
    $(".rmPrice").unbind("click",rmPrice);
    $(".addPrice").bind("click",addPrice);
    $(".rmPrice").bind("click",rmPrice);
};

$(".addPrice").bind("click",addPrice);
$(".rmPrice").bind("click",rmPrice);

var rmOrginal = function rmOrginal(){
    var _this = $(this);
    _this.parent().parent().remove();
    $(".rmOrginal").unbind("click",rmOrginal);
    $(".rmOrginal").bind("click",rmOrginal);
};

var addOrginal = function addOrginal(){
    var _this = $(this);
    var location = _this.parent().parent();
    location.append("<div class='control-group'>"+
                    "<label class='control-label'>歌曲ID:</label>"+
                    "<div class='controls' >"+
                        "<input type='text' name='omIds' style='width:20px;'/>&nbsp;&nbsp;"+
                        "歌曲NAME:<input type='text' name='omNames' style='width:200px;'/>"+
                        "&nbsp;&nbsp;<a href='#' class='addOrginal'>添加</a>"+
                        "&nbsp;&nbsp;<a href='#' class='rmOrginal'>删除</a>"+
                        "</div>"+
                    "</div>");
    $(".addOrginal").unbind("click",addOrginal);
    $(".rmOrginal").unbind("click",rmOrginal);
    $(".addOrginal").bind("click",addOrginal);
    $(".rmOrginal").bind("click",rmOrginal);
};

$(".addOrginal").bind("click",addOrginal);
$(".rmOrginal").bind("click",rmOrginal);