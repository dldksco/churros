package com.a503.churros.service.news;

import com.a503.churros.dto.article.ArticleDTO;
import com.a503.churros.entity.article.Article;
import com.a503.churros.entity.news.DisLike;
import com.a503.churros.entity.news.Like;
import com.a503.churros.entity.news.Read;
import com.a503.churros.feign.news.NaverFeign;
import com.a503.churros.feign.news.NewsFeign;
import com.a503.churros.repository.article.ArticleRepository;
import com.a503.churros.repository.news.DisLikeRepository;
import com.a503.churros.repository.news.LikeRepository;
import com.a503.churros.repository.news.ReadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NewsServiceImpl implements NewsService{

    private final ReadRepository rr;
    private final LikeRepository lr;
    private final DisLikeRepository dr;
    private final ArticleRepository ar;
    private final NewsFeign fc;
    private final NaverFeign nf;


    public List<Long> sendRecommend(long userId){
        List<Long> list = fc.getRecomList(userId);
        return list;
    }

    public List<Long> sendSample(){
        List<Long> list = fc.getSampleList();
        return list;
    }

    @Override
    public void saveReadArti(long userId, long articleId) {
        Read read = rr.findByUserIdxAndArticleIdx(userId , articleId).orElse(null);
        if(read == null){
            read = Read.builder()
                    .userIdx(userId)
                    .articleIdx(articleId)
                    .build();
        }
        read.setReadDate(LocalDateTime.now());
        read.setValidDate(LocalDateTime.now().plusDays(30L));

        rr.save(read);
    }

    @Override
    @Transactional
    public void recordLike(long userId, long articleId) {
        Like like = lr.findByUserIdxAndArticleIdx(userId , articleId).orElse(null);
        if(like == null){
            like = Like.builder()
                    .userIdx(userId)
                    .articleIdx(articleId)
                    .build();
            lr.save(like);
        }else{
            lr.delete(like);
        }
    }

    public List<Long> getLikeList(long userIdx) {
        List<Like> list = lr.findByUserIdx(userIdx).orElse(null);
        if(list == null || list.size() == 0){
            return null;
        }
        else{
            return list.stream()
                    .map(m -> m.getArticleIdx())
                    .collect(Collectors.toList());
        }
    }

    @Override
    public void recordDisLike(long userId, long articleId) {
        DisLike dis = dr.findByUserIdxAndArticleIdx(userId , articleId).orElse(null);
        if(dis == null){
            dis = DisLike.builder()
                    .userIdx(userId)
                    .articleIdx(articleId)
                    .build();
            dr.save(dis);
        }
    }

    @Override
    public ArticleDTO getArticleInfo(/*long userId ,*/ long articleId) {
        Article article = ar.findByIdx(articleId).orElse(null);
        if(article == null){
            return null;
        }
        ArticleDTO dto = new ArticleDTO().of(article);
//        Like like = lr.findByUserIdxAndArticleIdx(userId , articleId).orElse(null);
//        if(like != null){
//            dto.setLike(true);
//        }
        return dto;
    }


    @Override
    public String callNaver(String url){
        String html = nf.getArticle(url);
        return html;
    }
}
