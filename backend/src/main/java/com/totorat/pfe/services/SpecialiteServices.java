package com.totorat.pfe.services;

import com.totorat.pfe.Entite.Specialite;

import java.util.List;
import java.util.Optional;

public interface SpecialiteServices {
    Specialite ajouterSpecialite(Specialite specialite);
    Specialite modifierSpecialite(Specialite specialite);
    List<Specialite> listSpecialites();
    void supprimerSpecialite(Long id);
    Optional<Specialite> getSpecialiteById(Long id);
}

