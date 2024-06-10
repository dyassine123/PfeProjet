package com.totorat.pfe.services;

import com.totorat.pfe.Beans.ReservationRq;
import com.totorat.pfe.Entite.Client;
import com.totorat.pfe.Entite.Cours;
import com.totorat.pfe.Entite.Reservation;
import com.totorat.pfe.Repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class ReservationServicesImpl implements ReservationServices {

    @Autowired
    ReservationRepository reservationRepository ;

    @Autowired
    CoursServices coursServices ;

    @Autowired
    ClientServices clientServices ;

    @Override
    public Reservation ajouterReservation(ReservationRq reservationRq) {
        Optional<Client> client = clientServices.getClientById(reservationRq.getIdClient());
        Optional<Cours> cours = coursServices.getCoursById(reservationRq.getIdCours());
        System.out.println("IDclient"+ client);
        System.out.println("IDCours"+ cours);
        if (cours.isPresent() && client.isPresent()) {
            Reservation reservation = new Reservation();
            reservation.setCours(cours.get());
            reservation.setClient(client.get());
            return reservationRepository.save(reservation);}
        else{
            return null;}
    }

    @Override
    public void annulerReservation(Long clientId, Long courseId) {
        Optional<Reservation> reservationOpt = reservationRepository.findByClientIdAndCoursId(clientId, courseId);
        if (reservationOpt.isPresent()) {
            reservationRepository.delete(reservationOpt.get());
        } else {
            throw new IllegalStateException("No reservation found for the provided client and course IDs.");
        }
    }

    @Override
    public List<Reservation> listeReservation() {

        return reservationRepository.findAll();
    }

    @Override
    public List<Reservation> listeCoursByClient(Long id) {
        return reservationRepository.findByClientId(id) ;
    }

    @Override
    public boolean isReserved(Long clientId, Long courseId) {
        return reservationRepository.findByClientIdAndCoursId(clientId, courseId).isPresent();
    }
}
