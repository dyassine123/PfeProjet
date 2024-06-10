package com.totorat.pfe.RestController;

import com.totorat.pfe.Beans.ReservationRq;
import com.totorat.pfe.Entite.Reservation;
import com.totorat.pfe.services.ReservationServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/reservation")
public class ReservationRestController {

    @Autowired
    ReservationServices reservationServices ;

    @RequestMapping(method = RequestMethod.POST)
    public Reservation ajouterReservation(@RequestBody ReservationRq reservationRq){
        System.out.println("reserverRq"+reservationRq);
        return reservationServices.ajouterReservation(reservationRq);
    }

    @DeleteMapping("/cancel/{clientId}/{courseId}")
    public ResponseEntity<?> cancelReservation(@PathVariable Long clientId, @PathVariable Long courseId) {
        System.out.println("Attempting to cancel reservation for client " + clientId + " and course " + courseId);
        try {
            reservationServices.annulerReservation(clientId, courseId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }


    @GetMapping("/check-reservation/{clientId}/{courseId}")
    public ResponseEntity<Boolean> checkReservation(@PathVariable Long clientId, @PathVariable Long courseId) {
        boolean reserved = reservationServices.isReserved(clientId, courseId);
        return ResponseEntity.ok(reserved);
    }


    @RequestMapping("get-all-by-id-client/{id}")
    public List<Reservation> listReservationByClient(@PathVariable Long id){
        return reservationServices.listeCoursByClient(id);
    }



}
