package com.totorat.pfe.services;


import com.totorat.pfe.Beans.SaveClient;
import com.totorat.pfe.Entite.Client;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface ClientServices {
    ResponseEntity<Object> ajouterClient(SaveClient model);

    ResponseEntity<?>ConfirmationEmail(String confirmationEmail) ;
    Client modifierClient(Client client);

    Client modifierPhoto(Client client);

    Client modifierPassword(Client client);
    List<Client> listClient();
    void supprimerClient(Long id);
    Optional<Client> getClientById(Long id);


}
