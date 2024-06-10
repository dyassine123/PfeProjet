package com.totorat.pfe.Repository;

import com.totorat.pfe.Entite.Domaine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DomaineRepository extends JpaRepository<Domaine,Long> {



    boolean existsByNomDomaine(String nomDomaine);
}
