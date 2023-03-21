package com.a503.churros.dto.user.response;

import lombok.Builder;
import lombok.Data;

import java.util.HashMap;
import java.util.Map;

@Data
public class MyPageResponse {

    private String result;

    private Map<String,Object> information;

    @Builder
    public MyPageResponse(String result, String name, String email, Integer provider, String imageUrl) {
        this.result = result;
        this.information = new HashMap<>();
        this.information.put("name",name);
        this.information.put("email",email);
        this.information.put("provider",providerIntegerToString(provider));
        this.information.put("imageUrl",imageUrl);


    }

    private String providerIntegerToString(Integer provider){
       String[] converter = {"nothing","local","naver","kakao","google"};

       return converter[provider];
    }
}
