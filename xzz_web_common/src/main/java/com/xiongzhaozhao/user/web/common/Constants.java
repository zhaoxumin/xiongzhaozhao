package com.xiongzhaozhao.user.web.common;

/**
 * @author zxm
 * @date 2018/6/28 10:50
 * @name Constants
 * @description description
 */
public class Constants {

    public static String CURRENT_USER = "userSession";
    public static String userSessionId = "userSessionId";
    public static String premissions = "premissions";

    /**
     * 缓存key分隔符
     */
    public static String DELIMITER = ".";

    /**
     * 10元
     */
    public static final double MONEY_10 = 10d;

    // ======================================提示语常量=============================================

    /**
     * 操作成功
     */
    public static final int CODE_1000 = 1000;
    public static final String MSG_1000 = "success";

    /**
     * 参数校验错误
     */
    public static final int CODE_2000 = 2000;
    public static final String MSG_2000 = "参数错误";

    public static final int CODE_2001 = 2001;
    public static final String MSG_2001 = "必填参数为空";

    /**
     * 无数据
     */
    public static final int CODE_2002 = 2002;
    public static final String MSG_2002 = "暂无数据";

    /**
     * 逻辑错误
     */
    public static final int CODE_3000 = 3000;
    public static final String MSG_3000 = "出了点小问题";
    /** {0}号码已经注册过啦~ */
    public static final int CODE_3002 = 3002;
    public static final String MSG_3002 = "此手机号已注册，请直接登陆";

    /** QQ绑定后，一个月内无法修改，请正确填写~ */
    public static final int CODE_3003 = 3003;
    public static final String MSG_3003 = "QQ绑定后，一个月内无法修改，请正确填写";
    /** 手机号格式错误~ */
    public static final int CODE_3004 = 3004;
    public static final String MSG_3004 = "请输入正确的手机号码";

    /** 请先绑定你的提现银行卡~ */
    public static final int CODE_3005 = 3005;
    public static final String MSG_3005 = "请先绑定你的提现银行卡";

    /** 用户不存在~ */
    public static final int CODE_3006 = 3006;
    public static final String MSG_3006 = "用户不存在";

    /** 该昵称已被使用，换一个试试吧~~ */
    public static final int CODE_3007 = 3007;
    public static final String MSG_3007 = "该昵称已被使用，换一个试试吧~";

    /** 验证码错误或已失效~~ */
    public static final int CODE_3012 = 3012;
    public static final String MSG_3012 = "验证码错误或已失效";

    /** 余额不足 */
    public static final int CODE_3009 = 3009;
    public static final String MSG_3009 = "余额不足";

    /** 已提交，请不要重复操作 */
    public static final int CODE_3011 = 3011;
    public static final String MSG_3011 = "已提交，请不要重复操作";

    /** 请先绑定手机号 */
    public static final int CODE_3013 = 3013;
    public static final String MSG_3013 = "请先绑定手机号";

    /** 您已经参与过新人首单活动 */
    public static final int CODE_3014 = 3014;
    public static final String MSG_3014 = "您已经参与过新人首单活动";

    /**
     * 该手机号已绑定
     */
    public static final int CODE_3015 = 3015;
    public static final String MSG_3015 = "该手机号已被其它账户绑定，如果继续，原账号的手机号将被解绑，确认绑定吗？";

    /**
     * 密码错误
     */
    public static final int CODE_3016 = 3016;
    public static final String MSG_3016 = "密码错误";

    /**
     * 该手机号未注册
     */
    public static final int CODE_3017 = 3017;
    public static final String MSG_3017 = "该手机号未注册";

    /**
     * 邀请码不存在
     */
    public static final int CODE_3018 = 3018;
    public static final String MSG_3018 = "邀请码不存在";

    /**
     * 红包领取失败
     */
    public static final int CODE_3019 = 3019;
    public static final String MSG_3019 = "红包领取失败";

    /**
     * 剩余份数不足
     */
    public static final int CODE_3020 = 3020;
    public static final String MSG_3020 = "库存不足";

    /**
     * 支付失败
     */
    public static final int CODE_3021 = 3021;
    public static final String MSG_3021 = "支付失败";

    /**
     * 您还未绑定收货地址
     */
    public static final int CODE_3022 = 3022;
    public static final String MSG_3022 = "您还未绑定收货地址";

    /**
     * 未进行实名认证
     */
    public static final int CODE_3023 = 3023;
    public static final String MSG_3023 = "您还未进行实名认证";

    /**
     * 实名认证正在审核中
     */
    public static final int CODE_3024 = 3024;
    public static final String MSG_3024 = "实名认证正在审核中";

    /**
     * 实名认证审核未通过
     */
    public static final int CODE_3025 = 3025;
    public static final String MSG_3025 = "实名认证审核未通过";

    /**
     * 未绑定淘宝号
     */
    public static final int CODE_3026 = 3026;
    public static final String MSG_3026 = "您还未绑定淘宝账号";

    /**
     * 淘宝账号审核中
     */
    public static final int CODE_3027 = 3027;
    public static final String MSG_3027 = "淘宝账号正在审核中";

    /**
     * 淘宝账号审核未通过
     */
    public static final int CODE_3028 = 3028;
    public static final String MSG_3028 = "淘宝账号审核未通过";

    /**
     * 任务已结束
     */
    public static final int CODE_3029 = 3029;
    public static final String MSG_3029 = "任务已结束";

    /**
     * 您还有申请还没完成，请完成或者取消后进行新的试用任务
     */
    public static final int CODE_3030 = 3030;
    public static final String MSG_3030 = "您还有申请还没完成，请完成或者取消后进行新的试用任务";

    /**
     * 您已经申请过了
     */
    public static final int CODE_3031 = 3031;
    public static final String MSG_3031 = "您已经申请过了";

    /**
     * 今日已满，可收藏明日再来
     */
    public static final int CODE_3032 = 3032;
    public static final String MSG_3032 = "今日已满，可收藏明日再来";

    public static final int CODE_3033 = 3033;
    public static final String MSG_3033 = "每7天可申请提现一次";

    public static final int CODE_3034 = 3034;
    public static final String MSG_3034 = "图文码已过期，请重新输入图文码";

    public static final int CODE_3035 = 3035;
    public static final String MSG_3035 = "图文码错误，请检查后重新输入";

    public static final int CODE_3036 = 3036;
    public static final String MSG_3036 = "该手机号已绑定微信";

    public static final int CODE_3037 = 3037;
    public static final String MSG_3037 = "该微信已被绑定";

    /** userid不存在 */
    public static final int CODE_9000 = 9000;
    /** appsign不存在 */
    public static final int CODE_9001 = 9001;
    /** 未登录或登录失效 */
    public static final int CODE_9002 = 9002;

    /** 申诉时间超过6小时才能申请平台介入 */
    public static final int CODE_2888 = 2888;

    public static final String MOBILEMSG = "您的专属验证码是{0}，请在30分钟内完成输入哦。验证码机密，切勿随便泄露哦！";

}
