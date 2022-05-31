package com.cloud.product.xunying.service.impl;

import com.cloud.product.xunying.bean.KeyBean;
import com.cloud.product.xunying.entity.Prodetails;
import com.cloud.product.xunying.mapper.ProdetailsMapper;
import com.cloud.product.xunying.service.ProdetailsInfoService;
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

/**
 * @author ：Han
 * @date ：Created in 2022/2/13 2:34 PM
 * @description：
 */
@Service
@Transactional
public class ProdetailsInfoServiceImpl implements ProdetailsInfoService, Serializable {

    /**
     * serialVersionUID
     */
    private static final long serialVersionUID = -1L;

    private static final Logger logger = LoggerFactory.getLogger(ProdetailsInfoService.class);

    @Autowired
    ProdetailsMapper prodetailsMapper;

    @Override
    public Integer saveProdetails(Prodetails prodetails) throws Exception {
        int result = 0;

        if (null != prodetails){
            if (StringUtils.isBlank(prodetails.getProductNo())){
                throw new Exception("产品编号不能为空！");
            }
            try{
                Integer pd = prodetailsMapper.selectProdetailsByProductNoAndSize(
                        prodetails.getProductNo(), prodetails.getSize());
                if (pd == null){
                    result = prodetailsMapper.saveProdetails(prodetails);
                }else {
                    return -5;
                }
            }catch (PersistenceException e) {
                logger.error("Save product details failed with error " + e.getMessage());
            }
        }else {
            logger.error("Product details entity is null");
        }
        return result;

    }

    @Override
    public List<Prodetails> getProDetails(){
        List<Prodetails> prodetails = new ArrayList<>();

        try{
            prodetails = prodetailsMapper.getProdetails();
        }catch (PersistenceException e) {
            logger.error("Get prodetails info failed with error" + e.getMessage());
        }
        return prodetails;
    }

    @Override
    public List<Prodetails> getProdetailsByProductNo(String productNO){
        List<Prodetails> prodetails = new ArrayList<>();

        try{
            prodetails = prodetailsMapper.getProdetailsByProductNo(productNO);
        }catch (PersistenceException e) {
            logger.error("Get prodetails info failed with error" + e.getMessage());
        }
        return prodetails;
    }

    @Override
    public Integer deleteProdetailsByProductNo (String productNO){
        int result = 0;

        if (!StringUtils.isBlank(productNO)){
            try{
                result = prodetailsMapper.deleteProdetailsByProductNo(productNO);
            }catch (PersistenceException e) {
                logger.error("Delete product details failed with error " + e.getMessage());
            }
        }else {
            logger.error("Product details No is null");
        }
        return result;
    }

    @Override
    public Integer deleteProdetailsByProductNoAndSize (KeyBean keyBean){
        int result = 0;

        if (!StringUtils.isBlank(keyBean.getProductNo()) || keyBean.getSize() == null){
            try{
                result = prodetailsMapper.deleteProdetailsByProductNoAndSize(keyBean.getProductNo(), keyBean.getSize());
            }catch (PersistenceException e) {
                logger.error("Delete product details failed with error " + e.getMessage());
            }
        }else {
            logger.error("Product details No is null");
        }
        return result;
    }

}
