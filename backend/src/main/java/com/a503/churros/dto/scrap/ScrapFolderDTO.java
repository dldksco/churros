package com.a503.churros.dto.scrap;

import com.a503.churros.entity.scrap.ScrapFolder;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ScrapFolderDTO {

    private long folderIdx;

    private String folderName;

    public static ScrapFolderDTO of(ScrapFolder sf){
        return ScrapFolderDTO.builder()
                .folderIdx(sf.getId())
                .folderName(sf.getFolderName())
                .build();
    }
}
