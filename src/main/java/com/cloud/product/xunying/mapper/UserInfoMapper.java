package com.cloud.product.xunying.mapper;

import com.cloud.product.xunying.entity.UserInfo;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import tk.mybatis.mapper.common.Mapper;
import tk.mybatis.mapper.common.MySqlMapper;

public interface UserInfoMapper extends Mapper<UserInfo>, MySqlMapper<UserInfo> {

    @Select("select * from USER_INFO where USER_ID=#{userId}")
    UserInfo getUserById(@Param("userId") String userId);

}
