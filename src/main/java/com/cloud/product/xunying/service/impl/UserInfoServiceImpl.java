package com.cloud.product.xunying.service.impl;



import javax.persistence.PersistenceException;

import com.cloud.product.xunying.mapper.UserInfoMapper;
import com.cloud.product.xunying.entity.UserInfo;
import com.cloud.product.xunying.service.UserInfoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;


@Service
@Transactional
public class UserInfoServiceImpl implements UserInfoService, Serializable {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -1L;


	@Autowired
	private UserInfoMapper userInfoMapper;
	
	private static final Logger logger = LoggerFactory.getLogger(UserInfoService.class);

	/**
	 * persist UserInfo
	 * 
	 * @param userInfo
	 * @return
	 */
	@Override
	public int saveUserInfo(UserInfo userInfo) {

		int result = 0;

		if (null != userInfo && userInfo.getUserId() != null) {
			try {
			 	result = userInfoMapper.insert(userInfo);
			} catch (PersistenceException e) {
				logger.error("save employee failed with error " + e.getMessage());
			}
		} else {
			logger.error("Employee entity or employee userId is null");
		}

		return result;

	}

	/**
	 * query UserInfo by userId
	 * 
	 * @param userId
	 * @return
	 */

	@Override
	public UserInfo getUserInfoById(String userId) {
		UserInfo userInfo = null;
		try {
				userInfo = userInfoMapper.getUserById(userId);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		} catch (PersistenceException e) {
			e.printStackTrace();
		}

		return userInfo;
	}
}
