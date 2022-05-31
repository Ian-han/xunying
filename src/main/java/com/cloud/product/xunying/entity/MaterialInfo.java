package com.cloud.product.xunying.entity;

import java.io.Serializable;
import java.sql.Date;

public class MaterialInfo implements Serializable {
    /**
     * serialVersionUID
     */
    private static final long serialVersionUID = -1L;

    private String materialInfoId;

    private String contractNumber;

    private String materialNumber;

    private String materialName;

    private Double operCount;

    private Double stockPrice;

    private String operStatus;

    private Date operDate;

    private String operUser;

    private Double remainCount;

    private String remark;

    public String getMaterialInfoId() {
        return materialInfoId;
    }

    public String getContractNumber() {
        return contractNumber;
    }

    public void setContractNumber(String contractNumber) {
        this.contractNumber = contractNumber;
    }

    public String getMaterialNumber() {
        return materialNumber;
    }

    public void setMaterialNumber(String materialNumber) {
        this.materialNumber = materialNumber;
    }

    public String getMaterialName() {
        return materialName;
    }

    public void setMaterialName(String materialName) {
        this.materialName = materialName;
    }

    public Double getOperCount() {
        return operCount;
    }

    public void setOperCount(Double operCount) {
        this.operCount = operCount;
    }

    public Double getStockPrice() {
        return stockPrice;
    }

    public void setStockPrice(Double stockPrice) {
        this.stockPrice = stockPrice;
    }

    public String getOperStatus() {
        return operStatus;
    }

    public void setOperStatus(String operStatus) {
        this.operStatus = operStatus;
    }

    public Date getOperDate() {
        return operDate;
    }

    public void setOperDate(Date operDate) {
        this.operDate = operDate;
    }

    public String getOperUser() {
        return operUser;
    }

    public void setOperUser(String operUser) {
        this.operUser = operUser;
    }

    public Double getRemainCount() {
        return remainCount;
    }

    public void setRemainCount(Double remainCount) {
        this.remainCount = remainCount;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}
