package com.cloud.product.xunying.bean;

import java.io.Serializable;

public class MaterialRemainCountBean implements Serializable {

    /**
     * serialVersionUID
     */
    private static final long serialVersionUID = -1L;

    private String materialNumber;

    private Double remainCount;

    public String getMaterialNumber() {
        return materialNumber;
    }

    public void setMaterialNumber(String materialNumber) {
        this.materialNumber = materialNumber;
    }

    public Double getRemainCount() {
        return remainCount;
    }

    public void setRemainCount(Double remainCount) {
        this.remainCount = remainCount;
    }
}
