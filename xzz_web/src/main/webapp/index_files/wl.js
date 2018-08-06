(function($){var escapeable=/["\\\x00-\x1f\x7f-\x9f]/g,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};$.toJSON=typeof JSON==="object"&&JSON.stringify?JSON.stringify:function(o){if(o===null){return"null"}var type=typeof o;if(type==="undefined"){return undefined}if(type==="number"||type==="boolean"){return""+o}if(type==="string"){return $.quoteString(o)}if(type==="object"){if(typeof o.toJSON==="function"){return $.toJSON(o.toJSON())}if(o.constructor===Date){var month=o.getUTCMonth()+1,day=o.getUTCDate(),year=o.getUTCFullYear(),hours=o.getUTCHours(),minutes=o.getUTCMinutes(),seconds=o.getUTCSeconds(),milli=o.getUTCMilliseconds();if(month<10){month="0"+month}if(day<10){day="0"+day}if(hours<10){hours="0"+hours}if(minutes<10){minutes="0"+minutes}if(seconds<10){seconds="0"+seconds}if(milli<100){milli="0"+milli}if(milli<10){milli="0"+milli}return'"'+year+"-"+month+"-"+day+"T"+hours+":"+minutes+":"+seconds+"."+milli+'Z"'}if(o.constructor===Array){var ret=[];for(var i=0;i<o.length;i++){ret.push($.toJSON(o[i])||"null")}return"["+ret.join(",")+"]"}var name,val,pairs=[];for(var k in o){type=typeof k;if(type==="number"){name='"'+k+'"'}else{if(type==="string"){name=$.quoteString(k)}else{continue}}type=typeof o[k];if(type==="function"||type==="undefined"){continue}val=$.toJSON(o[k]);pairs.push(name+":"+val)}return"{"+pairs.join(",")+"}"}};$.evalJSON=typeof JSON==="object"&&JSON.parse?JSON.parse:function(src){return eval("("+src+")")};$.secureEvalJSON=typeof JSON==="object"&&JSON.parse?JSON.parse:function(src){var filtered=src.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"");if(/^[\],:{}\s]*$/.test(filtered)){return eval("("+src+")")}else{throw new SyntaxError("Error parsing JSON, source is not valid.")}};$.quoteString=function(string){if(string.match(escapeable)){return'"'+string.replace(escapeable,function(a){var c=meta[a];if(typeof c==="string"){return c}c=a.charCodeAt();return"\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16)})+'"'}return'"'+string+'"'}})(jQuery);function setCookieMills(a,b,d){var c=new Date();c.setTime(c.getTime()+d);document.cookie=a+"="+escape(b)+";expires="+c.toGMTString()+";path=/;domain=360buy.com"}function getCookie(b){var a=document.cookie.match(new RegExp("(^| )"+b+"=([^;]*)(;|$)"));if(a!=null){return unescape(a[2])}return null}function deleteCookie(a){var b=getCookie(a);if(b!=null){setCookieMills(a,"",-1)}}function seClick(b,d,f){var a="seWids"+b;var c=getCookie(a);if(c!=null){var e=c.toString().indexOf(f);if(e<0){c=c+","+f}}else{c=f}setCookieMills(a,c,86400000);log(2,2,d,f)}function appendJSONCookie(cookieName,key,wid,Mills){var ns=eval("("+getCookie(cookieName)+")");if(ns==null||ns==""){ns=new Object()}if(ns[key]==null){ns[key]=""}var pos=ns[key].indexOf(wid);if(pos<0){ns[key]=ns[key]+","+wid}setCookieMills(cookieName,$.toJSON(ns),Mills)}function reBook(b,f,a){var e="_rtbook";var c=f.toString().split("#")[0];appendJSONCookie(e,b,c,86400000);log(3,b,c,a)}function fe(a,b,c){log("f",a,b,c)}function reClick2012(a,e,b){var d="reHome2012";var c=e.toString().split("#")[0];appendJSONCookie(d,a,c,86400000);log(3,a,c,b)}function reClickCube(e,b){var a="_rdCube";appendJSONCookie(a,"p"+e,b,86400000)}function getHashCode(d){var c=1315423911,a,b;for(a=d.length-1;a>=0;a--){b=d.charCodeAt(a);c^=((c<<5)+b+(c>>2))}return(c&2147483647)}function mark(b,a){log(1,a,b)}document.onclick=function funClick(c){c=c||event;var n=document;var p=c.srcElement||c.target;var f=$(p).attr("clstag");var h=c.clientX+(n.body.scrollLeft||n.documentElement.scrollLeft),g=c.clientY+(n.body.scrollTop||n.documentElement.scrollTop),o=n.body.clientWidth,l=n.body.clientHeight;while(!f){p=p.parentNode;if(!p){break}if(p.nodeName=="BODY"){break}f=$(p).attr("clstag")}if(f){var b=f.split("|"),a=b[1],i=b[2],m=b[3];switch(a){case"keycount":log(i,m,"Q",h+"x"+g,o+"x"+l);break}}};var SucInfoMethod={Init:function(){this.orderDetailMap=new HashMap();this.rSM=new HashMap();var b=SucInfo_OrderDetail.split(",");for(var c=0;c<b.length;c++){var a=b[c].split(":");this.orderDetailMap.Set(a[0],a[1]);this.sku=a[0]}},GetSkuNum:function(a){return this.orderDetailMap.Get(a)},Contains:function(a){return this.orderDetailMap.Contains(a)},GetDefaultSku:function(){return this.sku},ARS:function(a){this.rSM.Set(a,0)},RSContains:function(a){if(this.rSM.Contains(a)){return 1}else{return 0}}};function RecommendTrans(recName,tag,logtype){var cookieNames=recName.split(",");for(var i=0;i<cookieNames.length;i++){var recCookies=eval("("+getCookie(cookieNames[i])+")");for(var k in recCookies){if(recCookies[k]!=""){if(k=="cai2012"){loginfo(recCookies[k],k.toString(),"R",logtype)}else{loginfo(recCookies[k],k.toString(),tag,logtype)}}}}}function simpleMold(d,a,g,f,b){for(var e=0;e<d.length;e++){var c=getCookie(g+d[e]);if(c!=null&&c!=""){loginfo(c,d[e],a,f,b)}}}function complexMold(cookieArrary,tag,prefix,logtype,flag){for(var i=0;i<cookieArrary.length;i++){var items=eval("("+getCookie(prefix+cookieArrary[i])+")");if(items!=null){for(var k in items){if(items[k]!=""){loginfo(items[k],k.toString(),tag,logtype,flag)}}}}}function loginfo(k,j,a,e,h){var g=k.split(",");var c=SucInfo_OrderId,f=SucInfo_OrderType,b=SucInfo_OrderDetail;for(var d=0;d<g.length;d++){if(g[d].length>0){var l=g[d].toString().split("#")[0];if(SucInfoMethod.Contains(l)){if(h){log(e,a,j.concat(".o"),c,f,b,l+":"+SucInfoMethod.GetSkuNum(l));log("4","R"+j.concat(".o"),c,f,b,l,SucInfoMethod.GetSkuNum(l))}else{log(e,a+j,c,f,b,l,SucInfoMethod.GetSkuNum(l))}}}}}function isChecked(a){if((a.indexOf("succeed_",0)>=0)||(a.indexOf("getsuccessorder.action",0)>=0)||(a.indexOf("bankchoose_",0)>=0)){return true}return false}function funLoad(){var d="Club,ThirdRec,AttRec,OCRec,SORec,EBRec,BookSpecial,BookTrack,BookHis,Coupon,GlobalTrack,GlobalHis,History,historyreco_s,historyreco_c";var c=this.location.pathname.toLowerCase();var b=getCookie("pin");if(b!=null&&b.length>0){setCookieMills("rpin",b,259200000)}if(isChecked(c)){SucInfoMethod.Init();var g=getCookie("_distM");if(g!=null&&g==SucInfo_OrderId){return true}var e="1:2:3:4:5:1a:1b:BR1:BR2:BR3:BR4:BR5:DDR:GR1:GR2:GR3:GR4:VR1:VR2:VR3:VR4:VR5:NR:CR1:CR2:CR3:SR1:SR2:SR3:SR4:Indiv&Simi:Indiv&OthC:Indiv&AllC:Zd";var n=e.split(":");simpleMold(n,"R","reWids","4");var m=["p000","p100","np000","np100"];for(var h=0;h<m.length;h++){var j=getCookie(m[h]);if(j!=null&&j!=""){log("HomePageOrder",m[h])}}RecommendTrans("reHome2012,_rtbook","N","4");var f=d.split(",");complexMold(f,"R","reWids","4");var k=["v","TrackRec","TrackHis","Zd","Tc","g","b","BookSpecial","BookTrack","BookHis","GlobalTrack","GlobalHis","History","Hiss","Hisc"];complexMold(k,"o","rod","d",true);var a=["_rdCube"];complexMold(a,"Cube","","4");var l=["SEO"];simpleMold(l,"S","seWids","4");log("7","2",SucInfo_OrderId,SucInfo_OrderType,SucInfo_OrderDetail);setCookieMills("_distM",SucInfo_OrderId,86400000)}}function Clublog(){var b=this.location.pathname.toLowerCase();var a=this.location.hostname.toLowerCase();if((b.indexOf("shoppingcart",0)>=0)||(b.indexOf("/cart.html",0)>=0)){log("R2&Page","Show")}else{if(b.indexOf("user_home",0)>=0){log("R3&Page","Show")}else{if((b.indexOf("initcart.aspx",0)>=0)||(b.indexOf("initcart.html",0)>=0)){log("R4R5&Page","Show")}else{if((b.indexOf("orderlist.aspx",0)>=0)||(b.indexOf("normal/list.action",0)>=0)){log("DDR&Page","Show")}else{if(a=="home.360buy.com"){if(b=="/"){log("R3&Page","Show")}}else{if(a=="i.360buy.com"){if(b=="/core/info"){log("i","userinfo")}else{if(b=="/core/userinfo/more.html"){log("i","userinfomore")}}}else{if(a.indexOf("t.360buy.com",0)==0){if(b=="/"){log("t","homepage")}else{if(/^\/[0-9]*$/.test(b)){log("t","individual")}else{if(b=="/profile"){log("t","profile")}else{if(b.indexOf("/search/",0)==0){log("t","search")}else{if(b=="/favorite"){log("t","favorite")}else{if(b.indexOf("/follow/",0)==0){log("t","follow")}else{if(b.indexOf("/fans/",0)==0){log("t","fans")}else{if(b.indexOf("/blacklist/",0)==0){log("t","blacklist")}else{if(b=="/reply"){log("t","reply")}else{if(b=="/promotional"){log("t","promotional")}else{if(b=="/home/follow/feed"){log("t","homefollowfeed")}else{if(b=="/home/follow"){log("t","homefollow")}}}}}}}}}}}}}}}}}}}}(function(){function HashMap(){this.values=new Object()}HashMap.prototype.Set=function(key,value){this.values[key]=value};HashMap.prototype.Get=function(key){return this.values[key]};HashMap.prototype.Contains=function(key){return this.values.hasOwnProperty(key)};HashMap.prototype.Remove=function(key){delete this.values[key]};function SortedHashMap(IComparer,IGetKey){this.IComparer=IComparer;this.IGetKey=IGetKey;this.a=new Array();this.h=new HashMap()}SortedHashMap.prototype.Add=function(key,value){if(this.ContainsKey(key)){this.Remove(key)}this.a.push(value);this.a.sort(this.IComparer);for(var i=0;i<this.a.length;i++){var key=this.IGetKey(this.a[i]);this.h.Set(key,i)}};SortedHashMap.prototype.Insert=function(value,maxlength){if(this.a.length>=maxlength){this.a.splice(maxlength-1,1)}this.a.unshift(value)};SortedHashMap.prototype.Get=function(key){return this.a[this.h.Get(key)]};SortedHashMap.prototype.Count=function(){return this.a.length};SortedHashMap.prototype.Remove=function(key){if(!this.h.Contains(key)){return}var index=this.h.Get(key);this.a.splice(index,1);this.h.Remove(key)};SortedHashMap.prototype.ContainsKey=function(key){return this.h.Contains(key)};SortedHashMap.prototype.Clear=function(){this.a=new Array();this.h=new HashMap()};SortedHashMap.prototype.GetJson=function(){return $.toJSON(this.a)};function ThirdType(thirdType,sku,value){this.t=thirdType;this.v=5;this.s=0;if(arguments.length>1){this.s=sku}if(arguments.length>2){this.v=value}}ThirdType.prototype.Increase=function(){this.v=this.v+2};ThirdType.prototype.Decrease=function(){this.v=this.v-1};ThirdType.prototype.SetSku=function(sku){this.s=sku};function viewrecord(t,s){this.t=t;this.s=s}function viewsort(t,s){this.t=t;this.s=s;this.v=5}Ttracker={IComparer:function(a,b){return b.v-a.v},IGetKey:function(a){return a.t},isbook:function(id){return id>10000000&&id<20000000},trace:function(){var crumb=$(".breadcrumb a");var crumbIndex=2;if(crumb.length==0){crumb=$(".crumb a");crumbIndex=3}if(crumb.length<4){return}var thref=$(crumb[crumbIndex]).attr("href");if(thref==""||thref==undefined){return}var tb=thref.lastIndexOf("/"),te=thref.lastIndexOf("."),tts=thref.substring(tb+1,te);var ttss=tts.split("-");var tt=ttss.length==3?ttss[2]:ttss[0];var ttx=Number(tt);if(ttx.toString()=="NaN"||ttx==0){return}var wid=$("#name").attr("PshowSkuid")||(pageConfig?(pageConfig.product?pageConfig.product.skuid:0):0);this.view(ttx,wid);this.viewtypewid(tt,wid)},viewtypewid:function(t,s){var nview=new ThirdType(t,s);var sortmap=new SortedHashMap(this.IComparer,this.IGetKey);var maps=Ttracker.util.Vv("typewid");if(maps){try{var maplist=eval("("+maps+")");for(var i=0;i<maplist.length;i++){var vrate=maplist[i];if(vrate.t!=t){vrate.v-=1}sortmap.Add(vrate.t,vrate)}}catch(e){Ttracker.util.Wv("typewid","",-63072000000)}}if(!sortmap.ContainsKey(t)){sortmap.Add(t,nview)}else{var curtt=sortmap.Get(t);curtt.s=s===""?curtt.s:s;curtt.v+=2}if(sortmap.Count()>8){var del=sortmap.a[sortmap.Count()-1];sortmap.Remove(del.t)}Ttracker.util.Wv("typewid",sortmap.GetJson(),63072000000)},viewhisotry:function(t,s,cname){var nview=new viewrecord(t,s);var bookmap=new SortedHashMap(this.IComparer,this.IGetKey);var bview=Ttracker.util.Vv(cname);if(bview!=undefined){var bviews=eval("("+bview+")");if(bviews.length>0&&bviews[0].d!=undefined){Ttracker.util.Wv(cname,"",-63072000000)}else{for(var i=bviews.length-1;i>=0;i--){bookmap.Insert(bviews[i],8)}}}bookmap.Insert(nview,8);Ttracker.util.Wv(cname,bookmap.GetJson(),63072000000)},viewrate:function(t,s,cname){var nview=new viewsort(t,s);var sitesortmap=new SortedHashMap(this.IComparer,this.IGetKey);var maps=Ttracker.util.Vv(cname);if(maps){try{var maplist=eval("("+maps+")");if(maplist.length>0&&maplist[0].d!=undefined){Ttracker.util.Wv(cname,"",-63072000000)}else{for(var i=0;i<maplist.length;i++){var vrate=maplist[i];if(vrate.t!=t){vrate.v-=1}sitesortmap.Add(vrate.t,vrate)}}}catch(e){Ttracker.util.Wv(cname,"",-63072000000)}}if(!sitesortmap.ContainsKey(t)){sitesortmap.Add(t,nview)}else{var curtt=sitesortmap.Get(t);curtt.s=s===0?curtt.s:s;curtt.v+=2}if(sitesortmap.Count()>8){var del=sitesortmap.a[sitesortmap.Count()-1];sitesortmap.Remove(del.t)}Ttracker.util.Wv(cname,sitesortmap.GetJson(),63072000000)},view:function(t,s){s=Number(s);if(this.isbook(s)){this.viewhisotry(t,s,"bview");this.viewrate(t,s,"btw")}s&&this.viewhisotry(t,s,"aview");this.viewrate(t,s,"atw")}};Ttracker.util={Wv:function(n,v,t){n=n+"="+v+"; path=/; ";t&&(n+="expires="+(new Date((new Date).getTime()+t)).toGMTString()+"; ");n+="domain=.360buy.com;";document.cookie=n},Vv:function(n){for(var b=[],c=document.cookie.split(";"),n=RegExp("^\\s*"+n+"=\\s*(.*?)\\s*$"),d=0;d<c.length;d++){var e=c[d]["match"](n);e&&b.push(e[1])}return b[0]}};Ttracker.trace()})();(function(){var ab=window,al=document,az=escape,R=void 0,N="push",F="join",J="split",Q="length",w="indexOf",m="prototype",H="toLowerCase";var r={};r.util={getParameter:function(p,l){var s=new RegExp("(?:^|&|[?]|[/])"+l+"=([^&]*)");var g=s.exec(p);return g?az(g[1]):""},Wv:function(s,g,p,l){s=s+"="+g+"; path=/; ";l&&(s+="expires="+(new Date((new Date).getTime()+l)).toGMTString()+"; ");p&&(s+="domain="+p+";");al.cookie=s},Vv:function(y){for(var g=[],t=al.cookie[J](";"),l=RegExp("^\\s*"+y+"=\\s*(.*?)\\s*$"),s=0;s<t[Q];s++){var p=t[s]["match"](l);p&&g[N](p[1])}return g}};var aE=0;function ag(g){return(g?"_":"")+aE++}var ai=ag(),ac=ag(),af=ag(),I=ag(),d=ag(),aG=ag(),V=ag(),am=ag(),ad=ag(),ah=ag(),aw=ag(),av=ag(),aC=ag(),aL=ag(),Y=ag(),T=ag(),B=ag(),x=ag(),M=ag(),ay=ag(),n=ag(),A=ag(),i=ag(),a=ag(),aJ=ag(),au=ag(),P=ag(),aH=ag(),e=ag(),ar=ag(),c=ag(),an=ag(),aP=ag(),b=ag();var aK=function(){var p={};this.set=function(t,s){p[t]=s},this.get=function(s){return p[s]!==R?p[s]:null},this.m=function(t){var s=this.get(t);var C=s==R||s===""?0:1*s;p[t]=C+1};this.set(ai,"UA-J2011-1");this.set(I,".360buy.com");this.set(af,k());this.set(d,Math.round((new Date).getTime()/1000));this.set(aG,63072000000);this.set(V,15768000000);this.set(am,1800000);this.set(aL,S());var g=Z();this.set(Y,g.name);this.set(T,g.version);this.set(B,G());var l=aF();this.set(x,l.D);this.set(M,l.C);this.set(ay,l.language);this.set(n,l.javaEnabled);this.set(A,l.characterSet);this.set(aH,ak);this.set(aP,new Date().getTime())};var ak="baidu:wd,baidu:word,so.360.cn:q,360so.com:q,360sou.com:q,baidu:q1,m.baidu:word,m.baidu:w,google:q,soso:w,sogou:query,youdao:q,ucweb:keyword,ucweb:word,114so:kw,yahoo:p,yahoo:q,live:q,msn:q,bing:q,aol:query,aol:q,daum:q,eniro:search_word,naver:query,pchome:q,images.google:q,lycos:query,ask:q,netscape:query,cnn:query,about:terms,mamma:q,voila:rdata,virgilio:qs,alice:qs,yandex:text,najdi:q,seznam:q,search:q,wp:szukaj,onet:qt,szukacz:q,yam:k,kvasir:q,ozu:q,terra:query,rambler:query".split(","),aO=function(){return Math.round((new Date).getTime()/1000)},v=function(){return Math.round(Math.random()*2147483647)},X=function(){return v()^aj()&2147483647},k=function(){return U(al.domain)},aF=function(){var l={},g=ab.navigator,p=ab.screen;l.D=p?p.width+"x"+p.height:"-";l.C=p?p.colorDepth+"-bit":"-";l.language=(g&&(g.language||g.browserLanguage)||"-")[H]();l.javaEnabled=g&&g.javaEnabled()?1:0;l.characterSet=al.characterSet||al.charset||"-";return l},S=function(){var l,C,y,t;y="ShockwaveFlash";if((l=(l=window.navigator)?l.plugins:R)&&l[Q]>0){for(C=0;C<l[Q]&&!t;C++){y=l[C],y.name[w]("Shockwave Flash")>-1&&(t=y.description[J]("Shockwave Flash ")[1])}}else{y=y+"."+y;try{C=new ActiveXObject(y+".7"),t=C.GetVariable("$version")}catch(s){}if(!t){try{C=new ActiveXObject(y+".6"),t="WIN 6,0,21,0",C.AllowScriptAccess="always",t=C.GetVariable("$version")}catch(p){}}if(!t){try{C=new ActiveXObject(y),t=C.GetVariable("$version")}catch(g){}}t&&(t=t[J](" ")[1][J](","),t=t[0]+"."+t[1]+" r"+t[2])}l=t?t:"-";return l},ao=function(g){return R==g||"-"==g||""==g},U=function(l){var g=1,s=0,p;if(!ao(l)){g=0;for(p=l[Q]-1;p>=0;p--){s=l.charCodeAt(p),g=(g<<6&268435455)+s+(s<<14),s=g&266338304,g=s!=0?g^s>>21:g}}return g},aj=function(){var p=aF();for(var l=p,g=ab.navigator,l=g.appName+g.version+l.language+g.platform+g.userAgent+l.javaEnabled+l.D+l.C+(al.cookie?al.cookie:"")+(al.referrer?al.referrer:""),g=l.length,s=ab.history.length;s>0;){l+=s--^g++}return U(l)},Z=function(){var g={name:"other",version:"0"},s=navigator.userAgent.toLowerCase();browserRegExp={se360:/360se/,se360_2x:/qihu/,ie:/msie[ ]([\w.]+)/,firefox:/firefox[|\/]([\w.]+)/,chrome:/chrome[|\/]([\w.]+)/,safari:/version[|\/]([\w.]+)[ ]safari/,opera:/opera[|\/]([\w.]+)/};for(var p in browserRegExp){var l=browserRegExp[p].exec(s);if(l){g.name=p;g.version=l[1]||"0";break}}return g},G=function(){var g=/(win|android|linux|nokia|ipad|iphone|ipod|mac|sunos|solaris)/.exec(navigator.platform.toLowerCase());return g==null?"other":g[0]},aD=function(){var p="",y=["jwotest_product","jwotest_list","jwotest_cart","jwotest_orderinfo","jwotest_homepage","jwotest_other1","jwotest_other2","jwotest_other3"];for(var t=0,g=y.length;t<g;t++){var s=r.util.Vv(y[t]);if(s[Q]==0){continue}var C=unescape(s[0]).match(/=(.*?)&/gi),l=[];if(C==null){continue}$.each(C,function(K,D){l.push(K==0?"T"+D.substring(1,D.length-1):D.substring(1,D.length-1))});p+=l[F]("-")+";"}return p},aB=function(l){l.set(ad,al.location.hostname);l.set(ah,al.title);l.set(aw,al.location.pathname);l.set(av,al.referrer);l.set(aC,al.location.href);var C=r.util.Vv("__jda"),s=C[Q]>0?C[0][J]("."):null;l.set(ac,s?s[1]:X());l.set(i,s?s[2]:l.get(d));l.set(a,s?s[3]:l.get(d));l.set(aJ,s?s[4]:l.get(d));l.set(au,s?s[5]:1);var t=r.util.Vv("__jdv"),g=t[Q]>0?t[0][J]("|"):null;l.set(e,g?g[1]:"direct");l.set(ar,g?g[2]:"-");l.set(c,g?g[3]:"none");l.set(an,g?g[4]:"-");var y=r.util.Vv("__jdb"),p=y[Q]>0?y[0][J]("."):null;l.set(P,p?p[1]:0);l.set(b,aD()||"-");return !0},aA=function(aX){var s=al.location.href,C=al.referrer,aU=al.domain,y=r.util.getParameter(s,"utm_source"),t=[],W=aX.get(e),O=aX.get(ar),L=aX.get(c),D=aX.get(an),g=r.util.Vv("__jdb")[Q]==0;if(y){var l=r.util.getParameter(s,"utm_campaign"),aW=r.util.getParameter(s,"utm_medium"),aa=r.util.getParameter(s,"utm_term");t[N](y),t[N](l||"-"),t[N](aW||"-"),t[N](aa||"not set")}else{var p=C&&C[J]("/")[2],aV=false;if(p&&p[w](aU)<0){for(var aQ=aX.get(aH),aR=0;aR<aQ.length;aR++){var aT=aQ[aR][J](":");if(p[w](aT[0][H]())>-1&&C[w]((aT[1]+"=")[H]())>-1){var aS=unescape(aT[1][H]()),K=r.util.getParameter(C,aS);t[N](aT[0]),t[N]("-"),t[N]("organic"),t[N](az(K)||"not set");aV=true;break}}if(!aV){if(p[w]("zol.com.cn")>-1){t[N]("zol.com.cn"),t[N]("-"),t[N]("cpc"),t[N]("not set")}else{t[N](/([\w-]+\.)+\w*/.exec(C)[0]),t[N]("-"),t[N]("referral"),t[N]("-")}}}}if((t[Q]>0&&t[2]!=="referral"&&(t[0]!=W||t[1]!=O||t[2]!=L||t[3]!=D))||(g&&t[Q]>0&&t[2]==="referral")){aX.set(e,t[0]||"direct");aX.set(ar,t[1]||"-");aX.set(c,t[2]||"none");aX.set(an,t[3]||"-");ap(aX)}else{if(g){ap(aX)}else{h(aX)}}},j=function(l,g){var p=g.split(".");l.set(i,p[2]);l.set(a,p[4]);l.set(aJ,aO());l.m(au);l.set(P,1)},E=function(l){var g=l.get(d);l.set(ac,X());l.set(i,g);l.set(a,g);l.set(aJ,g);l.set(au,1);l.set(P,1)},h=function(g){g.m(P)},u=function(g){return[g.get(af),g.get(ac)||"-",g.get(i)||"-",g.get(a)||"-",g.get(aJ)||"-",g.get(au)||1][F](".")},f=function(g){return[g.get(af),g.get(P)||1,g.get(ac)+"|"+g.get(au)||1,g.get(aJ)||g.get(d)][F](".")},z=function(g){return[g.get(af),g.get(e)||al.domain,g.get(ar)||"(direct)",g.get(c)||"direct",g.get(an)||"-"][F]("|")},ap=function(g){var l=r.util.Vv("__jda");l.length==0?E(g):j(g,l[0])};var q=new aK(),at=function(){this.a={};this.add=function(g,l){this.a[g]=l};this.get=function(g){return this.a[g]};this.toString=function(){return this.a[F]("&")}},ae=function(l,g){function s(y,t){t&&p[N](y+"="+t+";")}var p=[];s("__jda",u(l));s("__jdv",z(l));g.add("jdcc",p[F]("+"))},o=function(l,g){g.add("jdac",l.get(ai)),g.add("jduid",l.get(ac)),g.add("jdsid",l.get(ac)+"|"+l.get(au)),g.add("jdje",l.get(n)),g.add("jdsc",l.get(M)),g.add("jdsr",l.get(x)),g.add("jdul",l.get(ay)),g.add("jdcs",l.get(A)),g.add("jddt",az(l.get(ah))||"-"),g.add("jdmr",az(l.get(av))),g.add("jdhn",l.get(ad)||"-"),g.add("jdfl",l.get(aL)),g.add("jdos",l.get(B)),g.add("jdbr",l.get(Y)),g.add("jdbv",l.get(T)),g.add("jdwb",l.get(i)),g.add("jdxb",l.get(a)),g.add("jdyb",l.get(aJ)),g.add("jdzb",l.get(au)),g.add("jdcb",l.get(P)),g.add("jdusc",l.get(e)||"direct"),g.add("jducp",l.get(ar)||"-"),g.add("jdumd",l.get(c)||"-"),g.add("jduct",l.get(an)||"-"),g.add("jdlt",typeof jdpts!="object"?0:jdpts._st==undefined?0:l.get(aP)-jdpts._st),g.add("jdtad",l.get(b))},aN=function(l,g,p,s){g.add("jdac",l.get(ai)),g.add("jduid",l.get(ac)),g.add("jdsid",l.get(ac)+"|"+l.get(au)),g.add("jdje","-"),g.add("jdsc","-"),g.add("jdsr","-"),g.add("jdul","-"),g.add("jdcs","-"),g.add("jddt","-"),g.add("jdmr",az(l.get(av))),g.add("jdhn","-"),g.add("jdfl","-"),g.add("jdos","-"),g.add("jdbr","-"),g.add("jdbv","-"),g.add("jdwb","-"),g.add("jdxb","-"),g.add("jdyb","-"),g.add("jdzb",l.get(au)),g.add("jdcb",s?((l.get(P)*1)+s):l.get(P)),g.add("jdusc","-"),g.add("jducp","-"),g.add("jdumd","-"),g.add("jduct","-"),g.add("jdlt",0),g.add("jdtad",p)},aM=function(){aB(q)&&aA(q);var l=new at(),g=q.get(I);o(q,l);r.util.Wv("__jda",u(q),g,q.get(aG));r.util.Wv("__jdb",f(q),g,q.get(am));r.util.Wv("__jdc",q.get(af),g);r.util.Wv("__jdv",z(q),g,q.get(V));return l.a},ax=function(){var g=new at();o(q,g);return g.a},aI=function(g,l){var p=new at();aN(q,p,g,l);return p.a},aq=function(l){if(l instanceof Array){var s="";for(var p=0,g=l.length;p<g;p++){s+=l[p]+"|||"}return s}return l};r.tracker={loading:function(t,s,p,y){var C=p&&(p.jdac+"||"+p.jdje+"||"+p.jdsc+"||"+p.jdsr+"||"+p.jdul+"||"+p.jdcs+"||"+az(p.jddt)+"||"+p.jdhn+"||"+p.jdfl+"||"+p.jdos+"||"+p.jdbr+"||"+p.jdbv+"||"+p.jdwb+"||"+p.jdxb+"||"+p.jdyb+"||"+p.jdzb+"||"+p.jdcb+"||"+p.jdusc+"||"+p.jducp+"||"+p.jdumd+"||"+p.jduct+"||"+p.jdlt+"||"+p.jdtad),g=r.util.Vv("pin");var l="http://csc.360buy.com/log.ashx?type1="+az(t)+"&type2="+az(s)+"&pin="+az(g[Q]>0?g[0]:"-")+"&uuid="+p.jduid+"&sid="+p.jdsid+"&referrer="+az(p.jdmr||"-")+"&jinfo="+C+"&data="+az(aq(y))+"&callback=?";$.getJSON(l,function(){})},bloading:function(p,l,s){var g=aM();this.loading(p,l,g,s)},aloading:function(p,l,s){var g=ax();this.loading(p,l,g,s)},adshow:function(l){var g=aI(l);this.loading("AD","IM",g,"")},adclick:function(l){var g=aI(l,1);this.loading("AD","CL",g,"")}};window.JA=r;r.tracker.bloading("J","A",new Date().getTime())})();function log(c,b){var a=Array.prototype.slice.call(arguments);JA.tracker.aloading(c,b,a&&a.slice(2))}(function(){if(typeof jdpts!="object"){return}if(jdpts._cls){log(jdpts._cls.split(".")[0],jdpts._cls.split(".")[1])}})();function HashMap(){this.values=new Object()}HashMap.prototype.Set=function(a,b){this.values[a]=b};HashMap.prototype.Get=function(a){return this.values[a]};HashMap.prototype.Contains=function(a){return this.values.hasOwnProperty(a)};HashMap.prototype.Remove=function(a){delete this.values[a]};funLoad();Clublog();