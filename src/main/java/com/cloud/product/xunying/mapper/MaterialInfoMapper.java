package com.cloud.product.xunying.mapper;

import com.cloud.product.xunying.entity.MaterialInfo;
import org.apache.ibatis.annotations.*;
import tk.mybatis.mapper.common.Mapper;
import tk.mybatis.mapper.common.MySqlMapper;

import java.util.List;

public interface MaterialInfoMapper extends Mapper<MaterialInfo>, MySqlMapper<MaterialInfo> {

    @Insert("insert into MATERIAL_INFO " +
            "(contract_number, material_number , material_name , oper_count , stock_price , oper_status , oper_date , oper_user , remain_count ,remark)" +
            "values (#{contractNumber}, #{materialNumber} , #{materialName} , #{operCount} , #{stockPrice} , #{operStatus} , #{operDate} , #{operUser} , #{remainCount} , #{remark} )")
    @Options(useGeneratedKeys=true, keyProperty="materialInfoId", keyColumn="material_info_id")
    Integer saveMaterialInfo(MaterialInfo materialInfo);

    @Update("update MATERIAL_INFO set contract_number=#{contractNumber}, material_number=#{materialNumber}, material_name=#{materialName}, oper_count=#{operCount}," +
            "stock_price=#{stockPrice},oper_status=#{operStatus},oper_date=#{operDate}" +
            ",oper_user=#{operUser},remain_count=#{remainCount},remark=#{remark} where material_info_id=#{materialInfoId}")
    Integer updateMaterialInfoByNumber(MaterialInfo materialInfo);

    @Select("select contract_number as contractNumber, material_info_id as materialInfoId, material_number as materialNumber, material_name as materialName," +
            "oper_count as operCount,stock_price as stockPrice, oper_status as operStatus, oper_date as operDate," +
            "oper_user as operUser, remain_count as remainCount, remark from MATERIAL_INFO where material_number=#{materialNumber}")
    List<MaterialInfo> getAllMaterialInfoByNumber(@Param("materialNumber") String materialNumber);

    @Update("update MATERIAL_INFO set remain_count=#{remainCount} where material_number=#{materialNumber}")
    Integer updateRemainCountForMaterial(@Param("remainCount") double remainCount, @Param("materialNumber") String materialNumber);
}
