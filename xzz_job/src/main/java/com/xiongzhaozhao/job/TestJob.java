package com.xiongzhaozhao.job;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * @author zxm
 * @date 2018/8/6 16:56
 * @name com.xiongzhaozhao.job.TestJob
 * @description description
 */
@Component
public class TestJob {
    //五分钟调用一次 测试solr 虚拟机
    @Scheduled(cron = "0/10 * * * * ?")
    public void runFunction(){
        System.out.println("Method executed at every 10 seconds. Current time is :: " + (new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new Date()));
    }
}
