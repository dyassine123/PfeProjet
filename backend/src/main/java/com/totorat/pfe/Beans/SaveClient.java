package com.totorat.pfe.Beans;

import com.totorat.pfe.Entite.Client;



public class SaveClient {

    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String password;

    private Boolean etat ;

    private  Long idSpecialite ;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getEtat() {
        return etat;
    }

    public void setEtat(Boolean etat) {
        this.etat = etat;
    }

    public Long getIdSpecialite() {
        return idSpecialite;
    }

    public void setIdSpecialite(Long idSpecialite) {
        this.idSpecialite = idSpecialite;
    }


    public static Client toEntity(SaveClient model)
    {
        if(model == null)
        {
            return null ;
        }
        Client client=new Client();
        client.setId(model.getId());
        client.setNom(model.getNom());
        client.setPrenom(model.getPrenom());
        client.setEmail(model.getEmail());
        client.setPassword(model.getPassword());
        client.setEtat(model.getEtat());
        return client;
    }
}
