package com.cloud.product.xunying;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import tk.mybatis.spring.annotation.MapperScan;


@SpringBootApplication
@MapperScan("com.cloud.product.xunying.mapper")
public class XunyingApplication {

    public static void main(String[] args) {
        SpringApplication.run(XunyingApplication.class, args);
    }

}
