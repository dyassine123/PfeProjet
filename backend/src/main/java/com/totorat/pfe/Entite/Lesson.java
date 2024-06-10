package com.totorat.pfe.Entite;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;


@Getter
@Setter
@Entity
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id ;

    private String nom ;

    private LocalDate date_de_debut ;

    private LocalDate date_de_fin ;

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

    public LocalDate getDate_de_debut() {
        return date_de_debut;
    }

    public void setDate_de_debut(LocalDate date_de_debut) {
        this.date_de_debut = date_de_debut;
    }

    public LocalDate getDate_de_fin() {
        return date_de_fin;
    }

    public void setDate_de_fin(LocalDate date_de_fin) {
        this.date_de_fin = date_de_fin;
    }
}
