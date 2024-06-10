package com.totorat.pfe.Repository;


import com.totorat.pfe.Entite.Cours;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CoursRepository extends JpaRepository<Cours,Long> {
}
