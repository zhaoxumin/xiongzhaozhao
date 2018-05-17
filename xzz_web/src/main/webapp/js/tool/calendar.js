/**
 * @author yanzn
 * @date 2008-08-13
 * @update 2009-02-13 add function clearDate
 */
document.write("<style>");
document.write("#__calendar{margin:0;padding:0;width:100px;}");
document.write("#calendarTable{	margin:0;padding:0;}");
document.write("#calendarTable th,#calendarTable td{margin:0;padding:0px}");
document.write("#calendarTable th ,#calendarTable td{font:12px/20px 'ＭＳ Ｐゴシック', Osaka, verdana, arial, sans-serif;text-align:center;}");
document.write("#calendarTable thead th.week{border-top:1px solid #CCC;border-bottom:1px solid #ccc;background:#EEE;}");
document.write("#calendarTable thead tr.function th{border:1px solid #fff}");
document.write("#calendarTable thead tr.top{letter-spacing:1px;}");
document.write("#calendarTable thead a{color:#000;width:19px;height:18px;text-decoration:none;display:block;border:1px solid #ccc;background:#E1F1FF;}");
document.write("#calendarTable tbody a:hover{color:#990;width:19px;height:18px;text-decoration:none;display:block;border:1px solid #ccc;background:#E1F1FF;}");
document.write("#calendarTable thead a.today{width:98% !important;width:100%}");
document.write("#calendarTable thead a.today:hover{width:98% !important;width:100%}");
document.write("#calendarTable td{width:21px;height:20px;border-bottom:1px solid #E6E6E6;color:#fff;}");
document.write("#calendarTable th{height:21px;}");
document.write("#calendarTable tr.com{background:#fff;}");
document.write("#calendarTable tr.cur{background:#F0FAFF;}");
document.write("#calendarTable tbody a{color:#000;width:19px;height:18px;text-decoration:none;display:block;border:1px solid #fff;}");
document.write("#calendarTable tbody a:hover{color:#990;width:19px;height:18px;text-decoration:none;border:1px solid #E6E6E6;background:#E1F1FF;display:block;}");
document.write("#calendarTable tbody a.today{color:#c00;border:1px solid #DBDBDB;background:#CCE4FF;}");
document.write("#calendarTable tbody a.today:hover{color:#990;border:1px solid #DBDBDB;background:#CCE4FF;}");
document.write("#calendarTable tbody a.week{color:#c00;}");
document.write("</style>");
document.write("<div id='__calendar' style='position:absolute;display:none;background:#fff;z-index:100;'></div><iframe id='divShim' src='javascript:false' scrolling='no' frameborder='0' style='position:absolute; top:0px; left:0px; display:none;'></iframe>");
document.write("<table style=\"width:100px;background: white\" cellspacing=\"0\" cellpadding=\"0\" id=\"calendarTable\"><thead><tr class=\"top\"><th>&nbsp;</th><th colspan=\"5\" id=\"sohwdate\"></th><th><a href=\"javascript:void(0);\" title=\"close\" onclick=\"shut()\">×</a></th></tr><tr class=\"function\"><th><a href=\"javascript:void(0);\" title=\"前年へ\" onclick=\"preYear()\">&lt;&lt;</a></th><th><a href=\"javascript:void(0);\" title=\"前月へ\" onclick=\"preMonth()\">&lt;</a></th><th colspan=\"3\"><a href=\"javascript:void(0);\" class=\"today\" title=\"今日\" onclick=\"getDate('0')\">今日</a></th><th><a href=\"javascript:void(0);\" title=\"翌月へ\" onclick=\"nextMonth()\">&gt;</a></th><th><a href=\"javascript:void(0);\" title=\"翌年へ\" onclick=\"nextYear()\">&gt;&gt;</a></th></tr><tr class=\"function\"><th colspan=\"7\"><a onclick=\"clearDate();\" title=\"日付入力をクリアする\" class=\"today\" href=\"javascript:void(0);\">日付入力をクリアする</a></th></tr><tr><th class=\"week\">日</th><th class=\"week\">月</th><th class=\"week\">火</th><th class=\"week\">水</th><th class=\"week\">木</th><th class=\"week\">金</th><th class=\"week\">土</th></thead><tbody id=\"calendarTbody\"></tbody></table>");
var calFormat;
var yearText;
var monthText;
var dayText;
var objouter;
var objInput;
var IfrRef;
var isShow = true;
objouter=document.getElementById("__calendar"); 
var calendarTable = document.getElementById("calendarTable");
objouter.appendChild(calendarTable);
function setday(obj, format){
	objInput = document.getElementById(obj);;
	IfrRef = document.getElementById('divShim');
	writeDate();
	sohwDate();
	objouter.style.top = (getAbsoluteHeight(objInput)/1 + getAbsoluteTop(objInput)/1)+"px";
	objouter.style.left =getAbsoluteLeft(objInput)/1 + "px";
	objouter.style.display = "block";
	
	IfrRef.style.width = 157;
	IfrRef.style.height = 183;
	IfrRef.style.top = objouter.style.top;
	IfrRef.style.left = objouter.style.left;
	IfrRef.style.zIndex = objouter.style.zIndex - 1;
	IfrRef.style.display = "block";
	calFormat = format;
	//objInput=document.getElementById(input);
	}
function getAbsoluteHeight(ob){return ob.offsetHeight;}
function getAbsoluteWidth(ob){return ob.offsetWidth;}
function getAbsoluteLeft(ob){var s_el=0;el=ob;while(el){s_el=s_el+el.offsetLeft;el=el.offsetParent;}; return s_el}
function getAbsoluteTop(ob){var s_el=0;el=ob;while(el){s_el=s_el+el.offsetTop ;el=el.offsetParent;}; return s_el}
var daysInMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31); 
var toDay = new Date();
var tempYear = toDay.getFullYear();
var tempMonth = toDay.getMonth();
var tbody = document.getElementById("calendarTbody"); 
var sohwId = document.getElementById("sohwdate");
function getDays(month, year)
{ 	
	if (1 == month) return ((0 == year % 4) && (0 != (year % 100))) || (0 == year % 400) ? 29 : 28; 
	else return daysInMonth[month]; 
} 
function writeDate() { 	
	var curCal = new Date(tempYear,tempMonth ,1);
	var startDay = curCal.getDay();
	var daily = 0;
	var	today = toDay.getDate();
	if(tempYear != toDay.getFullYear() || tempMonth != toDay.getMonth()) today = -1;
	var todayStyle = "";
	var weekEndStyle = "";
	clear();
	var intDaysInMonth =getDays(curCal.getMonth(), curCal.getFullYear());
	var weeks = (intDaysInMonth + startDay) % 7 == 0 ? (intDaysInMonth + startDay) / 7 : parseInt((intDaysInMonth + startDay ) / 7) + 1;	
	for (var intWeek = 1; intWeek <= weeks; intWeek++){ 
		var tr = document.createElement("tr");
		tr.setAttribute("onmouseover","javascript:this.className='cur'");		
		tr.setAttribute("onmouseout","javascript:this.className='com'");
		tr.onmouseover = function (){this.className = "cur";}
		tr.onmouseout = function (){this.className = "com";}
		for (var intDay = 0;intDay < 7;intDay++){			
			var td = document.createElement("td");
			if ((intDay == startDay) && (0 == daily)) 
				daily = 1; 
				
			if(today == daily) 	todayStyle="today";
			
			if (intDay == 6 || intDay == 0) weekEndStyle = "week" ;
			
			if ((daily > 0) && (daily <= intDaysInMonth)) 
			{ 
				td.innerHTML = "<a href=\"javascript:void(0);\" class=\""+ weekEndStyle + todayStyle +"\" onclick=\"getDate('"+daily+"')\" title=\""+eval(tempMonth+1)+"月"+daily+"日\">" + daily + "</a>";
				todayStyle = "";
				weekEndStyle = "";
				daily++; 
			}else{ 
				td.innerHTML = "&nbsp;"; 
				todayStyle = "";
				weekEndStyle = "";
			}			
			tr.appendChild(td);			
		}
		tbody.appendChild(tr);
	} 
}
function getDate(day){
	var year , month ,date;
	if(day == "0"){
		year = toDay.getFullYear();
		month = eval(toDay.getMonth()+1) < 10 ? "0"+eval(toDay.getMonth()+1) : eval(toDay.getMonth()+1);
		date = toDay.getDate() < 10 ? "0"+toDay.getDate() : toDay.getDate();
	}else{
		year = tempYear;
		month = eval(tempMonth+1) < 10 ? "0"+eval(tempMonth+1) : eval(tempMonth+1);
		date = day < 10 ? "0"+day : day;		
	}
	
	// format time
	var time;
	if(calFormat){
		time = fomateDate(year, month, date);
	}
	// defult time formatter
	else{
		time = year + "-" + month +"-"+ date;
	}
	objInput.value = time;
	
	//yearText.value=year;
	//monthText.value=month;
	//dayText.value=date;

	close();
}

function fomateDate(year, month, date)
{  
	var sFomate = calFormat;
	sFomate = sFomate.replace('YYYY', year); 
	sFomate = sFomate.replace('MM', month)  
	sFomate = sFomate.replace('DD', date);
  	return sFomate;
}

function sohwDate(){
	sohwId.innerHTML = tempYear + "年" + eval(tempMonth+1) +"月";
}
function preYear(){
	isShow = false;
	if(tempYear > 999 && tempYear < 10000){
		tempYear--;
	}else{
		//alert("（1000-9999）！");
	}
	sohwDate();
	writeDate();
}
function nextYear(){
	isShow = false;
	if(tempYear > 999 && tempYear < 10000){
		tempYear++;
	}else{
		//alert("（1000-9999）！");
	}
	sohwDate();
	writeDate();
}
function preMonth(){
	isShow = false;
	if(tempMonth >= 1){tempMonth--}else{tempYear--;tempMonth = 11;}
	sohwDate();
	writeDate();
}
function nextMonth(){
	isShow = false;
	if(tempMonth == 11){tempYear++;tempMonth = 0}else{tempMonth++}
	sohwDate();
	writeDate();
}
function clear(){
	var nodes = tbody.childNodes;
	var nodesNum = nodes.length; 
	for(var i=nodesNum-1;i>=0;i--) { 
		tbody.removeChild(nodes[i]); 
	}
}
function shut(){
	close();
}
function close(){
	tempYear = toDay.getFullYear();
	tempMonth = toDay.getMonth();
	objouter.style.display = "none"
	objouter.style.top = 0;
	objouter.style.left = 0;
	IfrRef.style.display = "none";
	IfrRef.style.top = 0;
	IfrRef.style.left = 0;
}
function vent(event){
	if(document.all){
		if(isShow){
			if (window.event.srcElement != objouter && window.event.srcElement == '') close();
			isShow = true;
			return;
		}
		isShow = true;		
	}else{
		if(isShow){
			if(event.target != objouter && event.target == '' ) close();
			isShow = true;
		}
		isShow = true;
	}
}
function clearDate(){
	objInput.value='';
	shut();
}
//news :2009-04-14
function newsClearDate(){
	objInput.value='';
	shut();
}

document.onclick = vent;