package com.totorat.pfe.services;

import com.totorat.pfe.Entite.Lesson;

import java.util.List;
import java.util.Optional;

public interface LessonServices {
    Lesson ajouterLesson(Lesson lesson);
    Lesson modifierLesson(Lesson lesson);
    List<Lesson> listerLessons();
    void supprimerLesson(Long id);
    Optional<Lesson> getLessonParId(Long id);
}

