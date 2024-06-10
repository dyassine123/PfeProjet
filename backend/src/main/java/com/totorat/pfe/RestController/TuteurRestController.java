package com.totorat.pfe.RestController;


import com.totorat.pfe.Beans.SaveTuteur;
import com.totorat.pfe.Entite.Client;
import com.totorat.pfe.Entite.Tuteur;

import com.totorat.pfe.Repository.TuteurRepository;

import com.totorat.pfe.services.EmailService;
import com.totorat.pfe.services.TuteurServices;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/tuteur")
public class TuteurRestController {

    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
    @Autowired
    TuteurRepository tuteurRepository;

    @Autowired
    EmailService emailService;
    @Autowired
    TuteurServices tuteurService;
    @RequestMapping(method = RequestMethod.POST )
    ResponseEntity<?> AjouterTuteur (@RequestBody SaveTuteur model){
        HashMap<String, Object> response = new HashMap<>();
        if(tuteurRepository.existsByEmail(model.getEmail())){
            response.put("message", "email exist deja !");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }else{
            model.setPassword(this.bCryptPasswordEncoder.encode(model.getPassword()));
            Tuteur savedUser = tuteurService.ajouterTuteur(model);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);}

    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public Tuteur modifierTuteur(@RequestBody Tuteur tuteur, @PathVariable("id") Long id) {
        Tuteur newTuteur = null;
        if (tuteurRepository.findById(id).isPresent()) { //ken user deja mawjoud
            Tuteur tuteur1 = tuteurRepository.findById(id).get();
            var tutid = tuteur.getId();
            var nom = tuteur.getNom();
            var prenom = tuteur.getPrenom();
            var email = tuteur.getEmail();
            var password = tuteur.getPassword();
            var image = tuteur.getImage();

            tuteur1.setId(tutid);
            tuteur1.setNom(nom);
            tuteur1.setPrenom(prenom);
            tuteur1.setEmail(email);
            tuteur1.setPassword(password);
            tuteur1.setImage(image);


//mta3 yjih mail fih l etat
            tuteur.setPassword(this.bCryptPasswordEncoder.encode(tuteur1.getPassword()));
            if (tuteur.isEtat() != tuteur1.isEtat()) {
                //ternary expression
                String etat = tuteur1.isEtat() ? "Bloqué" : "Accepté";
                emailService.SendSimpleMessage(tuteur1.getEmail(), "L'etat de votre compte", "votre compte a été " + etat);
            }
            tuteur1.setEtat(tuteur.isEtat());
            newTuteur = tuteurRepository.save(tuteur);
        }
        return newTuteur;
    }

    @PutMapping("/updateDetails/{id}")
    public ResponseEntity<Tuteur> UpdateTuteur(@PathVariable("id") Long id, @RequestBody Tuteur tuteur) {
        return tuteurRepository.findById(id).map(existingTuteur -> {
            existingTuteur.setNom(tuteur.getNom());
            existingTuteur.setPrenom(tuteur.getPrenom());
            existingTuteur.setEmail(tuteur.getEmail());
            existingTuteur.setImage(tuteur.getImage());
            tuteurRepository.save(existingTuteur);
            return ResponseEntity.ok(existingTuteur);
        }).orElse(ResponseEntity.notFound().build());
    }


    @PutMapping("/updatePassword/{id}")
    public ResponseEntity<Tuteur> modifierPassword(@PathVariable("id") Long id, @RequestBody Tuteur tuteur) {
        return tuteurRepository.findById(id).map(existingTuteur -> {

            existingTuteur.setPassword(bCryptPasswordEncoder.encode(tuteur.getPassword()));

            tuteurRepository.save(existingTuteur);
            return ResponseEntity.ok(existingTuteur);
        }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/checkOldPassword/{id}")
    public ResponseEntity<Boolean> checkOldPassword(@PathVariable("id") Long id, @RequestBody Map<String, String> passwordMap) {
        String oldPassword = passwordMap.get("oldPassword");
        return tuteurRepository.findById(id).map(existingTuteur -> {
            boolean isMatch = bCryptPasswordEncoder.matches(oldPassword, existingTuteur .getPassword());
            return ResponseEntity.ok(isMatch);
        }).orElse(ResponseEntity.notFound().build());
    }


    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE )
    public void supprimerTuteur(@PathVariable("id") long id){
        tuteurService.supprimerTuteur(id);

    }

    @RequestMapping(method = RequestMethod.GET )
    public List<Tuteur> afficherTuteur(){
        return tuteurService.listTuteur();

    }
    @RequestMapping(value = "/{id}" , method = RequestMethod.GET)
    public Optional<Tuteur> getTuteurById(@PathVariable("id") long id){

        Optional<Tuteur> tuteur = tuteurService.getTuteurById(id);
        return tuteur;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginTuteur(@RequestBody Tuteur tuteur) {
        System.out.println("in login-Etudiant"+tuteur);
        HashMap<String, Object> response = new HashMap<>();

        Tuteur userFromDB = tuteurRepository.findTuteurByEmail(tuteur.getEmail());
        System.out.println("userFromDB+tuteur"+userFromDB);
        if (userFromDB == null) {
            response.put("message", "Tuteur not found !");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
            else if (!userFromDB.isEtat()) {
            response.put("message", "Votre compte est désactivé");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);}
            else {
            boolean compare = this.bCryptPasswordEncoder.matches(tuteur.getPassword(),userFromDB.getPassword());
            System.out.println("compare"+compare);
            if (!compare) {
                response.put("message", "Tuteur not found !");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }else
            {
                String token = Jwts.builder()
                        .claim("data", userFromDB)
                        .claim("role", "tuteur")
                        .signWith(SignatureAlgorithm.HS256, "SECRET")
                        .compact();
                response.put("token", token);
                System.out.println("hhh");
                return ResponseEntity.status(HttpStatus.OK).body(response);
            }

        }
    }
}
