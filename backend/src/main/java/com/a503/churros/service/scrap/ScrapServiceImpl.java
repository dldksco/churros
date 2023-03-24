package com.a503.churros.service.scrap;

import com.a503.churros.dto.scrap.ScrapFolderDTO;
import com.a503.churros.entity.scrap.ScrapFolder;
import com.a503.churros.entity.scrap.ScrapedArticle;
import com.a503.churros.global.exception.ScrapFolderInsertException;
import com.a503.churros.repository.scrap.ScrapFolderRepository;
import com.a503.churros.repository.scrap.ScrapedArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ScrapServiceImpl implements ScrapService{

    private final ScrapFolderRepository sfr;
    private final ScrapedArticleRepository sar;

    @Override
    public List<ScrapFolderDTO> getFolderList(long idx) {
        List<ScrapFolder> list = sfr.findByUserIdx(idx).orElse(null);
        if(list == null || list.size() == 0){
            return null;}
        else{
            return list.stream()
                    .map(m -> ScrapFolderDTO.of(m))
                    .collect(Collectors.toList());
        }
    }

    @Override
    public List<Long> getArticleList(long idx , long userIdx) {
        if(sfr.findByIdAndUserIdx(idx , userIdx).orElse(null) == null){
            return null;
        }
        List<ScrapedArticle> list = sar.findByScrapbookIdx(idx).orElse(null);
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
    public Long insertFolderName(long userIdx, String folderName) {
        if(sfr.findByFolderName(folderName).orElse(null) != null){
            throw new ScrapFolderInsertException("이미 존재하는 폴더입니다");
        }
        ScrapFolder sf = ScrapFolder.builder()
                .folderName(folderName)
                .userIdx(userIdx)
                .build();
        sf = sfr.save(sf);
        return sf.getId();
    }

    @Override
    public void saveArticle(long userIdx, long folderIdx, long articleIdx) {
        if(sfr.findByIdAndUserIdx(userIdx , folderIdx).orElse(null) == null){
            throw new ScrapFolderInsertException("폴더가 존재하지 않습니다.");
        }
        ScrapedArticle sa = sar.findByScrapbookIdxAndArticleIdx(folderIdx , articleIdx).orElse(null);
        if(sa == null){
            sa = ScrapedArticle.builder()
                    .articleIdx(articleIdx)
                    .scrapbookIdx(folderIdx)
                    .build();
            sar.save(sa);
        }else
            sar.deleteById(sa.getId());
    }

    @Override
    @Transactional
    public void deleteFolder(long userIdx, long folderIdx) {
        if(sfr.findByIdAndUserIdx(userIdx , folderIdx).orElse(null) == null){
            throw new ScrapFolderInsertException("폴더가 존재하지 않습니다.");
        }
        sfr.deleteById(folderIdx);
        List<ScrapedArticle> list = sar.findByScrapbookIdx(folderIdx).orElse(null);
        if(list != null){

        }
        sar.deleteAllByIdIn(list.stream()
                .map(m -> m.getId())
                .collect(Collectors.toList()));

    }

    @Override
    @Transactional
    public void changeFolderName(long userIdx, String folderName, long folderIdx) {
        ScrapFolder sf = sfr.findByIdAndUserIdx(userIdx , folderIdx).orElse(null);
        if(sf == null){
            throw new ScrapFolderInsertException("폴더가 존재하지 않습니다.");
        }
        sf.setFolderName(folderName);

    }
}
