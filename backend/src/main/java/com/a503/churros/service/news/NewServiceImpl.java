package com.a503.churros.service.news;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NewServiceImpl implements NewsService{

    private final WebClient wc;

    public NewServiceImpl() {
        this.wc = WebClient.builder()
                .baseUrl("http://localhost:8080")
                .build();
    }

    public List<String> sendRecommend(long userId){
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("userId" , ""+userId);
        List<String> list = new ArrayList<>();

        ClientResponse response = wc.post()
                .uri("/recommend/")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(BodyInserters.fromFormData(formData))
                .exchange()
                .block();

        if (response.statusCode().is2xxSuccessful()) {
            return response.bodyToMono(List.class).block();
        } else {
            throw new RuntimeException("Failed to send recommendation: " + response.statusCode());
        }

    }
}
