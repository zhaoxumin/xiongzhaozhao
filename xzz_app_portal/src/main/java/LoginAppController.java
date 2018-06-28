import com.alibaba.fastjson.JSONObject;
import com.xiongzhaozhao.user.api.service.LoginService;
import com.xiongzhaozhao.user.web.common.bean.ResponseBean;
import com.xiongzhaozhao.user.web.common.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

/**
 * @author zxm
 * @date 2018/6/28 10:16
 * @name LoginAppController
 * @description description
 */
@Controller
@RequestMapping(value = "/login")
public class LoginAppController  extends BaseController {

    @Autowired
    private LoginService loginService;

    @ResponseBody
    @RequestMapping(value = {"/dologin"}, method = RequestMethod.POST)
    public ResponseBean dologin(String mobile, String password, HttpServletRequest request) {
        try {


        } catch (Exception e) {
            log.error("登陆出现异常：", e);
        }
        return error();
    }


}
