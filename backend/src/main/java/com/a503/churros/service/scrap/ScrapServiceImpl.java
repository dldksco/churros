package com.a503.churros.service.scrap;

import com.a503.churros.dto.scrap.ScrapFolderDTO;
import com.a503.churros.entity.scrap.ScrapFolder;
import com.a503.churros.repository.scrap.ScrapFolderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ScrapServiceImpl implements ScrapService{

    private ScrapFolderRepository sfr;

    @Override
    public List<ScrapFolderDTO> getFolderList(String name) {
        List<ScrapFolder> list = sfr.findByName(name).orElse(null);
        if(list == null)
            return null;
        else{
            return list.stream()
                    .map(m -> ScrapFolderDTO.of(m))
                    .collect(Collectors.toList());
        }
    }
}
