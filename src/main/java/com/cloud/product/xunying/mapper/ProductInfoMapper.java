package com.cloud.product.xunying.mapper;

import com.cloud.product.xunying.entity.ProductInfo;
import org.apache.ibatis.annotations.*;
import tk.mybatis.mapper.common.Mapper;
import tk.mybatis.mapper.common.MySqlMapper;

import java.util.List;

public interface ProductInfoMapper extends Mapper<ProductInfo>, MySqlMapper<ProductInfo> {

    @Insert("insert into PRODUCT_INFO " +
            "(contract_number, product_number , product_name, product_type, texture ,oper_status , oper_count ,unit, sell_price , product_purchaser, oper_date , oper_user ," +
            " remark) values (#{contractNumber}, #{productNumber} , #{productName}, #{productType}, #{texture} , #{operStatus} ,#{operCount}, #{unit} , #{sellPrice} , " +
            "#{productPurchaser}, #{operDate} , #{operUser} , #{remark} )")
    @Options(useGeneratedKeys=true, keyProperty="productInfoId", keyColumn="product_info_id")
    Integer saveProductInfo(ProductInfo productInfo);

    @Update("update PRODUCT_INFO set contract_number=#{contractNumber}, product_number=#{productNumber}, product_name=#{productName}, product_type=#{productType},texture=#{texture}" +
            ",oper_status=#{operStatus}, oper_count=#{operCount},unit=#{unit}, sell_price=#{sellPrice},product_purchaser=#{productPurchaser},oper_date=#{operDate}" +
            ",oper_user=#{operUser},remark=#{remark} where product_info_id=#{productInfoId}")
    Integer updateProductInfoByProductNumber(ProductInfo productInfo);

    @Select("select contract_number as contractNumber, product_info_id as productInfoId, product_number as productNumber, product_name as productName," +
            "product_type as productType, texture, oper_status as operStatus, oper_count as operCount, unit, sell_price as sellPrice,product_purchaser as productPurchaser," +
            " oper_date as operDate,oper_user as operUser, remark from PRODUCT_INFO where product_number=#{productNumber}")
    List<ProductInfo> getAllProductInfoByProductNumber(@Param("productNumber") String productNumber);

    @Select("select contract_number as contractNumber, product_info_id as productInfoId, product_number as productNumber, product_name as productName," +
            "product_type as productType, texture, oper_status as operStatus, oper_count as operCount, unit, sell_price as sellPrice,product_purchaser as productPurchaser," +
            " oper_date as operDate,oper_user as operUser, remark from PRODUCT_INFO")
    List<ProductInfo> getAllProductInfo();

//    @Update("update PRODUCT_INFO set remain_count=#{remainCount} where product_number=#{productNumber}")
//    Integer updateRemainCountForProduct(@Param("remainCount") double remainCount, @Param("productNumber") String productNumber);
}
