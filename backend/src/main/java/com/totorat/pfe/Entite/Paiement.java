package com.totorat.pfe.Entite;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Date;

@Entity
public class Paiement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    private String email;
    private Long numeroCart ;
    private Long numeroSecret ;
    private Date dateValidite ;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getNumeroCart() {
        return numeroCart;
    }

    public void setNumeroCart(Long numeroCart) {
        this.numeroCart = numeroCart;
    }

    public Long getNumeroSecret() {
        return numeroSecret;
    }

    public void setNumeroSecret(Long numeroSecret) {
        this.numeroSecret = numeroSecret;
    }

    public Date getDateValidite() {
        return dateValidite;
    }

    public void setDateValidite(Date dateValidite) {
        this.dateValidite = dateValidite;
    }
}
