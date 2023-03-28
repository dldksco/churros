package com.a503.churros.service.news;

import com.a503.churros.dto.article.ArticleDTO;
import com.a503.churros.dto.news.NewsDocumentationDTO;
import com.a503.churros.entity.news.Like;

import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public interface NewsService {
    List<Long> sendRecommend(long userId);
    List<Long> sendSample();
    void saveReadArti(long userId, long articleId);
    void recordLike(long userId, long articleId, long like);
    List<Long> getLikeList(long userIdx);
    void recordDisLike(long userId, long articleId);

    ArticleDTO getArticleInfo(long userId , long articleId);
    Slice<NewsDocumentationDTO> searchByTitleAndDescription(String query, Pageable pageable);
}
