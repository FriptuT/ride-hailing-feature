package app.friptuteodor.boltapp.controller;


import app.friptuteodor.boltapp.DTOs.RideDTO;
import app.friptuteodor.boltapp.model.Coordinate;
import app.friptuteodor.boltapp.model.Passenger;
import app.friptuteodor.boltapp.model.Ride;
import app.friptuteodor.boltapp.repository.PassengerRepository;
import app.friptuteodor.boltapp.repository.RideRepository;
import app.friptuteodor.boltapp.service.BoltService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/rides")
public class RideController {

    private final RideRepository rideRepository;
    @Autowired
    private BoltService boltService;
    @Autowired
    private PassengerRepository passengerRepository;

    public RideController(RideRepository rideRepository) {
        this.rideRepository = rideRepository;
    }


    @GetMapping
    public List<Ride> getAllRides(){
        return rideRepository.findAll();
    }

    @GetMapping("/{rideId}")
    public Ride getRide(@PathVariable Long rideId){
        return rideRepository.findById(rideId).get();
    }

    @PostMapping("/request")
    public RideDTO requestRide(@RequestParam Long passengerId, @RequestParam double destX, @RequestParam double destY) {
        Passenger passenger = passengerRepository.findById(passengerId).orElseThrow(() -> new RuntimeException("Passenger not found"));
        Coordinate destination = new Coordinate(destX, destY);
        Ride ride = boltService.requestRide(passenger, destination);

        return new RideDTO(
                ride.getId(),
                ride.getPassenger().getName(),
                ride.getDriver() != null ? ride.getDriver().getName() : "No driver assigned yet",
                ride.getStartLocation().getLatitude(),
                ride.getStartLocation().getLongitude(),
                ride.getDestLocation().getLatitude(),
                ride.getDestLocation().getLongitude(),
                ride.getStatus()
        );
    }

    @PostMapping("/{id}/start")
    public RideDTO startRide(@PathVariable Long id){
        Ride ride = rideRepository.findById(id).orElseThrow(() -> new RuntimeException("Ride not found"));
        ride.startRide();
        rideRepository.save(ride);

        return new RideDTO(
                ride.getId(),
                ride.getPassenger().getName(),
                ride.getDriver() != null ? ride.getDriver().getName() : "No driver assigned yet",
                ride.getStartLocation().getLatitude(),
                ride.getStartLocation().getLongitude(),
                ride.getDestLocation().getLatitude(),
                ride.getDestLocation().getLongitude(),
                ride.getStatus()
        );
    }

    @PostMapping("/{id}/end")
    public RideDTO endRide(@PathVariable Long id) {
        Ride ride = rideRepository.findById(id).orElseThrow(() -> new RuntimeException("Ride not found"));
        ride.endRide();
        rideRepository.save(ride);

        return new RideDTO(
                ride.getId(),
                ride.getPassenger().getName(),
                ride.getDriver() != null ? ride.getDriver().getName() : "No driver assigned yet",
                ride.getStartLocation().getLatitude(),
                ride.getStartLocation().getLongitude(),
                ride.getDestLocation().getLatitude(),
                ride.getDestLocation().getLongitude(),
                ride.getStatus()
        );
    }

}

