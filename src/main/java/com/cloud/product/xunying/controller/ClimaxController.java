package com.cloud.product.xunying.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.cloud.product.xunying.bean.KeyBean;
import com.cloud.product.xunying.bean.MaterialRemainCountBean;
import com.cloud.product.xunying.entity.ContractInfo;
import com.cloud.product.xunying.entity.MaterialInfo;
import com.cloud.product.xunying.entity.Prodetails;
import com.cloud.product.xunying.entity.ProductInfo;
import com.cloud.product.xunying.service.ContractInfoService;
import com.cloud.product.xunying.service.MaterialInfoService;
import com.cloud.product.xunying.service.ProdetailsInfoService;
import com.cloud.product.xunying.service.ProductInfoService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Controller
//@RequestMapping("/climax")
public class ClimaxController {
	
	private static Logger logger = LoggerFactory.getLogger(ClimaxController.class.getName());
	
	private ObjectMapper objectMapper = new ObjectMapper();

	@Autowired
	MaterialInfoService materialInfoService;

	@Autowired
	ProductInfoService productInfoService;

	@Autowired
	ContractInfoService contractInfoService;

	@Autowired
	ProdetailsInfoService prodetailsInfoService;
	
	@RequestMapping("climax/home")
	public String homePage(){
		logger.info("enter into home page");
		return "climax/home";
	}

	@RequestMapping("climax/material")
	public String materialPage(){
		return "climax/material";
	}


	@RequestMapping("climax/product")
	public String productPage(){
		return "climax/product";
	}

	@RequestMapping("climax/contract")
	public String futurePage(){
		return "climax/contract";
	}

	@RequestMapping("climax/prodetails")
	public String prodetailsPage(){
		return "climax/prodetails";
	}

	@RequestMapping("climax/report")
	public String reportPage(){
		return "climax/report";
	}

	
	@RequestMapping(value = "climax/getHttpSessionObj", method = RequestMethod.GET)
	public @ResponseBody Object getHttpSession(HttpServletRequest request){
		HttpSession session = request.getSession();
		Object sessionObj = session.getAttribute("UserLogin");
		return sessionObj;
	}
	
	@RequestMapping(value = "climax/clearHttpSession", method = RequestMethod.GET)
	public void clearHttpSession(HttpServletRequest request){
		HttpSession session = request.getSession();
		session.invalidate();
	}

	@RequestMapping(value = "climax/saveMaterialInfo", method = RequestMethod.POST)
	public @ResponseBody String saveMaterialInfo(HttpServletRequest request, @RequestBody MaterialInfo materialInfo) throws JsonProcessingException {
		if (materialInfo != null){
			List<MaterialInfo> materialInfoList = materialInfoService.getAllMaterialInfoByNumber(materialInfo.getMaterialNumber());
			if (!materialInfoList.isEmpty()){
				if (materialInfo.getRemainCount() != materialInfoList.get(0).getRemainCount()){
					if (materialInfo.getOperStatus().equals("进库")){
						materialInfo.setRemainCount(materialInfoList.get(0).getRemainCount() + materialInfo.getOperCount());
					}else {
						materialInfo.setRemainCount(materialInfoList.get(0).getRemainCount() - materialInfo.getOperCount());
					}
				}
				int re = materialInfoService.updateRemainCountForMaterial(materialInfo.getRemainCount(), materialInfo.getMaterialNumber());
			}else{
				if (materialInfo.getOperStatus().equals("进库")) {
					materialInfo.setRemainCount(materialInfo.getOperCount());
				}else {
					logger.error("we have no remain count for this material");
				}
			}

			int result =  materialInfoService.saveMaterialInfo(materialInfo);
			Map<String, String> resultMsg = new HashMap<String, String>();
			if (result == 1) {
				resultMsg.put("resultMsg", "success");
			} else {
				resultMsg.put("resultMsg", "failed");
			}

			return objectMapper.writeValueAsString(resultMsg);
		}
		return null;
	}

	@RequestMapping(value = "climax/updateMaterialInfo", method = RequestMethod.POST)
	public @ResponseBody String updateMaterialInfo(HttpServletRequest request, @RequestBody MaterialInfo materialInfo) throws JsonProcessingException {
		Integer result =  materialInfoService.updateMaterialInfoByNumber(materialInfo);
		Map<String, String> resultMsg = new HashMap<String, String>();
		if (result == 1) {
			resultMsg.put("resultMsg", "success");
		} else {
			resultMsg.put("resultMsg", "failed");
		}
		return objectMapper.writeValueAsString(resultMsg);
	}

	@RequestMapping(value = "climax/getMaterialInfo", method = RequestMethod.GET)
	public @ResponseBody String getAllMaterialInfo(HttpServletRequest request) throws JsonProcessingException {
		List<MaterialInfo> result =  materialInfoService.getAllMaterialInfoRecords();
		Map<String, Object> resultMsg = new HashMap<String, Object>();
		if (!result.isEmpty()) {
			resultMsg.put("resultMsg", result);
		} else {
			resultMsg.put("resultMsg", null);
		}
		return objectMapper.writeValueAsString(resultMsg);
	}

	@RequestMapping(value = "climax/updateMaterialRemainCount", method = RequestMethod.POST)
	public @ResponseBody String updateMaterialRemainCount(HttpServletRequest request, @RequestBody MaterialRemainCountBean materialRemainCountBean) throws JsonProcessingException {

		Integer result =  materialInfoService.updateRemainCountForMaterial(materialRemainCountBean.getRemainCount(),materialRemainCountBean.getMaterialNumber());
		Map<String, String> resultMsg = new HashMap<String, String>();
		if (result == 1) {
			resultMsg.put("resultMsg", "success");
		} else {
			resultMsg.put("resultMsg", "failed");
		}
		return objectMapper.writeValueAsString(resultMsg);
	}


	@RequestMapping(value = "climax/saveProductInfo", method = RequestMethod.POST)
	public @ResponseBody String saveProductInfo(HttpServletRequest request, @RequestBody ProductInfo productInfo) throws JsonProcessingException {
		if (productInfo != null){
			int result =  productInfoService.saveProductInfo(productInfo);
			Map<String, String> resultMsg = new HashMap<String, String>();
			if (result == 1) {
				resultMsg.put("resultMsg", "success");
			} else {
				resultMsg.put("resultMsg", "failed");
			}

			return objectMapper.writeValueAsString(resultMsg);
		}
		return null;
	}

	@RequestMapping(value = "climax/getProductInfo", method = RequestMethod.GET)
	public @ResponseBody String getAllProductInfo(HttpServletRequest request) throws JsonProcessingException {
		List<ProductInfo> result =  productInfoService.getAllProductInfo();
		Map<String, Object> resultMsg = new HashMap<String, Object>();
		if (!result.isEmpty()) {
			resultMsg.put("resultMsg", result);
		} else {
			resultMsg.put("resultMsg", null);
		}
		return objectMapper.writeValueAsString(resultMsg);
	}

	@RequestMapping(value = "climax/updateProductInfo", method = RequestMethod.POST)
	public @ResponseBody String updateProductInfo(HttpServletRequest request, @RequestBody ProductInfo productInfo) throws JsonProcessingException {
		Integer result =  productInfoService.updateProductInfoByNumber(productInfo);
		Map<String, String> resultMsg = new HashMap<String, String>();
		if (result == 1) {
			resultMsg.put("resultMsg", "success");
		} else {
			resultMsg.put("resultMsg", "failed");
		}
		return objectMapper.writeValueAsString(resultMsg);
	}

	@RequestMapping(value = "climax/saveContractInfo", method = RequestMethod.POST)
	public @ResponseBody String saveContractInfo(HttpServletRequest request, @RequestBody ContractInfo contractInfo) throws JsonProcessingException {
		if (contractInfo != null){
			int result =  contractInfoService.saveContractInfo(contractInfo);
			Map<String, String> resultMsg = new HashMap<String, String>();
			if (result == 1) {
				resultMsg.put("resultMsg", "success");
			} else {
				resultMsg.put("resultMsg", "failed");
			}

			return objectMapper.writeValueAsString(resultMsg);
		}
		return null;
	}


	@RequestMapping(value = "climax/getContractInfo", method = RequestMethod.GET)
	public @ResponseBody String getAllContractInfo(HttpServletRequest request) throws JsonProcessingException {
		List<ContractInfo> result =  contractInfoService.getAllContractInfoRecords();
		Map<String, Object> resultMsg = new HashMap<String, Object>();
		if (!result.isEmpty()) {
			resultMsg.put("resultMsg", result);
		} else {
			resultMsg.put("resultMsg", null);
		}
		return objectMapper.writeValueAsString(resultMsg);
	}

	@RequestMapping(value = "climax/getContractNos", method = RequestMethod.GET)
	public @ResponseBody String getAllContractNo(HttpServletRequest request) throws JsonProcessingException {
		List<String> result =  contractInfoService.getAllContractNumber();
		Map<String, Object> resultMsg = new HashMap<String, Object>();
		if (!result.isEmpty()) {
			resultMsg.put("resultMsg", result);
		} else {
			resultMsg.put("resultMsg", null);
		}
		return objectMapper.writeValueAsString(resultMsg);
	}

	/********************************************** Prodetails **********************************************************************/

	@RequestMapping(value = "climax/saveProdetails", method = RequestMethod.POST)
	public @ResponseBody String saveProdetails(HttpServletRequest request, @RequestBody Prodetails prodetails) throws Exception {
		if (prodetails != null){
			int result =  prodetailsInfoService.saveProdetails(prodetails);
			Map<String, String> resultMsg = new HashMap<String, String>();
			if (result == 1) {
				resultMsg.put("resultMsg", "success");
			} else if (result == -5){
				resultMsg.put("resultMsg", "duplicated");
			}else {
				resultMsg.put("resultMsg", "failed");
			}

			return objectMapper.writeValueAsString(resultMsg);
		}
		return null;
	}

	@RequestMapping(value = "climax/getProDetails", method = RequestMethod.GET)
	public @ResponseBody String getProDetails(HttpServletRequest request) throws Exception {
		List<Prodetails>  res = prodetailsInfoService.getProDetails();
		Map<String, Object> resultMsg = new HashMap<>();
		if (res != null) {
			resultMsg.put("resultMsg", res);
		} else {
			resultMsg.put("resultMsg", null);
		}

		return objectMapper.writeValueAsString(resultMsg);
	}

	@RequestMapping(value = "climax/getProdetailsByProductNo", method = RequestMethod.POST)
	public @ResponseBody String getProdetailsByProductNo(HttpServletRequest request, @RequestBody String productNO) throws Exception {
		List<Prodetails>  res = prodetailsInfoService.getProdetailsByProductNo(productNO);
		Map<String, Object> resultMsg = new HashMap<>();
		if (res != null) {
			resultMsg.put("resultMsg", res);
		} else {
			resultMsg.put("resultMsg", null);
		}

		return objectMapper.writeValueAsString(resultMsg);
	}


	@RequestMapping(value = "climax/deleteProdetailsByProductNo", method = RequestMethod.POST)
	public @ResponseBody String deleteProdetailsByProductNo(HttpServletRequest request, @RequestBody String productNO) throws Exception {
		int  result = prodetailsInfoService.deleteProdetailsByProductNo(productNO);

		Map<String, String> resultMsg = new HashMap<String, String>();
		if (result == 1) {
			resultMsg.put("resultMsg", "success");
		} else {
			resultMsg.put("resultMsg", "failed");
		}
		return objectMapper.writeValueAsString(resultMsg);
	}

	@RequestMapping(value = "/climax/deleteProdetailsByProductNoAndSize", method = RequestMethod.POST)
	public @ResponseBody String deleteProdetailsByProductNoAndSize(HttpServletRequest request, @RequestBody KeyBean keyBean) throws Exception {
		int  result = prodetailsInfoService.deleteProdetailsByProductNoAndSize(keyBean);

		Map<String, String> resultMsg = new HashMap<String, String>();
		if (result == 1) {
			resultMsg.put("resultMsg", "success");
		} else {
			resultMsg.put("resultMsg", "failed");
		}
		return objectMapper.writeValueAsString(resultMsg);
	}


}
