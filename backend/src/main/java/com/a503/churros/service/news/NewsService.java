package com.a503.churros.service.news;

import com.a503.churros.entity.news.Like;

import java.util.List;

public interface NewsService {
    List<String> sendRecommend(long userId);
    List<String> sendSample();
    void saveReadArti(long userId, long articleId);
    void recordLike(long userId, long articleId, long like);
    List<Long> getLikeList(long userIdx);
    void recordDisLike(long userId, long articleId);
}
