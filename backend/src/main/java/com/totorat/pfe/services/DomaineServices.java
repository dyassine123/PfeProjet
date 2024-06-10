package com.totorat.pfe.services;

import com.totorat.pfe.Entite.Domaine;

import java.util.List;
import java.util.Optional;

public interface DomaineServices {
    Domaine ajouterDomaine(Domaine domaine);
    Domaine modifierDomaine(Domaine domaine);
    List<Domaine> listDomaines();
    void supprimerDomaine(Long id);
    Optional<Domaine> getDomaineById(Long id);
}
