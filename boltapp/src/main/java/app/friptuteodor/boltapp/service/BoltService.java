package app.friptuteodor.boltapp.service;


import app.friptuteodor.boltapp.model.*;
import app.friptuteodor.boltapp.repository.DriverRepository;
import app.friptuteodor.boltapp.repository.RideRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoltService {
    @Autowired
    private DriverRepository driverRepository;

    @Autowired
    private RideRepository rideRepository;

    public Ride requestRide(Passenger passenger, Coordinate destination) {
        List<Driver> availableDrivers = driverRepository.findByAvailableTrue();
        Driver closestDriver = null;
        double minDistance = Double.MAX_VALUE;

        for(Driver driver : availableDrivers) {
            double distance = driver.getLocation().distanceTo(passenger.getLocation());
            if(distance < minDistance) {
                minDistance = distance;
                closestDriver = driver;
            }
        }

        if(closestDriver != null) {
            Ride ride = new Ride(closestDriver, passenger, destination);
            rideRepository.save(ride);
            return ride;
        }
        else
        {
            throw new RuntimeException("No driver available at the moment!");
        }
    }
}
