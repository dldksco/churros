package com.a503.churros.service.news;

import com.a503.churros.entity.news.DisLike;
import com.a503.churros.entity.news.Like;
import com.a503.churros.entity.news.Read;
import com.a503.churros.entity.scrap.ScrapedArticle;
import com.a503.churros.repository.news.DisLikeRepository;
import com.a503.churros.repository.news.LikeRepository;
import com.a503.churros.repository.news.ReadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NewsServiceImpl implements NewsService{

    private final WebClient wc;
    private final ReadRepository rr;
    private final LikeRepository lr;
    private final DisLikeRepository dr;

    @Autowired
    public NewsServiceImpl(ReadRepository rr , LikeRepository lr , DisLikeRepository dr) {
        this.wc = WebClient.builder()
                .baseUrl("http://localhost:8080")
                .build();
        this.rr = rr;
        this.lr = lr;
        this.dr = dr;
    }

    public List<String> sendRecommend(long userId){
        ClientResponse response = wc.get()
                .uri("/recommend/{userId}", userId)
                .accept(MediaType.APPLICATION_JSON)
//                .body(BodyInserters.fromFormData(formData))
                .exchange()
                .block();

        if (response.statusCode().is2xxSuccessful()) {
            return response.bodyToMono(List.class).block();
        } else {
            throw new RuntimeException("Failed to send recommendation: " + response.statusCode());
        }
    }

    public List<String> sendSample(){
        ClientResponse response = wc.get()
                .uri("/recommend/sample")
                .accept(MediaType.APPLICATION_JSON)
//                .body(BodyInserters.fromFormData(formData))
                .exchange()
                .block();

        if (response.statusCode().is2xxSuccessful()) {
            return response.bodyToMono(List.class).block();
        } else {
            throw new RuntimeException("Failed to send recommendation: " + response.statusCode());
        }
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
    public void recordLike(long userId, long articleId, long like) {
        if(like == 1L){
            Like data = Like.builder()
                    .userIdx(userId)
                    .articleIdx(articleId)
                    .build();
            lr.save(data);
        }else{
            lr.deleteByUserIdxAndArticleIdx(userId , articleId);
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
        DisLike dis = DisLike.builder()
                .userIdx(userId)
                .articleIdx(articleId)
                .build();
        dr.save(dis);
    }
}
