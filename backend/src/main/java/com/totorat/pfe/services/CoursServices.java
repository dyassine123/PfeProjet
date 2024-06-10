package com.totorat.pfe.services;

import com.totorat.pfe.Beans.SaveCours;
import com.totorat.pfe.Entite.Cours;

import java.util.List;
import java.util.Optional;

public interface CoursServices {
    Cours ajouterCours(SaveCours model);

    Cours modifierCours(Long id, SaveCours model);

    List<Cours> listCours();
    void supprimerCours(Long id);
    Optional<Cours> getCoursById(Long id);
}
