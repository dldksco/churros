package com.a503.churros.repository.article;

import com.a503.churros.entity.article.Article;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ArticleRepository extends MongoRepository<Article , Long> {
}
