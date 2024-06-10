package com.totorat.pfe.Repository;

import com.totorat.pfe.Entite.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByClientId(Long id);

    Optional<Reservation> findByClientIdAndCoursId(Long clientId, Long courseId);
}
