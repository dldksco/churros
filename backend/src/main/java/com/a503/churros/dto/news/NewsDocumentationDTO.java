package com.a503.churros.dto.news;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Builder
@Getter
@Setter
public class NewsDocumentationDTO {

  private String title;

  private String description;

  private Long idx;

  private String link;

  private String imgSrc;

}
