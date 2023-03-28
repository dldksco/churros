package com.a503.churros.service.news;

import com.a503.churros.dto.article.ArticleDTO;
import com.a503.churros.dto.news.NewsDocumentationDTO;
import com.a503.churros.entity.news.DisLike;
import com.a503.churros.entity.news.Like;
import com.a503.churros.entity.news.NewsDocumentation;
import com.a503.churros.entity.news.Read;
import com.a503.churros.repository.article.ArticleRepository;
import com.a503.churros.repository.feign.FeignClient;
import com.a503.churros.repository.news.DisLikeRepository;
import com.a503.churros.repository.news.LikeRepository;
import com.a503.churros.repository.news.ReadRepository;
import lombok.RequiredArgsConstructor;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.sort.SortBuilders;
import org.elasticsearch.search.sort.SortOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.stereotype.Service;

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
    private final FeignClient fc;

    private final ElasticsearchOperations elasticsearchOperations;

    public List<Long> sendRecommend(long userId){

        List<Long> list = fc.getRecomList(userId);


//        ClientResponse response = wc.get()
//                .uri("/recommend/{userId}", userId)
//                .accept(MediaType.APPLICATION_JSON)
////                .body(BodyInserters.fromFormData(formData))
//                .exchange()
//                .block();
//
//        if (response.statusCode().is2xxSuccessful()) {
//            return response.bodyToMono(List.class).block();
//        } else {
//            throw new RuntimeException("Failed to send recommendation: " + response.statusCode());
//        }
        return null;
    }

    public List<Long> sendSample(){
//        ClientResponse response = wc.get()
//                .uri("/recommend/sample")
//                .accept(MediaType.APPLICATION_JSON)
////                .body(BodyInserters.fromFormData(formData))
//                .exchange()
//                .block();
//
//        if (response.statusCode().is2xxSuccessful()) {
//            return response.bodyToMono(List.class).block();
//        } else {
//            throw new RuntimeException("Failed to send recommendation: " + response.statusCode());
//        }
        return null;
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

    @Override
    public ArticleDTO getArticleInfo(long userId , long articleId) {
//        Article article = ar.findByIdx(articleId).orElse(null);
//        if(article == null){
            return null;
//        }
//        ArticleDTO dto = new ArticleDTO().of(article);
//        Like like = lr.findByUserIdxAndArticleIdx(userId , articleId).orElse(null);
//        if(like != null){
//            dto.setLike(true);
//        }
//        return dto;
    }
    public Slice<NewsDocumentationDTO> searchByTitleAndDescription(String query, Pageable pageable) {
        QueryBuilder queryBuilder = QueryBuilders.multiMatchQuery(query, "title", "description");
        NativeSearchQuery searchQuery = new NativeSearchQueryBuilder()
            .withQuery(queryBuilder)
            .withPageable(pageable)
            .withSort(SortBuilders.scoreSort().order(SortOrder.DESC))
            .build();

        SearchHits<NewsDocumentation> searchHits = elasticsearchOperations.search(searchQuery, NewsDocumentation.class);
        List<NewsDocumentationDTO> newsDocumentationDTOs = searchHits.stream()
            .map(SearchHit::getContent)
            .map(this::convertToDto)
            .collect(Collectors.toList());

        if (newsDocumentationDTOs.isEmpty()) {
            return new SliceImpl<>(newsDocumentationDTOs, pageable, false);
        }



        boolean hasNext = newsDocumentationDTOs.size() == pageable.getPageSize();
        return new SliceImpl<>(newsDocumentationDTOs, pageable, hasNext);
    }

    private NewsDocumentationDTO convertToDto(NewsDocumentation newsDocumentation) {
        return NewsDocumentationDTO.builder().
            title(newsDocumentation.getTitle()).
            description(newsDocumentation.getDescription()).
            idx(newsDocumentation.getIdx()).
            link(newsDocumentation.getLink()).
            imgSrc(newsDocumentation.getImgSrc()).
            build();
    }

}
