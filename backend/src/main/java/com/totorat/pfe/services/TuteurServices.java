package com.totorat.pfe.services;

import com.totorat.pfe.Beans.SaveTuteur;
import com.totorat.pfe.Entite.Client;
import com.totorat.pfe.Entite.Tuteur;

import java.util.List;
import java.util.Optional;

public interface TuteurServices {
    Tuteur ajouterTuteur(SaveTuteur model);
    Tuteur modifierTuteur(Tuteur tuteur, long id);

    Tuteur UpdateTuteur(Tuteur tuteur, long id);

    Tuteur modifierPassword(Tuteur tuteur);

    Tuteur modifierTuteur1(Tuteur tuteur, long id);
    List<Tuteur> listTuteur();
    void supprimerTuteur(Long id);
    Optional<Tuteur> getTuteurById(Long id);
}
