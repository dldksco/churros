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

    private long folderId;

    private String name;

    public static ScrapFolderDTO of(ScrapFolder sf){
        return ScrapFolderDTO.builder()
                .folderId(sf.getId())
                .name(sf.getName())
                .build();
    }
}
