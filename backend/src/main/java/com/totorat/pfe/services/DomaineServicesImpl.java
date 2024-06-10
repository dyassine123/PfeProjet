package com.totorat.pfe.services;

import com.totorat.pfe.Entite.Domaine;
import com.totorat.pfe.Repository.DomaineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DomaineServicesImpl implements DomaineServices {

    @Autowired
    DomaineRepository domaineRepository;

    @Override
    public Domaine ajouterDomaine(Domaine domaine) {
        return domaineRepository.save(domaine);
    }

    @Override
    public Domaine modifierDomaine(Domaine domaine) {
        return domaineRepository.save(domaine);
    }

    @Override
    public List<Domaine> listDomaines() {
        return domaineRepository.findAll();
    }

    @Override
    public void supprimerDomaine(Long id) {
        domaineRepository.deleteById(id);
    }

    @Override
    public Optional<Domaine> getDomaineById(Long id) {
        return domaineRepository.findById(id);
    }
}

