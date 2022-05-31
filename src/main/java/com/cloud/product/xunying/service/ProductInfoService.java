package com.cloud.product.xunying.service;


import com.cloud.product.xunying.entity.ProductInfo;

import java.util.List;

public interface ProductInfoService {

    Integer saveProductInfo(ProductInfo productInfo);

    Integer updateProductInfoByNumber(ProductInfo productInfo);

    List<ProductInfo> getAllProductInfoByProductNumber(String productNumber);

    List<ProductInfo> getAllProductInfo();

//    Integer updateRemainCountForProduct(double remainCount, String productNumber);
}
