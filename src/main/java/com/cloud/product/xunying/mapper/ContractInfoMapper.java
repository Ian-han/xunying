package com.cloud.product.xunying.mapper;

import com.cloud.product.xunying.entity.ContractInfo;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import tk.mybatis.mapper.common.Mapper;
import tk.mybatis.mapper.common.MySqlMapper;

import java.util.List;


public interface ContractInfoMapper extends Mapper<ContractInfo>, MySqlMapper<ContractInfo> {


    @Insert("insert into CONTRACT_INFO " +
            "(contract_number, product_purchaser , product_seller , contract_amount , contract_date , deliver_address , salesman , quality_clauses , payment_method," +
            "charging_method, others_clauses ,remark) values (#{contractNumber}, #{productPurchaser} , #{productSeller} , #{contractAmount} , #{contractDate}, " +
            "#{deliverAddress} , #{salesman} , #{qualityClauses}, #{paymentMethod} ,#{chargingMethod} ,#{othersClauses},  #{remark} )")
    Integer saveContractInfo(ContractInfo contractInfo);

    @Select("select contract_number as contractNumber, product_purchaser as productPurchaser, product_seller as productSeller, contract_amount as contractAmount," +
            "contract_date as contractDate, deliver_address as deliverAddress, salesman as salesman, quality_clauses as qualityClauses, payment_method as paymentMethod," +
            "charging_method as chargingMethod, others_clauses as othersClauses,remark from CONTRACT_INFO")
    List<ContractInfo> getAllContractInfoRecords();

    @Select("select contract_number from CONTRACT_INFO")
    List<String> getAllContractNumber();
}
