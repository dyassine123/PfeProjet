package com.totorat.pfe.services;

import com.totorat.pfe.Beans.SaveClient;

import com.totorat.pfe.Entite.*;
import com.totorat.pfe.Repository.ClientRepository;
import com.totorat.pfe.Repository.ConfirmationEmailRepository;
import com.totorat.pfe.Repository.SpecialiteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class ClientServicesImpl implements ClientServices{

    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Autowired
    ClientRepository clientRepository ;

    @Autowired
    EmailServiceClient emailServiceClient ;

    @Autowired
    ConfirmationEmailRepository confirmationEmailRepository ;

    @Autowired
    SpecialiteRepository specialiteRepository ;


    @Override
    public ResponseEntity<Object> ajouterClient(SaveClient model) {
        Client existingUser = clientRepository.findByEmail(model.getEmail());
        if (existingUser!=null) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        Client client= SaveClient.toEntity(model);
        System.out.println("idSpecialite"+model.getIdSpecialite());
        Specialite specialite=specialiteRepository.findById(model.getIdSpecialite()).get();
        client.setSpecialite(specialite);

        client.setPassword(this.bCryptPasswordEncoder.encode(client.getPassword()));
        clientRepository.save(client);
        ConfirmationEmail confirmationToken = new ConfirmationEmail(client);

        confirmationEmailRepository.save(confirmationToken);

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(client.getEmail());
        mailMessage.setSubject("Complete Registration!");
        mailMessage.setText("To confirm your account, please click here : "
                +"http://localhost:8081/api/client/confirm-account?token="+confirmationToken.getConfirmationToken());
        emailServiceClient.sendEmail(mailMessage);

        System.out.println("Confirmation Token: " + confirmationToken.getConfirmationToken());

        return ResponseEntity.ok("Verify email by the link sent on your email address");
    }

    @Override
    public ResponseEntity<?> ConfirmationEmail(String confirmationEmail) {
        ConfirmationEmail token = confirmationEmailRepository.findByConfirmationToken(confirmationEmail);

        if(token != null)
        {

            Client client = clientRepository.findByEmail(token.getClient().getEmail());
            System.out.println("email from token " +token.getClient().getEmail());
            client.setEtat(true);
            clientRepository.save(client);
            return ResponseEntity.ok("Email verified successfully! "+"http://localhost:4200/login");
        }else {

            return ResponseEntity.badRequest().body("Error: Couldn't verify email");}
    }

    @Override
    public Client modifierClient(Client client) {
        return clientRepository.save(client);
    }

    @Override
    public Client modifierPhoto(Client client) {
        return clientRepository.save(client);
    }

    public Client modifierPassword(Client client) {
        return clientRepository.save(client);
    }

    @Override
    public List<Client> listClient() {
        return clientRepository.findAll();
    }

    @Override
    public void supprimerClient(Long id) {

        clientRepository.deleteById(id);

    }

    @Override
    public Optional<Client> getClientById(Long id) {
        return clientRepository.findById(id);
    }


}
