package com.cloud.product.xunying.entity;

import java.io.Serializable;
import java.sql.Date;

public class ContractInfo implements Serializable {
    /**
      * serialVersionUID
     */
    private static final long serialVersionUID = -1L;

    private String contractNumber;
    private String productPurchaser;
    private String productSeller;
    private Double contractAmount;
    private Date contractDate;
    private String deliverAddress;
    private String salesman;
    private String qualityClauses;
    private String paymentMethod;
    private String chargingMethod;
    private String othersClauses;
    private String remark;

    public String getContractNumber() {
        return contractNumber;
    }

    public void setContractNumber(String contractNumber) {
        this.contractNumber = contractNumber;
    }

    public String getProductPurchaser() {
        return productPurchaser;
    }

    public void setProductPurchaser(String productPurchaser) {
        this.productPurchaser = productPurchaser;
    }

    public String getProductSeller() {
        return productSeller;
    }

    public void setProductSeller(String productSeller) {
        this.productSeller = productSeller;
    }

    public Double getContractAmount() {
        return contractAmount;
    }

    public void setContractAmount(Double contractAmount) {
        this.contractAmount = contractAmount;
    }

    public Date getContractDate() {
        return contractDate;
    }

    public void setContractDate(Date contractDate) {
        this.contractDate = contractDate;
    }

    public String getDeliverAddress() {
        return deliverAddress;
    }

    public void setDeliverAddress(String deliverAddress) {
        this.deliverAddress = deliverAddress;
    }

    public String getSalesman() {
        return salesman;
    }

    public void setSalesman(String salesman) {
        this.salesman = salesman;
    }

    public String getQualityClauses() {
        return qualityClauses;
    }

    public void setQualityClauses(String qualityClauses) {
        this.qualityClauses = qualityClauses;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getChargingMethod() {
        return chargingMethod;
    }

    public void setChargingMethod(String chargingMethod) {
        this.chargingMethod = chargingMethod;
    }

    public String getOthersClauses() {
        return othersClauses;
    }

    public void setOthersClauses(String othersClauses) {
        this.othersClauses = othersClauses;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}
