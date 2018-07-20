package com.xiongzhaozhao.core.utils;

import com.google.common.base.Preconditions;
import com.google.common.collect.Maps;

import java.util.Enumeration;
import java.util.List;
import java.util.Map;
import java.util.Properties;

/**
 * @author zxm
 * @date 2018/6/28 17:20
 * @name PropertyUtils
 * @description description
 */
public class PropertyUtils {

    private static final Map<String, String> props = Maps.newHashMap();

    public PropertyUtils(List<Properties> propList) {
        Preconditions.checkNotNull(propList, "属性文件不能为空");
        for (Properties prop : propList) {
            Enumeration enumeration = prop.propertyNames();
            while (enumeration.hasMoreElements()) {
                String name = (String) enumeration.nextElement();
                props.put(name, prop.getProperty(name));
            }
        }
    }

    public static String get(String key, Object... params) {
        return props.get(key);
    }

    public static Integer getInteger(String key) {
        return Integer.parseInt(get(key));
    }

    public static Long getLong(String key) {
        return Long.parseLong(get(key));
    }

    public static Double getDouble(String key) {
        return Double.parseDouble(get(key));
    }

}
