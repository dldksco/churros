package com.a503.churros.repository.scrap;

import com.a503.churros.entity.scrap.ScrapFolder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ScrapFolderRepository extends JpaRepository<ScrapFolder , Long> {
    Optional<List<ScrapFolder>> findByName(String name);
}
