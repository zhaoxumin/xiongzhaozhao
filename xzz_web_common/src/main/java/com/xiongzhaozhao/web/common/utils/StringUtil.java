package com.xiongzhaozhao.web.common.utils;

import com.alibaba.fastjson.JSONArray;
import org.apache.commons.lang3.RandomStringUtils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static java.util.regex.Pattern.*;

/**
 * @author zxm
 * @date 2018/6/28 10:54
 * @name StringUtil
 * @description description
 */
public class StringUtil {
    public static boolean isEmpty(String str) {
        return str == null || str.length() == 0;
    }

    public static boolean isNotEmpty(String str) {
        return str != null && str.length() > 0;
    }

    public static boolean isBlank(String str) {
        int length;
        if (str == null || (length = str.length()) == 0 || "null".equals(str) || "(null)".equals(str)) {
            return true;
        }
        for (int i = 0; i < length; i++) {
            if (!Character.isWhitespace(str.charAt(i))) {
                return false;
            }
        }
        return true;
    }

    public static boolean isNotBlank(String str) {
        int length;
        if (str == null || (length = str.length()) == 0 || "null".equals(str) || "(null)".equals(str)) {
            return false;
        }
        for (int i = 0; i < length; i++) {
            if (!Character.isWhitespace(str.charAt(i))) {
                return true;
            }
        }
        return false;
    }

    public static String random(int count) {
        return RandomStringUtils.random(count, "ABCEDFGHGKMNPQRSTUVWXYZ23456789");
    }

    public static String suffixOverrides(String src, String suffix) {
        if (StringUtil.isBlank(src)) {
            return null;
        }
        if (src.endsWith(suffix)) {
            return src.substring(0, src.length() - 1);
        }
        return src;
    }

    public static boolean isNumber(String string) {
        Pattern p = compile("^\\d*$");
        Matcher m = p.matcher(string);
        return m.matches();
    }

    public static boolean isOutRange(int max, int min, String s) {
        return s.length() > max || s.length() < min;
    }

    /**
     * 根据图片名字获取图片类型
     *
     * @param imgname
     * @return
     */
    public static String getImgType(String imgname) {
        String type = null;
        int idx = imgname.lastIndexOf(".");
        if (idx > 0) {
            type = imgname.substring(idx + 1).toLowerCase();
        }
        String file_suffix_inlcude = "jpg,jpeg,bmp,gif,png";
        if (file_suffix_inlcude.indexOf(type) < 0) {
            type = "jpg";
        }
        return type;
    }

    /**
     * json数组字符串转换成java 字符串数组
     *
     * @param pics
     * @return
     */
    public static String[] jsonString2Array(String pics) {
        if (StringUtil.isNotBlank(pics)) {
            JSONArray parseArray = JSONArray.parseArray(pics);
            if (parseArray != null && parseArray.size() > 0) {
                String[] picArray = new String[parseArray.size()];
                for (int i = 0, size = parseArray.size(); i < size; i++) {
                    picArray[i] = parseArray.getString(i);
                }
                return picArray;
            }

        }
        return null;
    }

}
