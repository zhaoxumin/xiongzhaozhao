package com.xiongzhaozhao.user.web.common.bean;

/**
 * @author zxm
 * @date 2018/6/28 10:49
 * @name ResponseBean
 * @description description
 */
public class ResponseBean {
    /**
     *
     */
    private static final long serialVersionUID = 7248554132433027965L;

    private int code;
    private String message;
    private Object data;

    public ResponseBean() {
    }


    public ResponseBean(int code, String message, Object data) {
        super();
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
