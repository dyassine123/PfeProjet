package com.totorat.pfe.RestController;


import com.totorat.pfe.Entite.Message;
import com.totorat.pfe.Repository.MessageRepository;
import com.totorat.pfe.services.MessageServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/message")
public class MessageRestController {
    @Autowired
    MessageRepository messageRepository;
    @Autowired
    MessageServices messageServices;

    @RequestMapping(method = RequestMethod.POST )
    ResponseEntity<?> AjouterMessage (@RequestBody Message message){
        HashMap<String, Object> response = new HashMap<>();

            Message savedUser = messageRepository.save(message);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);}





    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE )
    public void supprimerMessage(@PathVariable("id") long id){
        messageServices.supprimerMessage(id);

    }

    @RequestMapping(method = RequestMethod.GET )
    public List<Message> afficherMessage(){
        return messageServices.listMessages();

    }
    @RequestMapping(value = "/{id}" , method = RequestMethod.GET)
    public Optional<Message> getMessageById(@PathVariable("id") long id){

        Optional<Message> message = messageServices.getMessageById(id);
        return message;
    }
}
