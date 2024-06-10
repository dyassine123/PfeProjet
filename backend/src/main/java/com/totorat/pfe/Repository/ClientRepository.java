package com.totorat.pfe.Repository;

import com.totorat.pfe.Entite.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client,Long> {
    boolean existsByEmail(String email);

    Client findClientByEmail(String email);

    Client findByEmail(String email);

}

