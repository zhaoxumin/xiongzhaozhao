package com.xiongzhaozhao.user.web.common.filter;

import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author zxm
 * @date 2018/6/28 15:22
 * @name RequestBodyFilter
 * @description description
 */
public class RequestBodyFilter extends OncePerRequestFilter {

    // 白名单
    private String whiteList;

    // 富文本字段名
    private String richTextField;

    public RequestBodyFilter() {
    }

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        RequestBodyWrapper requestWrapper = null;
        try {
            requestWrapper = new RequestBodyWrapper(httpServletRequest, whiteList, richTextField);
        } catch (Exception e) {
            e.printStackTrace();
        }
        filterChain.doFilter(requestWrapper, httpServletResponse);
    }

    public void setWhiteList(String whiteList) {
        this.whiteList = whiteList;
    }

    public void setRichTextField(String richTextField) {
        this.richTextField = richTextField;
    }
}

