package com.totorat.pfe.Beans;


import com.totorat.pfe.Entite.Tuteur;

public class SaveTuteur {

    private Long id ;

    private  String nom ;

    private  String prenom ;

    private String email ;

    private String password ;

    private boolean etat ;

    private Long idDomaine ;


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

    public boolean isEtat() {
        return etat;
    }

    public void setEtat(boolean etat) {
        this.etat = etat;
    }

    public Long getIdDomaine() {
        return idDomaine;
    }

    public void setIdDomaine(Long idDomaine) {
        this.idDomaine = idDomaine;
    }

    public static Tuteur toEntity(SaveTuteur model)
    {
        if(model == null)
        {
            return null ;
        }
        Tuteur tuteur=new Tuteur();
        tuteur.setId(model.getId());
        tuteur.setNom(model.getNom());
        tuteur.setPrenom(model.getPrenom());
        tuteur.setEmail(model.getEmail());
        tuteur.setPassword(model.getPassword());
        tuteur.setEtat(model.isEtat());
        return tuteur;
    }
}
