package com.a503.churros;

import java.util.TimeZone;
import javax.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@SpringBootApplication
public class ChurrosApplication {
	@PostConstruct
    void started() {
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
    }
	public static void main(String[] args) {
		SpringApplication.run(ChurrosApplication.class, args);
	}

}
