package com.cloud.product.xunying.mapper;

import com.cloud.product.xunying.entity.Prodetails;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import tk.mybatis.mapper.common.Mapper;
import tk.mybatis.mapper.common.MySqlMapper;

import java.util.List;

public interface ProdetailsMapper extends Mapper<Prodetails>, MySqlMapper<Prodetails>{

    @Insert("insert into PRODUCT_DETAILS values (id, #{productNo}, #{project}, #{type}, #{location}, #{salesman}, " +
            "#{date}, #{size}, #{quantity}, #{note} ,#{matters})")
    Integer saveProdetails(Prodetails prodetails);

    @Select("select distinct(product_no) as productNo, project, type, location, salesman, date, matters from PRODUCT_DETAILS")
    List<Prodetails> getProdetails();

    @Select("select * from PRODUCT_DETAILS where product_no = #{productNo}")
    List<Prodetails> getProdetailsByProductNo(@Param("productNo") String productNo);

    @Delete("delete from PRODUCT_DETAILS where product_no = #{productNo}")
    Integer deleteProdetailsByProductNo(@Param("productNo") String productNo);


    @Delete("delete from PRODUCT_DETAILS where product_no = #{productNo} and size = #{size}")
    Integer deleteProdetailsByProductNoAndSize(@Param("productNo") String productNo, @Param("size")Integer size);

    @Select("select 1 from PRODUCT_DETAILS where product_no = #{productNo} and size = #{size}")
    Integer selectProdetailsByProductNoAndSize(@Param("productNo") String productNo, @Param("size")Integer size);
}
