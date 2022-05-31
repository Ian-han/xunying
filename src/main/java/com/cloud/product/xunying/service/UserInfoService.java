package com.cloud.product.xunying.service;

import com.cloud.product.xunying.entity.UserInfo;

public interface UserInfoService {

    int saveUserInfo(UserInfo userInfo);

    UserInfo getUserInfoById(String userId);
}
