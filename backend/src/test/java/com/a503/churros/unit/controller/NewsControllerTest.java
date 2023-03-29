package com.a503.churros.unit.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import com.a503.churros.controller.news.NewsController;
import com.a503.churros.dto.NewsSearchResponse;
import com.a503.churros.dto.news.NewsDocumentationDTO;
import com.a503.churros.dto.news.NewsSearchRequest;
import com.a503.churros.service.news.NewsService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.oauth2.client.servlet.OAuth2ClientAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.SliceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;


@WebMvcTest(
    controllers = NewsController.class,
    excludeAutoConfiguration = {SecurityAutoConfiguration.class,
        OAuth2ClientAutoConfiguration.class},
    excludeFilters = {
        @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = {
            SecurityAutoConfiguration.class, WebSecurityConfigurerAdapter.class,
            HttpSecurity.class})}
)
public class NewsControllerTest {

  @MockBean
  private NewsService newsService;

  @Autowired
  private MockMvc mockMvc;

  private ObjectMapper objectMapper;

  @BeforeEach
  void setUp() {
    this.objectMapper = new ObjectMapper();
  }


  @Test
  @DisplayName("News Search Test")
  public void testNewsSearch() throws Exception {
    //given

    String text = "test";
    int page = 0;
    int size = 10;

    NewsSearchRequest request = new NewsSearchRequest(text, page, size);
    request.setText(text);
    request.setPage(page);
    request.setSize(size);

    List<NewsDocumentationDTO> news = new ArrayList<>();
    news.add(NewsDocumentationDTO.builder().idx(1L).
        imgSrc("image").
        title("text").
        description("test").
        link("link").
        build()
    );

    //when

    when(newsService.searchByTitleAndDescription(any(String.class),
        any(PageRequest.class))).thenReturn(
        new SliceImpl<>(news));

    MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/news/search")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
        .andReturn();
    NewsSearchResponse newsPage = objectMapper.readValue(
        mvcResult.getResponse().getContentAsString(),
        new TypeReference<NewsSearchResponse>() {
        });
    //then

    // HttpStatus.OK와 동일한 상태 코드를 확인합니다.
    assertEquals(HttpStatus.OK.value(), mvcResult.getResponse().getStatus());
    // 결과의 크기와 내용을 확인합니다.
    assertEquals(news.size(), newsPage.getContent().size());
    assertTrue(news.containsAll(newsPage.getContent()) && newsPage.getContent().containsAll(news));
  }
}