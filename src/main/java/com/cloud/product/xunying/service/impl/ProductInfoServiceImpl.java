package com.cloud.product.xunying.service.impl;

import com.cloud.product.xunying.entity.ProductInfo;
import com.cloud.product.xunying.mapper.ProductInfoMapper;
import com.cloud.product.xunying.service.MaterialInfoService;
import com.cloud.product.xunying.service.ProductInfoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.PersistenceException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductInfoServiceImpl implements ProductInfoService, Serializable {

    /**
     * serialVersionUID
     */
    private static final long serialVersionUID = -1L;

    private static final Logger logger = LoggerFactory.getLogger(MaterialInfoService.class);

    @Autowired
    ProductInfoMapper productInfoMapper;


    @Override
    public Integer saveProductInfo(ProductInfo productInfo) {
        int result = 0;

        if (null != productInfo){
            try{
                result = productInfoMapper.saveProductInfo(productInfo);
            }catch (PersistenceException e) {
                logger.error("Save product info failed with error " + e.getMessage());
            }
        }else {
            logger.error("Product entity is null");
        }
        return result;
    }

    @Override
    public Integer updateProductInfoByNumber(ProductInfo productInfo) {
        Integer result = null;

        if (null != productInfo && null != productInfo.getProductInfoId() && null != productInfo.getProductNumber()){
            try{
                result = productInfoMapper.updateProductInfoByProductNumber(productInfo);
            }catch (PersistenceException e) {
                logger.error("Save product info failed with error" + e.getMessage());
            }
        }else {
            logger.error("Product entity or product number is null");
        }
        return result;
    }

    @Override
    public List<ProductInfo> getAllProductInfoByProductNumber(String productNumber) {
        List<ProductInfo> productInfoList = new ArrayList<>();

        try{
            productInfoList = productInfoMapper.getAllProductInfoByProductNumber(productNumber);
        }catch (PersistenceException e) {
            logger.error("Get product info failed with error" + e.getMessage());
        }
        return productInfoList;
    }

    @Override
    public List<ProductInfo> getAllProductInfo() {
        List<ProductInfo> productInfoList = new ArrayList<>();

        try{
            productInfoList = productInfoMapper.getAllProductInfo();
        }catch (PersistenceException e) {
            logger.error("Get product info failed with error" + e.getMessage());
        }
        return productInfoList;
    }

//    @Override
//    public Integer updateRemainCountForProduct(double remainCount, String productNumber) {
//        Integer re = null;
//        if (productNumber != null){
//            try {
//                re = productInfoMapper.updateRemainCountForProduct(remainCount,productNumber);
//            }catch (PersistenceException e) {
//                logger.error("Get product info failed with error" + e.getMessage());
//            }
//        }
//        return re;
//    }
}
