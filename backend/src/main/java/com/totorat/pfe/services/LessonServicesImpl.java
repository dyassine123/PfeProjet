package com.totorat.pfe.services;

import com.totorat.pfe.Entite.Lesson;
import com.totorat.pfe.Repository.LessonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LessonServicesImpl implements LessonServices {

    @Autowired
    LessonRepository lessonRepository;

    @Override
    public Lesson ajouterLesson(Lesson lesson) {
        return lessonRepository.save(lesson);
    }

    @Override
    public Lesson modifierLesson(Lesson lesson) {
        return lessonRepository.save(lesson);
    }

    @Override
    public List<Lesson> listerLessons() {
        return lessonRepository.findAll();
    }

    @Override
    public void supprimerLesson(Long id) {
        lessonRepository.deleteById(id);
    }

    @Override
    public Optional<Lesson> getLessonParId(Long id) {
        return lessonRepository.findById(id);
    }
}

