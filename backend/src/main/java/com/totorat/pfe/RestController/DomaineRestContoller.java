package com.totorat.pfe.RestController;


import com.totorat.pfe.Entite.Domaine;
import com.totorat.pfe.Repository.DomaineRepository;
import com.totorat.pfe.services.DomaineServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/domaine")
public class DomaineRestContoller {
    @Autowired
    DomaineRepository domaineRepository;

    @Autowired
    DomaineServices domaineService;

    @RequestMapping(method = RequestMethod.POST )
    ResponseEntity<?> ajouterDomaine(@RequestBody Domaine domaine){
        HashMap<String, Object> response = new HashMap<>();
        if(domaineRepository.existsByNomDomaine(domaine.getNomDomaine())){
            response.put("message", "Domaine existe déjà !");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } else {
            Domaine savedUser = domaineRepository.save(domaine);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        }
    }

    @RequestMapping(value = "/{id}" ,method = RequestMethod.PUT)
    public Domaine modifierDomaine(@PathVariable("id")Long id, @RequestBody Domaine domaine){
        Domaine savedUser = domaineRepository.save(domaine);
        Domaine newDomaine = domaineService.modifierDomaine(domaine);
        return newDomaine;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE )
    public void supprimerDomaine(@PathVariable("id") long id){
        domaineService.supprimerDomaine(id);
    }

    @RequestMapping(method = RequestMethod.GET )
    public List<Domaine> afficherDomaines(){
        return domaineService.listDomaines();
    }

    @RequestMapping(value = "/{id}" , method = RequestMethod.GET)
    public Optional<Domaine> getDomaineById(@PathVariable("id") long id){
        Optional<Domaine> domaine = domaineService.getDomaineById(id);
        return domaine;
    }


}
