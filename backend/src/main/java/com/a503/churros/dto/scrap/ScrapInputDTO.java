package com.a503.churros.dto.scrap;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ScrapInputDTO {
    private String folderName;

    private Integer folderIdx;

    private Integer articleIdx;
}
