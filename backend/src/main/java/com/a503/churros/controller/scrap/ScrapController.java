package com.a503.churros.controller.scrap;


import com.a503.churros.service.scrap.ScrapService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/scrap")
@Api("SCRAP API")
@RequiredArgsConstructor
public class ScrapController {

    private ScrapService ss;
    @GetMapping("/")
    public ResponseEntity<?> getScrap(
//            String token
    ){

        System.out.println("test");;
        return null;
    }
}
