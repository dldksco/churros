package com.a503.churros.service.news;

import com.a503.churros.dto.article.ArticleDTO;
import com.a503.churros.entity.news.Like;

import java.util.List;

public interface NewsService {
    List<Integer> sendRecommend(long userId);
    List<Integer> sendSample();
    void saveReadArti(long userId, long articleId);
    void recordLike(long userId, long articleId);
    List<Long> getLikeList(long userIdx);
    void recordDisLike(long userId, long articleId);

    ArticleDTO getArticleInfo(long userId , long articleId);
    String callNaver(String url);
}
