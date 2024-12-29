package app.friptuteodor.boltapp.DTOs;

import app.friptuteodor.boltapp.model.RideStatus;

public record RideDTO(
        Long id,
        String passengerName,
        String driverName,
        double startLatitude,
        double startLongitude,
        double destLatitude,
        double destLongitude,
        RideStatus status
) {
}
