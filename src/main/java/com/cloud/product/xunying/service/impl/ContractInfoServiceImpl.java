package com.cloud.product.xunying.service.impl;

import com.cloud.product.xunying.entity.ContractInfo;
import com.cloud.product.xunying.mapper.ContractInfoMapper;
import com.cloud.product.xunying.service.ContractInfoService;
import com.cloud.product.xunying.util.ContractUtil;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.PersistenceException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ContractInfoServiceImpl implements ContractInfoService, Serializable {

    /**
     * serialVersionUID
     */
    private static final long serialVersionUID = -1L;

    private static final Logger logger = LoggerFactory.getLogger(ContractInfoService.class);

    @Autowired
    ContractUtil contractUtil;

    @Autowired
    ContractInfoMapper contractInfoMapper;

    @Override
    public Integer saveContractInfo(ContractInfo contractInfo){
        int result = 0;

        if (null != contractInfo){
            if (StringUtils.isBlank(contractInfo.getContractNumber())){
                contractInfo.setContractNumber(contractUtil.getAutoGenerateContractNumber());
            }
            try{
                result = contractInfoMapper.saveContractInfo(contractInfo);
            }catch (PersistenceException e) {
                logger.error("Save contract info failed with error " + e.getMessage());
            }
        }else {
            logger.error("Contract entity is null");
        }
        return result;
    }

    @Override
    public List<ContractInfo> getAllContractInfoRecords(){

        List<ContractInfo> contractInfos = new ArrayList<>();

        try{
            contractInfos = contractInfoMapper.getAllContractInfoRecords();
        }catch (PersistenceException e) {
            logger.error("Get contract info failed with error" + e.getMessage());
        }
        return contractInfos;
    }

    @Override
    public List<String> getAllContractNumber(){
        List<String> contractNos = new ArrayList<>();
        try{
            contractNos = contractInfoMapper.getAllContractNumber();
        }catch (PersistenceException e) {
            logger.error("Get contract number failed with error" + e.getMessage());
        }
        return contractNos;
    }
}
