package com.totorat.pfe.Repository;

import com.totorat.pfe.Entite.Categorie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategorieRepository  extends JpaRepository<Categorie,Long> {
    boolean existsByNomCategorie(String nomCategorie);
}
