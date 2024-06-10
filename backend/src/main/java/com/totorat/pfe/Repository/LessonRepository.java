package com.totorat.pfe.Repository;


import com.totorat.pfe.Entite.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LessonRepository extends JpaRepository<Lesson,Long> {
}
