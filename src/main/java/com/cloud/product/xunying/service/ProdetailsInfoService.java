package com.cloud.product.xunying.service;

import com.cloud.product.xunying.bean.KeyBean;
import com.cloud.product.xunying.entity.Prodetails;

import java.util.List;

public interface ProdetailsInfoService {

    Integer saveProdetails(Prodetails prodetails) throws Exception;

    List<Prodetails> getProDetails();

    List<Prodetails> getProdetailsByProductNo(String productNO);

    Integer deleteProdetailsByProductNo (String productNO);

    Integer deleteProdetailsByProductNoAndSize (KeyBean keyBean);
}
