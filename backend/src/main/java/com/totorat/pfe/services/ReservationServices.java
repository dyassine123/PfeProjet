package com.totorat.pfe.services;

import com.totorat.pfe.Beans.ReservationRq;
import com.totorat.pfe.Entite.Reservation;

import java.util.List;

public interface ReservationServices {

    Reservation ajouterReservation(ReservationRq reservationRq);




    List<Reservation> listeReservation();

    List<Reservation> listeCoursByClient(Long id);

    void annulerReservation(Long clientId, Long courseId);

    boolean isReserved(Long clientId, Long courseId);
}
