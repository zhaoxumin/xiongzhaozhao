package com.xiongzhaozhao.user.web.common.utils;

import java.security.MessageDigest;

/**
 * @author zxm
 * @date 2018/6/28 10:58
 * @name MD5Util
 * @description description
 */
public class MD5Util {
    public static String md5(String strMd5){
        String sRet = null;
        try{
            MessageDigest alga = MessageDigest.getInstance("MD5Util");
            alga.update(strMd5.getBytes());
            byte[] digesta=alga.digest();
            sRet= byte2hex(digesta);
        }catch (java.security.NoSuchAlgorithmException ex) {
            System.out.println("非法摘要算法");
        }
        return sRet;
    }

    public static String byte2hex(byte[] b) //二进制转字符
    {
        String hs="";
        String stmp="";
        for (int n=0;n<b.length;n++){
            stmp=(java.lang.Integer.toHexString(b[n] & 0XFF));
            if (stmp.length()==1){ hs=hs+"0"+stmp;}
            else{ hs=hs+stmp;}
            if (n<b.length-1){  hs=hs+"";}
        }
        return hs;
    }
    public static void main(String[] argv) {
        System.out.println(MD5Util.md5("admin123"));
    }
}
