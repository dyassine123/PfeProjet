package com.totorat.pfe.services;

import org.springframework.mail.SimpleMailMessage;

public interface EmailServiceClient {

    void sendEmail(SimpleMailMessage email) ;
}
