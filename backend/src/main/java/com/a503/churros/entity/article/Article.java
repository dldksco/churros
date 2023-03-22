package com.a503.churros.entity.article;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
import javax.validation.valueextraction.UnwrapByDefault;

@Document(collection = "articles")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Article {

    @Id
    private long id;
}
