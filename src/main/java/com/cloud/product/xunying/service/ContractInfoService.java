package com.cloud.product.xunying.service;

import com.cloud.product.xunying.entity.ContractInfo;

import java.util.List;

public interface ContractInfoService {

    Integer saveContractInfo(ContractInfo contractInfo);

    List<ContractInfo> getAllContractInfoRecords();

    List<String> getAllContractNumber();
}
