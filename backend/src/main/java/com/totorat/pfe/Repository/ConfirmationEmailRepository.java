package com.totorat.pfe.Repository;

import com.totorat.pfe.Entite.ConfirmationEmail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConfirmationEmailRepository extends JpaRepository<ConfirmationEmail,Long> {
    ConfirmationEmail findByConfirmationToken(String confirmationEmail);
}
