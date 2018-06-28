package com.xiongzhaozhao.user.web.common.filter;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.google.common.base.Splitter;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.xiongzhaozhao.user.web.common.utils.XssUtils;
import org.apache.commons.io.IOUtils;
import org.apache.shiro.web.servlet.ShiroHttpServletRequest;
import org.jsoup.Jsoup;

import javax.servlet.ReadListener;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import java.io.*;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * @author zxm
 * @date 2018/6/28 15:30
 * @name RequestBodyWrapper
 * @description description
 */
public class RequestBodyWrapper extends HttpServletRequestWrapper {
    // request.getInputStream()数据，缓存供后续使用
    private byte[] requestBody;

    // 白名单
    private List<String> whiteList = Lists.newArrayList();

    // 富文本字段名，此处使用Set类型更好
    private List<String> richTextField = Lists.newArrayList();

    // 1.过滤request body
    public RequestBodyWrapper(HttpServletRequest request, String whiteListStr, String richTextFieldStr) throws Exception {
        super(request);
        this.whiteList = Splitter.on(";").splitToList(whiteListStr);
        this.richTextField = Splitter.on(";").splitToList(richTextFieldStr);
        if (isSaveRequestBody(request)) {
            saveRequestBody(request);
        }
    }

    /**
     * 是否需要处理requestbody
     * ajax请求时需要处理
     *
     * @param request
     * @return
     */
    public static boolean isSaveRequestBody(HttpServletRequest request) {
        String contentType = request.getContentType();
        String method = request.getMethod();
        if (("POST".equals(method) || "PUT".equals(method))
                && contentType != null && contentType.startsWith("application/json")) {
            return true;
        }
        return false;
    }

    /**
     * 获取request body wrapper
     *
     * @param request
     * @return
     */
    public static RequestBodyWrapper getRequestBodyWrapper(HttpServletRequest request) {
        if (request instanceof ShiroHttpServletRequest) {
            ShiroHttpServletRequest shiroHttpServletRequest = (ShiroHttpServletRequest) request;
            return (RequestBodyWrapper) shiroHttpServletRequest.getRequest();
        }
        if (request instanceof RequestBodyWrapper) {
            return (RequestBodyWrapper) request;
        }
        return null;
    }

    /**
     * 将request中的流转换为字节数组保存
     *
     * @param request
     */
    private void saveRequestBody(HttpServletRequest request) throws Exception {
        InputStream is = null;
        ByteArrayOutputStream os = null;
        try {
            is = request.getInputStream();
            os = new ByteArrayOutputStream();
            byte[] buffer = new byte[1024];
            int length;
            while ((length = is.read(buffer)) > -1) {
                os.write(buffer, 0, length);
            }
            os.flush();
            requestBody = os.toByteArray();
            // 不在白名单中需要字符过滤
            if (!isWhiteUrl() && hasRequestBody()) {
                // 过滤非法字符
                String safeRequestBodyString = replaceXssWordsWithJson(getRequestBodyString());
                requestBody = safeRequestBodyString.getBytes();
            }
        } catch (Exception e) {
            if (e instanceof Exception) {
                throw  e;
            } else {
                throw new RuntimeException(e);
            }
        } finally {
            IOUtils.closeQuietly(is);
            IOUtils.closeQuietly(os);
        }
    }

    /**
     * 是否存在request body
     *
     * @return
     */
    private boolean hasRequestBody() {
        return requestBody != null && requestBody.length > 0;
    }

    /**
     * 替换json中的非法字符
     *
     * @param string
     * @return
     */
    private String replaceXssWordsWithJson(String string) throws Exception {
        if (string == null) {
            return null;
        }
        Object object = JSON.parse(string);
        replaceJsonValues(object, Integer.valueOf(-1), object);
        return JSON.toJSONString(object);
    }

    /**
     * 过滤json数据
     *
     * @param json
     * @param index
     * @param value
     * @return
     */
    private Object replaceJsonValues(Object json, Object index, Object value) throws Exception {
        if (value instanceof JSONObject) {
            JSONObject jsonObject = (JSONObject) value;
            Set<String> keys = jsonObject.keySet();
            for (String key : keys) {
                replaceJsonValues(jsonObject, key, jsonObject.get(key));
            }
        } else if (value instanceof JSONArray) {
            JSONArray arrays = (JSONArray) value;
            for (int i = 0; i < arrays.size(); i++) {
                replaceJsonValues(arrays, Integer.valueOf(i), arrays.get(i));
            }
        } else {
            if (index instanceof String) {
                JSONObject jsonObject = (JSONObject) json;
                jsonObject.put(String.valueOf(index), isRichTextField(String.valueOf(index)) ?
                        replaceRichTextXssWords(String.valueOf(value)) : replaceXssWords(String.valueOf(value)));
            } else if (index instanceof Integer) {
                JSONArray arrays = (JSONArray) json;
                arrays.set(Integer.valueOf(String.valueOf(index)), replaceXssWords(String.valueOf(value)));
            }
        }
        return json;
    }

    /**
     * 获取字符化后的requestBody
     */
    public String getRequestBodyString() {
        String requestBodyString = null;
        if (hasRequestBody()) {
            try {
                requestBodyString = new String(requestBody, "UTF-8");
            } catch (UnsupportedEncodingException e) {
                // ignore
            }
        }
        return requestBodyString;
    }

    @Override
    public ServletInputStream getInputStream() throws IOException {
        if (hasRequestBody()) {
            final ByteArrayInputStream bais = new ByteArrayInputStream(requestBody);
            return new ServletInputStream() {
                @Override
                public boolean isFinished() {
                    return false;
                }

                @Override
                public boolean isReady() {
                    return false;
                }

                @Override
                public void setReadListener(ReadListener readListener) {

                }

                @Override
                public int read() throws IOException {
                    return bais.read();
                }
            };
        } else {
            return super.getInputStream();
        }
    }

    @Override
    public BufferedReader getReader() throws IOException {
        if (hasRequestBody()) {
            return new BufferedReader(new InputStreamReader(this.getInputStream()));
        } else {
            return super.getReader();
        }
    }

    // 2.过滤query string
    @Override
    public String getQueryString() {
        // 过滤非法字符
        if (isWhiteUrl()) {
            return super.getQueryString();
        }
        return replaceXssWithQueryString(super.getQueryString());
    }

    /**
     * 替换查询字符串中的非法字符
     *
     * @param string
     * @return
     */
    private String replaceXssWithQueryString(String string) {
        return string;
    }

    // 3.过滤parameters
    @Override
    public Map getParameterMap() {
        if (isWhiteUrl()) {
            return super.getParameterMap();
        }
        Map origonMap = super.getParameterMap();
        Map safeMap = Maps.newHashMap();
        Iterator iterator = origonMap.keySet().iterator();
        while (iterator.hasNext()) {
            Object key = iterator.next();
            Object value = origonMap.get(key);
            if (value instanceof String[]) {
                String[] str = (String[]) value;
                for (int i = 0; i < str.length; ++i) {
                    // 替换非法字符
                    if (isRichTextField((String) key)) {
                        try {
                            safeMap.put(key, replaceRichTextXssWords(str[i]));
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    } else {
                        safeMap.put(key, replaceXssWords(str[i]));
                    }
                }
            }
        }
        return safeMap;
    }

    @Override
    public String getParameter(String name) {
        if (isWhiteUrl()) {
            return super.getParameter(name);
        }
        if (isRichTextField(name)) {
            try {
                return replaceRichTextXssWords(super.getParameter(name));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return replaceXssWords(super.getParameter(name));
    }

    @Override
    public String[] getParameterValues(String name) {
        if (isWhiteUrl()) {
            return super.getParameterValues(name);
        }
        String[] origonParameterValues = super.getParameterValues(name);
        String[] safeParameterValues = null;
        if (origonParameterValues != null) {
            safeParameterValues = new String[origonParameterValues.length];
            for (int i = 0; i < safeParameterValues.length; i++) {
                if (isRichTextField(name)) {
                    try {
                        safeParameterValues[i] = replaceRichTextXssWords(origonParameterValues[i]);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                } else {
                    safeParameterValues[i] = replaceXssWords(origonParameterValues[i]);
                }
            }
        }
        return safeParameterValues;
    }

    /**
     * 除去xss攻击字符
     *
     * @param string
     * @return
     */
    private String replaceXssWords(String string) {
        if (string == null){
            return null;
        }
        return string;
    }

    /**
     * 除去富文本中的xss攻击字符
     * 与replaceXssWords不同在于本方法不能将html转义，在页面要配置#unEscapeHtml()使用
     *
     * @param word
     * @return
     */
    private String replaceRichTextXssWords(String word) throws Exception {
        if (word == null) {
            return null;
        }
        // 保证所有html反转义成功
        String html = Jsoup.parseBodyFragment(word).html();
        try {
            return XssUtils.clearHtml(html);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return html;
    }

    /**
     * 判断url是否在白名单
     *
     * @return
     */
    private boolean isWhiteUrl() {
        String url = this.getRequestURI();
        boolean isWhiteUrl = false;
        for (String whiteUrl : whiteList) {
            if (whiteUrl.endsWith("**")) {
                if (url.startsWith(whiteUrl)) {
                    isWhiteUrl = true;
                    break;
                }
            } else {
                if (whiteUrl.endsWith(url)) {
                    isWhiteUrl = true;
                    break;
                }
            }
        }
        return isWhiteUrl;
    }

    /**
     * 是否为富文本字段
     * 富文本字段不做过滤
     *
     * @param field
     * @return
     */
    private boolean isRichTextField(String field) {
        return this.richTextField.contains(field);
    }
}

