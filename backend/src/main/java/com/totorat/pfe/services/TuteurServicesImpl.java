package com.totorat.pfe.services;

import com.totorat.pfe.Beans.SaveCours;
import com.totorat.pfe.Beans.SaveTuteur;
import com.totorat.pfe.Entite.Categorie;
import com.totorat.pfe.Entite.Cours;
import com.totorat.pfe.Entite.Domaine;
import com.totorat.pfe.Entite.Tuteur;
import com.totorat.pfe.Repository.DomaineRepository;
import com.totorat.pfe.Repository.TuteurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TuteurServicesImpl implements TuteurServices {

    @Autowired
    TuteurRepository tuteurRepository;
    @Autowired
    DomaineRepository  domaineRepository;

    @Override
    public Tuteur ajouterTuteur(SaveTuteur model) {
        Tuteur tuteur= SaveTuteur.toEntity(model);
        System.out.println("idDomaine"+model.getIdDomaine());
        Domaine domaine=domaineRepository.findById(model.getIdDomaine()).get();
        tuteur.setDomaine(domaine);

        return tuteurRepository.save(tuteur);
    }

    @Override
    public Tuteur modifierTuteur(Tuteur tuteur , long id) {
        return tuteurRepository.save(tuteur);
    }

    @Override
    public Tuteur UpdateTuteur(Tuteur tuteur, long id) {
        return tuteurRepository.save(tuteur);
    }

    @Override
    public Tuteur modifierPassword(Tuteur tuteur) {
        return tuteurRepository.save(tuteur);
    }

    @Override
    public Tuteur modifierTuteur1(Tuteur tuteur, long id) {
        return null;
    }

    @Override
    public List<Tuteur> listTuteur() {
        return tuteurRepository.findAll();
    }

    @Override
    public void supprimerTuteur(Long id) {
        tuteurRepository.deleteById(id);
    }

    @Override
    public Optional<Tuteur> getTuteurById(Long id) {
        return tuteurRepository.findById(id);
    }
}

