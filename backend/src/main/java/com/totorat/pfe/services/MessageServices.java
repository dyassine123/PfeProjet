package com.totorat.pfe.services;

import com.totorat.pfe.Entite.Message;

import java.util.List;
import java.util.Optional;

public interface MessageServices {
    Message ajouterMessage(Message message);
    Message modifierMessage(Message message);
    List<Message> listMessages();
    void supprimerMessage(Long id);
    Optional<Message> getMessageById(Long id);
}

