package com.cloud.product.xunying.entity;

import java.io.Serializable;
import java.sql.Date;

public class ProductInfo implements Serializable {

    /**
     * serialVersionUID
     */
    private static final long serialVersionUID = -1L;

    private String productInfoId;

    private String contractNumber;

    private String productNumber;

    private String productName;

    private String productType;

    private String texture;

    private String operStatus;

    private Double operCount;

    private String unit;

    private Double sellPrice;

    private String productPurchaser;

    private Date operDate;

    private String operUser;

  //  private Double remainCount;

    private String remark;

    public String getProductInfoId() {
        return productInfoId;
    }

    public String getContractNumber() {
        return contractNumber;
    }

    public void setContractNumber(String contractNumber) {
        this.contractNumber = contractNumber;
    }

    public String getProductNumber() {
        return productNumber;
    }

    public void setProductNumber(String productNumber) {
        this.productNumber = productNumber;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductType() {
        return productType;
    }

    public void setProductType(String productType) {
        this.productType = productType;
    }

    public String getTexture() {
        return texture;
    }

    public void setTexture(String texture) {
        this.texture = texture;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getOperStatus() {
        return operStatus;
    }

    public void setOperStatus(String operStatus) {
        this.operStatus = operStatus;
    }

    public Double getOperCount() {
        return operCount;
    }

    public void setOperCount(Double operCount) {
        this.operCount = operCount;
    }

    public Double getSellPrice() {
        return sellPrice;
    }

    public void setSellPrice(Double sellPrice) {
        this.sellPrice = sellPrice;
    }

    public String getProductPurchaser() {
        return productPurchaser;
    }

    public void setProductPurchaser(String productPurchaser) {
        this.productPurchaser = productPurchaser;
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

//    public Double getRemainCount() {
//        return remainCount;
//    }
//
//    public void setRemainCount(Double remainCount) {
//        this.remainCount = remainCount;
//    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}
