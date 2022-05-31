package com.cloud.product.xunying.util;

import com.cloud.product.xunying.mapper.ContractInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Component
public class ContractUtil {

    @Autowired
    ContractInfoMapper contractInfoMapper;

    private static final String CONTRACT_NUMBER_PREFIX = "xy";

    private static final String INITIAL_CONTRACT_NUMBER = "6000001";

    public String getAutoGenerateContractNumber(){
       // String latestContractNumber = null;

        List<String> contractNumbers = contractInfoMapper.getAllContractNumber();
        if (contractNumbers.isEmpty()){
            return CONTRACT_NUMBER_PREFIX + INITIAL_CONTRACT_NUMBER;
        }

        List<Integer> newContractNos = new ArrayList<>();
        for (String contractNumber:contractNumbers) {
            newContractNos.add(Integer.parseInt(contractNumber.replace("xy","")));
        }

        Collections.sort(newContractNos);

        return CONTRACT_NUMBER_PREFIX + (newContractNos.get(contractNumbers.size()-1)+1);
    }
}
