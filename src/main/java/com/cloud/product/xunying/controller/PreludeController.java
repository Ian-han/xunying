package com.cloud.product.xunying.controller;

import com.cloud.product.xunying.bean.CaptchaBean;
import com.cloud.product.xunying.bean.UserLoginBean;
import com.cloud.product.xunying.entity.UserInfo;
import com.cloud.product.xunying.service.ImageCaptchaService;
import com.cloud.product.xunying.service.UserInfoService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


@Controller
//@RequestMapping("/prelude")
public class PreludeController {

    @Autowired
    UserInfoService userInfoService;

    @Autowired
    ImageCaptchaService imageCaptchaService;

    private static Logger logger = LoggerFactory.getLogger(PreludeController.class);

    private static ObjectMapper objectMapper = new ObjectMapper();

    @RequestMapping({"/login", "/prelude/login"})
    public String Login() {
        logger.info("enter into login page");
        return "prelude/login";
    }

    @RequestMapping(value = "/prelude/register")
    public String Register() {
        logger.info("enter into register page");
        return "prelude/register";
    }

    @RequestMapping(value = "prelude/verifyLogin", method = RequestMethod.POST)
    public @ResponseBody String verifyUserLogin(HttpServletRequest request, @RequestBody UserLoginBean userLogin) throws JsonProcessingException {

        Map<String, Object> result = new HashMap<String, Object>();

        String userId = userLogin.getUserId();
        UserInfo userInfo = userInfoService.getUserInfoById(userId);

        if (userInfo != null) {
            if (!userLogin.getPassword().equals(userInfo.getPassword())) {
                result.put("pwdMsg", "用户名密码错误");
            }
            result.put("user", userLogin);
            HttpSession session = request.getSession();
            session.setAttribute("UserLogin", userLogin);
        } else {
            result.put("accountMsg", "用户名不存在");
        }
        String resultJson = objectMapper.writeValueAsString(result);
        return resultJson;
    }

    @RequestMapping(value = "prelude/saveRegisterInfo", method = RequestMethod.POST)
    public @ResponseBody String saveUserRegisterInfo(HttpServletRequest request, @RequestBody UserInfo userInfo) throws JsonProcessingException  {
       int result =  userInfoService.saveUserInfo(userInfo);
        Map<String, String> resultMsg = new HashMap<String, String>();
        if (result == 1) {
            resultMsg.put("resultMsg", "success");
        } else {
            resultMsg.put("resultMsg", "failed");
        }
       return objectMapper.writeValueAsString(resultMsg);
    }

    @RequestMapping(value = "prelude/getCaptcha", method = RequestMethod.GET)
    public void getCaptcha(HttpServletRequest request, HttpServletResponse response) throws IOException {
        imageCaptchaService.getImage(request, response);
    }

    @RequestMapping(value = "prelude/varifyCaptcha", method = RequestMethod.POST)
    public @ResponseBody String verifyCaptcha(HttpServletRequest request, @RequestBody CaptchaBean captcha) throws JsonProcessingException {
        String sRand = imageCaptchaService.getsRand();
        Map<String, String> result = new HashMap<String, String>();
        if (captcha.getCaptcha().equals(sRand)) {
            result.put("resultMsg", "success");
        } else {
            result.put("resultMsg", "success");
        }
        String resultJson = objectMapper.writeValueAsString(result);

        return resultJson;
    }
}
