package com.totorat.pfe.Beans;

import com.totorat.pfe.Entite.Cours;
import jakarta.persistence.Lob;

public class SaveCours {
    private Long id ;

    private String nom ;

    private String description ;

    private Long prix ;

    @Lob
    private String image;
    private Long idTuteur ;

    private Long idCategorie ;

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getPrix() {
        return prix;
    }

    public void setPrix(Long prix) {
        this.prix = prix;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdTuteur() {
        return idTuteur;
    }

    public void setIdTuteur(Long idTuteur) {
        this.idTuteur = idTuteur;
    }

    public Long getIdCategorie() {
        return idCategorie;
    }

    public void setIdCategorie(Long idCategorie) {
        this.idCategorie = idCategorie;
    }

    public static Cours toEntity(SaveCours model)
    {
        if(model == null)
        {
            return null ;
        }
        Cours cours=new Cours();
        cours.setId(model.getId());
        cours.setNom(model.getNom());
        cours.setDescription(model.getDescription());
        cours.setPrix(model.getPrix());
        cours.setImage(model.getImage());
        return cours;
    }
}
