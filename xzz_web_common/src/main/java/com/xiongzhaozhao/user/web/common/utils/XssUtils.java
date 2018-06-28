package com.xiongzhaozhao.user.web.common.utils;

import org.apache.commons.lang3.StringEscapeUtils;
import org.owasp.validator.html.AntiSamy;
import org.owasp.validator.html.Policy;
import org.owasp.validator.html.PolicyException;
import org.owasp.validator.html.ScanException;

/**
 * @author zxm
 * @date 2018/6/28 15:44
 * @name XssUtils
 * @description description
 */
public class XssUtils {

    private static Policy policy;

    static {
        try {
            policy = Policy.getInstance(XssUtils.class.getClassLoader().getResourceAsStream("antisamy/antisamy-myspace.xml"));
        } catch (PolicyException e) {
            throw new RuntimeException("加载xss过滤规则失败");
        }
    }

    /**
     * 去掉xss字符
     *
     * @param word
     * @return 过滤后的字符
     */
    public static String clearHtml(String word) throws Exception {
        String unescapeHtml = unescapeHtml(word, StringEscapeUtils.unescapeHtml4(word));
        AntiSamy antiSamy = new AntiSamy(policy);
        try {
            return antiSamy.scan(unescapeHtml).getCleanHTML();
        } catch (ScanException e) {
            throw new Exception("xss scan failed");
        } catch (PolicyException e) {
            throw new Exception("xss scan failed");
        }
    }

    /**
     * 递归去掉html转义字符
     *
     * @param before
     * @param after
     * @return
     */
    private static String unescapeHtml(String before, String after) {
        if (before.equals(after)) {
            return before;
        } else {
            return unescapeHtml(StringEscapeUtils.unescapeHtml4(after), before);
        }
    }
}
