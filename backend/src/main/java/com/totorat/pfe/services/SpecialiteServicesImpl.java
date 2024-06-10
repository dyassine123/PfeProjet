package com.totorat.pfe.services;

import com.totorat.pfe.Entite.Specialite;
import com.totorat.pfe.Repository.SpecialiteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SpecialiteServicesImpl implements SpecialiteServices {

    @Autowired
    SpecialiteRepository specialiteRepository;

    @Override
    public Specialite ajouterSpecialite(Specialite specialite) {
        return specialiteRepository.save(specialite);
    }

    @Override
    public Specialite modifierSpecialite(Specialite specialite) {
        return specialiteRepository.save(specialite);
    }

    @Override
    public List<Specialite> listSpecialites() {
        return specialiteRepository.findAll();
    }

    @Override
    public void supprimerSpecialite(Long id) {
        specialiteRepository.deleteById(id);
    }

    @Override
    public Optional<Specialite> getSpecialiteById(Long id) {
        return specialiteRepository.findById(id);
    }
}

