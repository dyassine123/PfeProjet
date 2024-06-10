package com.totorat.pfe.Repository;

import com.totorat.pfe.Entite.Specialite;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpecialiteRepository extends JpaRepository<Specialite,Long> {

    boolean existsByNomSpecialite(String nomSpecialite);
}
