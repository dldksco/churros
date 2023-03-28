package com.a503.churros.service.auth;

import feign.Headers;
import net.minidev.json.JSONObject;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name="getKakaoInfo" ,url = "https://kapi.kakao.com")
public interface GetKakaoInfo {
    @PostMapping(value="/v2/user/me",consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
            )

    JSONObject  getKakaoInfo(@RequestHeader("Authorization") String accessToken);
}
