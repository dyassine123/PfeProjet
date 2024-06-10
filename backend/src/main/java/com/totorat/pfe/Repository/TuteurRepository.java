package com.totorat.pfe.Repository;

import com.totorat.pfe.Entite.Tuteur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TuteurRepository extends JpaRepository<Tuteur,Long> {
    boolean existsByEmail(String email);


    Tuteur findTuteurByEmail(String email);
}
