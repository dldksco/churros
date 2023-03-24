package com.a503.churros.entity.article;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

//@Document(collection = "newsCol")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Article {

    @Id
    private String id;
    private long _idx;
    private String title;
    private String description;
    private String link;
    private String img_src;
    private String publish_date;
}
