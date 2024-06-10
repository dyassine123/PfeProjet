package com.totorat.pfe.services;

import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class RestPasswordServicesImlp implements RestPasswordServices {
    @Override
    public String nvMdp() {
        String upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String lowerChars = upperChars.toLowerCase();
        String numbers = "0123456789";
        String specialChars = "!@#$%^&*()-_=+";

        // Combine all characters
        String allChars = upperChars + lowerChars + numbers + specialChars;

        // Generate random password of length 12
        Random random = new Random();
        StringBuilder password = new StringBuilder();
        for (int i = 0; i < 12; i++) {
            password.append(allChars.charAt(random.nextInt(allChars.length())));
        }
        return password.toString();
    }

}
