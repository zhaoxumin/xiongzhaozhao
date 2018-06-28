package com.xiongzhaozhao.user.web.common.controller;

import com.alibaba.dubbo.common.json.JSONObject;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.xiongzhaozhao.user.web.common.Constants;
import com.xiongzhaozhao.user.web.common.utils.MD5Util;
import com.xiongzhaozhao.user.web.common.utils.StringUtil;
import com.xiongzhaozhao.user.web.common.bean.ResponseBean;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.util.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

/**
 * @author zxm
 * @date 2018/6/28 10:46
 * @name BaseController
 * @description description
 */
public class BaseController {

    protected static Logger log = LogManager.getLogger(BaseController.class);

    /**
     * 操作成功
     *
     * @return
     */
    public ResponseBean success() {
        return success(null);
    }

    public ResponseBean success(Object data) {
        ResponseBean responseModel = new ResponseBean(Constants.CODE_1000, Constants.MSG_1000, data);
        return responseModel;
    }

    /**
     * 操作失败
     *
     * @return
     */
    public ResponseBean error(int code, String msg) {
        return new ResponseBean(code, msg, null);
    }

    public ResponseBean error(String msg) {
        return new ResponseBean(Constants.CODE_3000, msg, null);
    }

    public ResponseBean error() {
        return new ResponseBean(Constants.CODE_3000, "操作失败", null);
    }

    public ResponseBean error(Object data, int code, String msg) {
        ResponseBean responseModel = new ResponseBean(code,msg, data);
        return responseModel;
    }

    /**
     * 暂无数据
     *
     * @return
     */
    public ResponseBean emptyData() {
        return new ResponseBean(Constants.CODE_2002, Constants.MSG_2002, null);
    }

    /**
     * 必填参数为空
     *
     * @return
     */
    public ResponseBean emptyParameter() {
        return new ResponseBean(Constants.CODE_2001, Constants.MSG_2001, null);
    }

    public ResponseBean emptyParameter(String msg) {
        return new ResponseBean(Constants.CODE_2001, msg, null);
    }

    public Long getUserId(HttpServletRequest req) {

        String userid = req.getParameter("userid");
        if (StringUtil.isNotBlank(userid)){
            return Long.valueOf(userid);}

        userid = req.getHeader("userid");
        if (StringUtil.isNotBlank(userid)){
            return Long.valueOf(userid);}
        // 从cookie中取
        Cookie cookie = WebUtils.getCookie(req, "userid");
        if (cookie == null){
            return null;}
        userid = cookie.getValue();
        if (StringUtil.isNotBlank(userid)){
            return Long.valueOf(userid);}

        return null;

    }

    /**
     * 生成sessionkey
     *
     * @param username
     *            手机号码
     * @param toUpperCase
     *            true 大写,反之小写
     * @return
     */
    public String createSessionKey(String username, boolean toUpperCase) {
        String key = username + System.currentTimeMillis();
        if (toUpperCase) {
            return MD5Util.md5(key).toUpperCase();
        }
        else {
            return MD5Util.md5(key).toLowerCase();
        }
    }

    /**
     * 获取当前登录用户信息
     *
     * @return
     */
    @SuppressWarnings("unchecked")
    public Map<String, Object> getUserInfo(HttpServletRequest request, HttpServletResponse response) {
        return (Map<String, Object>) WebUtils.getSessionAttribute(request, Constants.CURRENT_USER);
    }

    /**
     * 所有请求参数封装成map
     *
     * @return
     */
    public Map<String, Object> getFormMap() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
                .getRequest();
        return getFormMap(request);
    }

    /**
     * 所有请求参数封装成map
     *
     * @return
     */
    public Map<String, Object> getFormMap(HttpServletRequest request) {
        Enumeration<String> en = request.getParameterNames();
        Map<String, Object> map = new HashMap<String, Object>();
        while (en.hasMoreElements()) {
            String nms = en.nextElement().toString();
            // 数组
            if (nms.endsWith("[]")) {
                String[] values = request.getParameterValues(nms);
                if (values != null && values.length != 0 && values.toString() != "[]") {
                    map.put(nms, values);
                }
            } else {
                String as = request.getParameter(nms);
                if (!StringUtils.isEmpty(as)) {
                    map.put(nms, as);
                }
            }
        }
        return map;
    }

    /**
     * 封装json结果
     *
     * @param code
     * @param message
     * @param data
     * @return
     */
    public JSONObject getJsonResult(String code, String message, Object data) {
        JSONObject json = new JSONObject();
        json.put("code", code);
        json.put("message", message);
        if (data != null) {
            json.put("data", data);
        }
        return json;
    }

    /**
     * 封装json结果
     *
     * @param code
     * @param message
     * @param data
     * @return
     */
    public String getJsonResultString(String code, String message, Object data) {
        // JSON.toJSONString(jsonResult,SerializerFeature.WriteMapNullValue)
        return JSON.toJSONString(getJsonResult(code, message, data), SerializerFeature.WriteMapNullValue);
    }

    public void returnJson(HttpServletResponse response, String code, String message, Object data) {
        returnJson(response, getJsonResultString(code, message, data));
    }

    public void returnJson(HttpServletResponse response, String json) {
        response.setContentType("application/json; charset=UTF-8");
        try {
            response.getWriter().print(json);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 获取int类型的参数
     *
     * @param request
     * @param param
     * @param def
     * @return
     */
    public int getIntParam(HttpServletRequest request, String param, int def) {
        String p = request.getParameter(param);
        if (StringUtil.isBlank(p)){
            return def;
        }
        return Integer.parseInt(p);
    }

    /**
     * 获取pageIndex
     *
     * @param request
     * @return
     */
    public int getPageIndex(HttpServletRequest request) {
        return getIntParam(request, "pageIndex", 1);
    }

    /**
     * 获取pageSize
     *
     * @param request
     * @return
     */
    public int getPageSize(HttpServletRequest request) {
        return getIntParam(request, "pageSize", 10);
    }

    public void setHeader(HttpServletResponse res) {
        res.setCharacterEncoding("UTF-8");
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1
        res.setHeader("Pragma", "no-cache"); // HTTP 1.0
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setDateHeader("Expires", 0); // Proxies.
    }

}

