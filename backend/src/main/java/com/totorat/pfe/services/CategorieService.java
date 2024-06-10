package com.totorat.pfe.services;

import com.totorat.pfe.Entite.Categorie;


import java.util.List;
import java.util.Optional;

public interface CategorieService {

    Categorie ajouterCategorie(Categorie categorie);
    Categorie modifierCategorie(Categorie categorie);
    List<Categorie> listCategorie();
    void supprimerCategorie(Long id);
    Optional<Categorie> getCategorieById(Long id);
}
