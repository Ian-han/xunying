package com.cloud.product.xunying.service.impl;

import com.cloud.product.xunying.entity.MaterialInfo;
import com.cloud.product.xunying.mapper.MaterialInfoMapper;
import com.cloud.product.xunying.service.MaterialInfoService;
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
public class MaterialInfoServiceImpl implements MaterialInfoService, Serializable {

    /**
     * serialVersionUID
     */
    private static final long serialVersionUID = -1L;

    private static final Logger logger = LoggerFactory.getLogger(MaterialInfoService.class);

    @Autowired
    MaterialInfoMapper materialInfoMapper;

    @Override
    public Integer saveMaterialInfo(MaterialInfo materialInfo){
        int result = 0;

        if (null != materialInfo && null != materialInfo.getMaterialNumber()){
            try{
                result = materialInfoMapper.saveMaterialInfo(materialInfo);
            }catch (PersistenceException e) {
                logger.error("Save material info failed with error " + e.getMessage());
            }
        }else {
            logger.error("Material entity or material number is null");
        }
        return result;
    }

    @Override
    public Integer updateMaterialInfoByNumber(MaterialInfo materialInfo){
        Integer result = null;

        if (null != materialInfo && null != materialInfo.getMaterialInfoId() && null != materialInfo.getMaterialNumber()){
            try{
                result = materialInfoMapper.updateMaterialInfoByNumber(materialInfo);
            }catch (PersistenceException e) {
                logger.error("Save material info failed with error" + e.getMessage());
            }
        }else {
            logger.error("Material entity or material id is null");
        }
        return result;
    }

    @Override
    public List<MaterialInfo> getAllMaterialInfoRecords(){

        List<MaterialInfo> materialInfoList = new ArrayList<>();

        try{
            materialInfoList = materialInfoMapper.selectAll();
        }catch (PersistenceException e) {
            logger.error("Get material info failed with error" + e.getMessage());
        }
        return materialInfoList;
    }

    @Override
    public List<MaterialInfo> getAllMaterialInfoByNumber(String materialNumber){
        List<MaterialInfo> materialInfoList = new ArrayList<>();

        try{
            materialInfoList = materialInfoMapper.getAllMaterialInfoByNumber(materialNumber);
        }catch (PersistenceException e) {
            logger.error("Get material info failed with error" + e.getMessage());
        }
        return materialInfoList;
    }

    public Integer updateRemainCountForMaterial(double remainCount, String materialNumber){
        Integer re = null;
        if (materialNumber != null){
            try {
                re = materialInfoMapper.updateRemainCountForMaterial(remainCount,materialNumber);
            }catch (PersistenceException e) {
                logger.error("Get material info failed with error" + e.getMessage());
            }
        }
        return re;
    }


}
