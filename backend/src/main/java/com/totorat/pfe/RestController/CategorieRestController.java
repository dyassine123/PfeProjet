package com.totorat.pfe.RestController;

import com.totorat.pfe.Entite.Categorie;
import com.totorat.pfe.Repository.CategorieRepository;
import com.totorat.pfe.services.CategorieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/categorie")
public class CategorieRestController {
    @Autowired
    CategorieRepository categorieRepository;

    @Autowired
    CategorieService categorieService;

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<?> ajouterCategorie(@RequestBody Categorie categorie) {
        HashMap<String, Object> response = new HashMap<>();
        if (categorieRepository.existsByNomCategorie(categorie.getNomCategorie())) {
            response.put("message", "Categorie existe déjà !");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } else {
            Categorie savedCategorie = categorieRepository.save(categorie);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedCategorie);
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public Categorie modifierCategorie(@PathVariable("id") Long id, @RequestBody Categorie categorie) {
        Categorie savedCategorie = categorieRepository.save(categorie);
        Categorie newCategorie = categorieService.modifierCategorie(categorie);
        return newCategorie;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void supprimerCategorie(@PathVariable("id") long id) {
        categorieService.supprimerCategorie(id);
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Categorie> afficherCategorie() {
        return categorieService.listCategorie();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Optional<Categorie> getCategorieById(@PathVariable("id") long id) {
        Optional<Categorie> categorie = categorieService.getCategorieById(id);
        return categorie;
    }

}
