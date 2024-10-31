
var mpt_ajax_prg_flag=new Array();var ajax_sct=new Array();var my_prayer_time_url="";function in_array(hook,stack){for(tmp in stack){if(tmp==hook)
return true;}
return false;}
function ajax_sct_reg(mpt_nm){if(!in_array(mpt_nm,ajax_sct))
ajax_sct[ajax_sct.length]=mpt_nm;}
function mpt_ajax_hnd_err(mpt_sct,e){mpt_ajax_disp_msg(mpt_sct,"error",mpt_get_error(e));mpt_ajax_disp_prg(mpt_sct,false);if(mpt_get_error(e).toLowerCase()=="session timeout")
redirect_parent(mpt_url(""));}
function mpt_ajax_disp_msg(mpt_sct,mpt_type,mpt_msg){ajax_hide_all_msg();var mpt_wrn=my_prayer_time_get_obj("sct_ajax_"+mpt_sct+"_msg");if(mpt_wrn==null)
return;mpt_wrn.className="ajax_message "+mpt_type;mpt_wrn.style.display="";mpt_wrn.innerHTML=mpt_msg;}
function mpt_ajax_hide_msg(mpt_sct){var mpt_msg=my_prayer_time_get_obj("sct_ajax_"+mpt_sct+"_msg");if(mpt_msg==null)
return;mpt_msg.style.display="none";mpt_msg.innerHTML=mpt_msg;}
function ajax_hide_all_msg(){for(mpt_sct in ajax_sct){mpt_ajax_hide_msg(ajax_sct[mpt_sct]);}}
function mpt_ajax_disp_prg(mpt_sct,mpt_prg){if(typeof mpt_prg=="undefined")
mpt_prg=true;if(typeof mpt_ajax_prg_flag[mpt_sct]=="undefined")
mpt_ajax_prg_flag[mpt_sct]=false;var mpt_frm=my_prayer_time_get_obj("sct_ajax_"+mpt_sct);var mpt_trn=my_prayer_time_get_obj("sct_ajax_"+mpt_sct+"_prg");if(mpt_prg){if(mpt_ajax_prg_flag[mpt_sct])
return;mpt_ajax_hide_msg(mpt_sct);if(to_int(mpt_frm.offsetHeight)<=20)
mpt_trn.style.height="20px";else
mpt_trn.style.height=mpt_frm.offsetHeight+"px";mpt_trn.style.width=mpt_frm.offsetWidth+"px";mpt_frm.style.display="none";mpt_trn.style.display="";mpt_ajax_prg_flag[mpt_sct]=true;}else{if(!mpt_ajax_prg_flag[mpt_sct])
return;mpt_frm.style.display="";mpt_trn.style.display="none";mpt_ajax_prg_flag[mpt_sct]=false;}}
function mpt_create_http_req(){var mpt_request;if(window.ActiveXObject){try{mpt_request=new ActiveXObject("Microsoft.XMLHTTP");}catch(e){mpt_request=false;}}else{try{mpt_request=new XMLHttpRequest();}catch(e){mpt_request=false;}}
if(!mpt_request)
catch_error("Your browser does not support AJAX!");else
return mpt_request;}
function mpt_ajax_query(prm_cmd,prm_mpt_dat_post,prm_mpt_misc){var mpt_xml=mpt_create_http_req();if(typeof prm_dat_get=="undefined")
var prm_dat_get={};if(typeof prm_mpt_dat_post=="undefined")
var prm_mpt_dat_post={};if(typeof prm_mpt_misc=="undefined")
var prm_mpt_misc={};function mpt_send_query(){if(prm_cmd==""){alert("No act to be send!");return false;}
if(mpt_xml.readyState==4||mpt_xml.readyState==0){req_url=mpt_url(prm_cmd);dat_str="";for(tmp in prm_mpt_dat_post){if(dat_str!="")
dat_str+="&";dat_str+=tmp+"="+prm_mpt_dat_post[tmp];}
if(dat_str==""){mpt_xml.open("GET",req_url,true);mpt_xml.onreadystatechange=mpt_response;mpt_xml.setRequestHeader("Accept-Charset","UTF-8");mpt_xml.send(null);}else{mpt_xml.open("POST",req_url,true);mpt_xml.onreadystatechange=mpt_response;mpt_xml.setRequestHeader("Content-Type","application/x-www-form-urlencoded");mpt_xml.setRequestHeader("Accept-Charset","UTF-8");mpt_xml.send(dat_str);}
return true;}
return false;}
function mpt_response(){try{if(mpt_xml.readyState==4){if(mpt_xml.status==200){try{mpt_res=mpt_xml.responseXML.documentElement;mpt_handle_response(mpt_res);if(typeof prm_mpt_misc.exec_cpl!="undefined")
eval(prm_mpt_misc.exec_cpl);if(typeof prm_mpt_misc.exec_done!="undefined")
eval(prm_mpt_misc.exec_done);}catch(err){}}else{catch_error(mpt_xml.responseText);}}}catch(e){if(typeof prm_mpt_misc.exec_fail!="undefined")
eval(prm_mpt_misc.exec_fail);if(typeof prm_mpt_misc.exec_done!="undefined")
eval(prm_mpt_misc.exec_done);catch_error(e);}}
function mpt_handle_response(mpt_reply){try{if(typeof prm_mpt_misc.exec!="undefined")
eval(prm_mpt_misc.exec+"(mpt_reply, prm_mpt_misc);");}catch(e){catch_error(e);}}
return mpt_send_query();}
function str_replace(str,sr,val){return str.replace(sr,val,"g");}
function mpt_parse_html(html){var mpt_res=html;mpt_res=str_replace(mpt_res,"&gt;",">");mpt_res=str_replace(mpt_res,"&lt;","<");mpt_res=str_replace(mpt_res,"&quot;","\"");mpt_res=str_replace(mpt_res,"&brvbar;","|");mpt_res=str_replace(mpt_res,"&amp;","&");return mpt_res;}
function to_int(str){mpt_res=parseInt(to_num(str));if(isNaN(mpt_res))
mpt_res=0;return mpt_res;}
function to_num(str){mpt_res=parseFloat(str);if(isNaN(mpt_res))
mpt_res=0;return mpt_res;}
function mpt_is_ie(){if(navigator.appName=="Microsoft Internet Explorer")
return true;else
return false;}
function is_opera(){if(navigator.appName=="Opera")
return true;else
return false;}
function mpt_get_error(e){return e.message}
function my_prayer_time_get_obj(object_name){return document.getElementById(object_name);}
function catch_error(str){if(str!="")
throw new Error(str);}
function mpt_url(mpt_nm){return my_prayer_time_url+"/ajax/"+mpt_nm;}
function mpt_xml_nd_val(mpt_nd){try{return mpt_parse_html(mpt_nd.firstChild.data);}catch(e){return"";}}
function xml_nds_by_tag(mpt_xml,mpt_tag){mpt_res=new Array();mpt_nds=mpt_xml.getElementsByTagName(mpt_tag);mpt_len=mpt_nds.length;for(mpt_ai=0;mpt_ai<mpt_len;mpt_ai++)
mpt_res[mpt_ai]=mpt_nds[mpt_ai];return mpt_res;}
function mpt_xml_nd_chd(mpt_nd){mpt_res=new Array();mpt_nds=mpt_nd.childNodes;mpt_len=mpt_nds.length;for(mpt_bi=0;mpt_bi<mpt_len;mpt_bi++)
mpt_res[mpt_bi]=mpt_nds[mpt_bi];return mpt_res;}
function mpt_xml_msg(mpt_xml,mpt_tag){if(typeof mpt_tag=="undefined")
var mpt_tag="error";lst_msg=new Array();nds_msg=xml_nds_by_tag(mpt_xml,mpt_tag);if(nds_msg.length==0)
return"";for(nd_msg in nds_msg)
lst_msg[lst_msg.length]=mpt_xml_nd_val(nds_msg[nd_msg]);return lst_msg.join("<br/>");}
function tbl_rst_row(mpt_nm,skip_first){if(typeof(skip_first)=="undefined")
skip_first=false;var tbl=my_prayer_time_get_obj(mpt_nm);tbl=tbl.getElementsByTagName("tbody")[0];var mpt_nds=mpt_xml_nd_chd(tbl);var is_first=true;for(mpt_nd in mpt_nds){if(typeof mpt_nds[mpt_nd].nodeName!="undefined"){if(mpt_nds[mpt_nd].nodeName.toLowerCase()=="tr"){if(skip_first==true&&is_first==true){is_first=false;continue;}else{tbl.removeChild(mpt_nds[mpt_nd]);}}}}}
function tbl_add_row(mpt_nm,col_def,atr){if(typeof atr=="undefined")
atr=new Array();var tbl=my_prayer_time_get_obj(mpt_nm);tbl=tbl.getElementsByTagName("tbody")[0];row=document.createElement("tr");for(tmp_atr in atr){if(tmp_atr=="class")
row.className=atr[tmp_atr];else
row.setAttribute(tmp_atr,atr[tmp_atr]);}
for(mpt_ti=0;mpt_ti<col_def.length;mpt_ti++){col=document.createElement("td");tmp_col_ctt=col_def[mpt_ti];if(typeof tmp_col_ctt["atr"]=="undefined")
tmp_col_ctt_atr=new Array();else
tmp_col_ctt_atr=tmp_col_ctt["atr"];for(tmp_atr in tmp_col_ctt_atr){if(tmp_atr=="class")
col.className=tmp_col_ctt_atr[tmp_atr];else
col.setAttribute(tmp_atr,tmp_col_ctt_atr[tmp_atr]);}
col.innerHTML=tmp_col_ctt["val"];row.appendChild(col);}
tbl.appendChild(row);}
function my_prayer_time_cbo_reset(id)
{my_prayer_time_get_obj(id).options.length=0;}
function my_prayer_time_cbo_add(id,prm_text,prm_val){var optn=document.createElement("OPTION");optn.text=prm_text;optn.value=prm_val;my_prayer_time_get_obj(id).options.add(optn);}
function my_prayer_time_widget_time_load(){try{mpt_ajax_disp_prg("my_prayer_time_widget_time");mpt_misc={"exec":"my_prayer_time_widget_time_load_exec","exec_done":"mpt_ajax_disp_prg('my_prayer_time_widget_time', false);"};mpt_dat_post={"date_dd":encodeURIComponent(my_prayer_time_get_obj("my_prayer_time_widget_date_dd").value),"date_mm":encodeURIComponent(my_prayer_time_get_obj("my_prayer_time_widget_date_mm").value),"date_yy":encodeURIComponent(my_prayer_time_get_obj("my_prayer_time_widget_date_yy").value)};if(!mpt_ajax_query("get_daily_time.php",mpt_dat_post,mpt_misc))
setTimeout("my_prayer_time_widget_time_load()",1000);}catch(e){mpt_ajax_hnd_err("my_prayer_time_widget_time",e);}}
function my_prayer_time_widget_time_load_exec(mpt_reply){try{catch_error(mpt_xml_msg(mpt_reply,"error"));mpt_nds_res=mpt_xml_nd_chd(mpt_reply);if(mpt_nds_res.length>0){for(var i=0;i<mpt_nds_res.length;i++){mpt_tmp_name=mpt_nds_res[i].nodeName;mpt_tmp_time=mpt_xml_nd_val(mpt_nds_res[i]);mpt_tmp_elm=my_prayer_time_get_obj("my_prayer_time_widget_time_"+mpt_tmp_name);if(mpt_tmp_elm!=null)
mpt_tmp_elm.innerHTML=mpt_tmp_time;}}
mpt_ajax_disp_prg('my_prayer_time_widget_time',false);}catch(e){mpt_ajax_hnd_err("my_prayer_time_widget_time",e);}}
function my_prayer_time_page_time_load(){try{mpt_ajax_disp_prg("my_prayer_time_page_time");mpt_misc={"exec":"my_prayer_time_page_time_load_exec","exec_done":"mpt_ajax_disp_prg('my_prayer_time_page_time', false);"};mpt_dat_post={"date_mm":encodeURIComponent(my_prayer_time_get_obj("my_prayer_time_page_date_mm").value),"date_yy":encodeURIComponent(my_prayer_time_get_obj("my_prayer_time_page_date_yy").value)};my_prayer_time_get_obj("lnk_my_prayer_time_print").href=my_prayer_time_url+"/my_prayer_time.print.php?date_mm="+mpt_dat_post.date_mm+"&date_yy="+mpt_dat_post.date_yy;if(!mpt_ajax_query("get_monthly_time.php",mpt_dat_post,mpt_misc))
setTimeout("my_prayer_time_page_time_load()",1000);}catch(e){mpt_ajax_hnd_err("my_prayer_time_page_time",e);}}
function my_prayer_time_page_time_load_exec(mpt_reply){try{catch_error(mpt_xml_msg(mpt_reply,"error"));mpt_nds_res=xml_nds_by_tag(mpt_reply,"list");tbl_rst_row("my_prayer_time_monthly",true);if(mpt_nds_res.length>0){for(mpt_i=0;mpt_i<mpt_nds_res.length;mpt_i++){ndc_res=mpt_xml_nd_chd(mpt_nds_res[mpt_i]);rw=new Array();ret_date=mpt_i.toString();ret_fajr="";ret_sunrise="";ret_zuhr="";ret_asr="";ret_maghrib="";ret_isha="";if(ndc_res.length>0){for(mpt_j=0;mpt_j<ndc_res.length;mpt_j++){mpt_nd=ndc_res[mpt_j];val=mpt_xml_nd_val(mpt_nd);switch(mpt_nd.nodeName){case"date":ret_date=val;break;case"fajr":ret_fajr=val;break;case"sunrise":ret_sunrise=val;break;case"zuhr":ret_zuhr=val;break;case"asr":ret_asr=val;break;case"maghrib":ret_maghrib=val;break;case"isha":ret_isha=val;break;}}
rw[rw.length]={"val":ret_date};rw[rw.length]={"val":ret_fajr};rw[rw.length]={"val":ret_sunrise};rw[rw.length]={"val":ret_zuhr};rw[rw.length]={"val":ret_asr};rw[rw.length]={"val":ret_maghrib};rw[rw.length]={"val":ret_isha};tbl_add_row("my_prayer_time_monthly",rw);}}}else{rw={0:{"val":"Nothing to add"}};tbl_add_row("my_prayer_time_monthly",rw);}
mpt_ajax_disp_prg('my_prayer_time_page_time',false);}catch(e){alert(e);mpt_ajax_hnd_err("my_prayer_time_page_time",e);}}