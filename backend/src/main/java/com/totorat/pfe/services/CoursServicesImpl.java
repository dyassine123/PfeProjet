package com.totorat.pfe.services;

import com.totorat.pfe.Beans.SaveCours;
import com.totorat.pfe.Entite.Categorie;
import com.totorat.pfe.Entite.Cours;
import com.totorat.pfe.Entite.Tuteur;
import com.totorat.pfe.Repository.CategorieRepository;
import com.totorat.pfe.Repository.CoursRepository;
import com.totorat.pfe.Repository.TuteurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CoursServicesImpl implements CoursServices {

    @Autowired
    CoursRepository coursRepository;

    @Autowired
    CategorieRepository categorieRepository ;

    @Autowired
    TuteurRepository tuteurRepository ;

    @Override
    public Cours ajouterCours(SaveCours model) {
        Cours cours=SaveCours.toEntity(model);
        System.out.println("idcategorie"+model.getIdCategorie());
        Categorie categorie=categorieRepository.findById(model.getIdCategorie()).get();
        cours.setCategorie(categorie);
        System.out.println("idTuteur"+model.getIdTuteur());
        Tuteur tuteur=tuteurRepository.findById(model.getIdTuteur()).get();
        cours.setTuteur(tuteur);
        return coursRepository.save(cours);

    }

    @Override
    public Cours modifierCours(Long id, SaveCours model) {
        Optional<Cours> existingCoursOptional = coursRepository.findById(id);
        if (existingCoursOptional.isPresent()) {
            Cours existingCours = existingCoursOptional.get();

            existingCours.setNom(model.getNom());
            existingCours.setDescription(model.getDescription());
            existingCours.setPrix(model.getPrix());
            existingCours.setImage(model.getImage());

            Categorie categorie = categorieRepository.findById(model.getIdCategorie()).orElse(null);
            if (categorie != null) {
                existingCours.setCategorie(categorie);
            }
            Tuteur tuteur = tuteurRepository.findById(model.getIdTuteur()).orElse(null);
            if (tuteur != null) {
                existingCours.setTuteur(tuteur);
            }
            return coursRepository.save(existingCours);
        } else {
            return null;
        }
    }

    @Override
    public List<Cours> listCours() {
        return coursRepository.findAll();
    }

    @Override
    public void supprimerCours(Long id) {
        coursRepository.deleteById(id);
    }

    @Override
    public Optional<Cours> getCoursById(Long id) {
        return coursRepository.findById(id);
    }
}

