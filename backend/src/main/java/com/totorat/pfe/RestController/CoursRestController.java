package com.totorat.pfe.RestController;


import com.totorat.pfe.Beans.SaveCours;
import com.totorat.pfe.Entite.Cours;

import com.totorat.pfe.Repository.CoursRepository;
import com.totorat.pfe.services.CoursServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/cours")
public class CoursRestController {
    @Autowired
    CoursRepository coursRepository;
    @Autowired
    CoursServices coursService;


    @RequestMapping(method = RequestMethod.POST )
    public Cours AjouterCours (@RequestBody SaveCours model){

        return coursService.ajouterCours(model);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public Cours modifierCours(@PathVariable("id") Long id, @RequestBody SaveCours model) {
        return coursService.modifierCours(id, model);
    }




    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE )
    public void supprimerCours(@PathVariable("id") long id){
        coursService.supprimerCours(id);

    }

    @RequestMapping(method = RequestMethod.GET )
    public List<Cours> afficherCours(){
        return coursService.listCours();

    }
    @RequestMapping(value = "/{id}" , method = RequestMethod.GET)
    public Optional<Cours> getCoursById(@PathVariable("id") long id){

        Optional<Cours> cours = coursService.getCoursById(id);
        return cours;
    }
}
