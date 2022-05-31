package com.cloud.product.xunying.service;

import com.cloud.product.xunying.entity.MaterialInfo;

import java.util.List;

public interface MaterialInfoService {

    Integer saveMaterialInfo(MaterialInfo materialInfo);

    Integer updateMaterialInfoByNumber(MaterialInfo materialInfo);

    List<MaterialInfo> getAllMaterialInfoRecords();

    List<MaterialInfo> getAllMaterialInfoByNumber(String materialNumber);

    Integer updateRemainCountForMaterial(double remainCount, String materialNumber);
}
