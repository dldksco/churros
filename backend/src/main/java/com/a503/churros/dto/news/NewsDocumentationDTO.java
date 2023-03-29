package com.a503.churros.dto.news;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@EqualsAndHashCode
@AllArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class NewsDocumentationDTO {
  public NewsDocumentationDTO() {}
  private String title;

  private String description;

  private Long idx;

  private String link;

  private String imgSrc;

}
