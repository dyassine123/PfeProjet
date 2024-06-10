package com.totorat.pfe.RestController;


import com.totorat.pfe.Entite.Specialite;
import com.totorat.pfe.Repository.SpecialiteRepository;
import com.totorat.pfe.services.SpecialiteServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/specialite")
public class SpecialiteRestController {
    @Autowired
    SpecialiteRepository specialiteRepository;

    @Autowired
    SpecialiteServices specialiteService;

    @RequestMapping(method = RequestMethod.POST )
    ResponseEntity<?> ajouterSpecialite(@RequestBody Specialite specialite){
        HashMap<String, Object> response = new HashMap<>();
        if(specialiteRepository.existsByNomSpecialite(specialite.getNomSpecialite())){
            response.put("message", "Specialite existe déjà !");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } else {
            Specialite savedUser = specialiteRepository.save(specialite);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        }
    }

    @RequestMapping(value = "/{id}" ,method = RequestMethod.PUT)
    public Specialite modifierSpecialite(@PathVariable("id")Long id, @RequestBody Specialite specialite){
        Specialite savedUser = specialiteRepository.save(specialite);
        Specialite newSpecialite = specialiteService.modifierSpecialite(specialite);
        return newSpecialite;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE )
    public void supprimerSpecialite(@PathVariable("id") long id){
        specialiteService.supprimerSpecialite(id);
    }

    @RequestMapping(method = RequestMethod.GET )
    public List<Specialite> afficherSpecialites(){
        return specialiteService.listSpecialites();
    }

    @RequestMapping(value = "/{id}" , method = RequestMethod.GET)
    public Optional<Specialite> getSpecialiteById(@PathVariable("id") long id){
        Optional<Specialite> specialite = specialiteService.getSpecialiteById(id);
        return specialite;
    }

}
