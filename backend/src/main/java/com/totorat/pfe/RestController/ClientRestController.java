package com.totorat.pfe.RestController;


import com.totorat.pfe.Beans.SaveClient;
import com.totorat.pfe.Entite.Client;
import com.totorat.pfe.Repository.ClientRepository;
import com.totorat.pfe.services.ClientServices;
import com.totorat.pfe.services.EmailService;
import com.totorat.pfe.services.RestPasswordServices;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;


@RestController
@RequestMapping(value = "/client")
@CrossOrigin(origins = "http://localhost:4200")
public class ClientRestController {

    private final Path rootLocation = Paths.get("images");
    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
    @Autowired
    ClientRepository clientRepository;
    @Autowired
    ClientServices clientService;
    @Autowired
    EmailService emailService ;
    @Autowired
    RestPasswordServices restPasswordServices;
    @RequestMapping(method = RequestMethod.POST )
    ResponseEntity<?> AjouterClient (@RequestBody SaveClient model){
return clientService.ajouterClient(model);
    }


    @PutMapping("/updateDetails/{id}")
    public ResponseEntity<Client> modifierClient(@PathVariable("id") Long id, @RequestBody Client client) {
        return clientRepository.findById(id).map(existingClient -> {
            existingClient.setNom(client.getNom());
            existingClient.setPrenom(client.getPrenom());
            existingClient.setEmail(client.getEmail());
            existingClient.setImage(client.getImage());
            clientRepository.save(existingClient);
            return ResponseEntity.ok(existingClient);
        }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/checkOldPassword/{id}")
    public ResponseEntity<Boolean> checkOldPassword(@PathVariable("id") Long id, @RequestBody Map<String, String> passwordMap) {
        String oldPassword = passwordMap.get("oldPassword");
        return clientRepository.findById(id).map(existingClient -> {
            boolean isMatch = bCryptPasswordEncoder.matches(oldPassword, existingClient.getPassword());
            return ResponseEntity.ok(isMatch);
        }).orElse(ResponseEntity.notFound().build());
    }



    @PutMapping("/updatePassword/{id}")
    public ResponseEntity<Client> modifierPassword(@PathVariable("id") Long id, @RequestBody Client client) {
        return clientRepository.findById(id).map(existingClient -> {

            existingClient.setPassword(bCryptPasswordEncoder.encode(client.getPassword()));

            clientRepository.save(existingClient);
            return ResponseEntity.ok(existingClient);
        }).orElse(ResponseEntity.notFound().build());
    }









    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE )
    public void supprimerClient(@PathVariable("id") long id){
        clientService.supprimerClient(id);

    }

    @RequestMapping(method = RequestMethod.GET )
    public List<Client> afficherClient(){
        return clientService.listClient();

    }
    @RequestMapping(value = "/{id}" , method = RequestMethod.GET)
    public Optional<Client> getClientById(@PathVariable("id") long id){

        Optional<Client> client = clientService.getClientById(id);
        return client;
    }

    @RequestMapping(value = "/forgotmdp", method = RequestMethod.POST)
    public ResponseEntity<?> forgotMdp(@RequestBody Client client) {
        System.out.println("Demande de réinitialisation de mot de passe reçue pour l'e-mail: " + client);
        Client userFromDB = clientRepository.findClientByEmail(client.getEmail());
        if (userFromDB == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Utilisateur non trouvé");
        } else {
            String nvmdp = restPasswordServices.nvMdp();
            userFromDB.setPassword(bCryptPasswordEncoder.encode(nvmdp));
            //userFromDB.setResetToken(resetToken);
            //userFromDB.setResetTokenExpiry(Instant.now().plus(Duration.ofHours(24))); // Token expires in 24 hours
            clientRepository.save(userFromDB);

            //String resetLink = "https://localhost:8081/api/client/resetmdp?token=" + resetToken;
            emailService.SendSimpleMessage(client.getEmail(), "Votre nouveau mot de passe", "Bonjour,\n" +
                    "Votre mot de passe sur TutorLinkOnline a été re-initlaisé, le nouveau mot de passe est : " + nvmdp);
            return ResponseEntity.status(HttpStatus.OK).body("Instructions de réinitialisation du mot de passe envoyées à votre adresse e-mail");
        }
    }


    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginClient(@RequestBody Client client) {
        System.out.println("in login-Etudiant"+client);
        HashMap<String, Object> response = new HashMap<>();

        Client userFromDB = clientRepository.findClientByEmail(client.getEmail());
        System.out.println("userFromDB+client"+userFromDB);
        if (userFromDB == null) {
            response.put("message", "Etudiant not found !");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } else if (!userFromDB.getEtat()) {
            response.put("message", "Votre compte est désactivé");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);}
        else {
            boolean compare = this.bCryptPasswordEncoder.matches(client.getPassword(),userFromDB.getPassword());
            System.out.println("compare"+compare);
            if (!compare) {
                response.put("message", "Etudiant not found !");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }else
            {
                String token = Jwts.builder()
                        .claim("data", userFromDB)
                        .claim("role", "etudiant")
                        .signWith(SignatureAlgorithm.HS256, "SECRET")
                        .compact();
                response.put("token", token);
                System.out.println("hhh");
                return ResponseEntity.status(HttpStatus.OK).body(response);
            }

        }
    }

    @RequestMapping(value="/confirm-account", method= {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<?> confirmUserAccount(@RequestParam("token")String confirmationEmail) {
        return clientService.ConfirmationEmail(confirmationEmail);
    }

}
