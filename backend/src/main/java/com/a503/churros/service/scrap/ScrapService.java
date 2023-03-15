package com.a503.churros.service.scrap;

import com.a503.churros.dto.scrap.ScrapFolderDTO;

import java.util.List;

public interface ScrapService {
    List<ScrapFolderDTO> getFolderList(String name);
}
