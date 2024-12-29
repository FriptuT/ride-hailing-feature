package app.friptuteodor.boltapp.controller;


import app.friptuteodor.boltapp.model.Passenger;
import app.friptuteodor.boltapp.repository.DriverRepository;
import app.friptuteodor.boltapp.repository.PassengerRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/passengers")
public class PassengerController {

    private final PassengerRepository passengerRepository;
    private final DriverRepository driverRepository;

    public PassengerController(PassengerRepository passengerRepository, DriverRepository driverRepository) {
        this.passengerRepository = passengerRepository;
        this.driverRepository = driverRepository;
    }

    // get all drivers
    @GetMapping
    public List<Passenger> getAllPassengers() {
        return passengerRepository.findAll();
    }

    // get a single passenger by ID
    @GetMapping("/{id}")
    public Passenger getPassengerById(@PathVariable Long id) {
        return passengerRepository.findById(id).get();
    }

    // add passenger
    @PostMapping
    public Passenger addPassenger(@RequestBody Passenger passenger) {
        return passengerRepository.save(passenger);
    }

    // update existing passenger
    @PutMapping("/{id}")
    public Passenger updatePassenger(@PathVariable Long id, @RequestBody Passenger updatePassenger) {
        return passengerRepository.findById(id).map(passenger -> {
            passenger.setName(updatePassenger.getName());
            passenger.setLocation(updatePassenger.getLocation());
            return passengerRepository.save(passenger);
        }).orElseThrow(() -> new RuntimeException("Passenger not found with ID: " + id));
    }

    @DeleteMapping("/{id}")
    public void deletePassenger(@PathVariable Long id) {
        passengerRepository.deleteById(id);
    }
}
