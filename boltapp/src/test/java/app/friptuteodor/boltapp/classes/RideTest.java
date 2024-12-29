package app.friptuteodor.boltapp.classes;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import app.friptuteodor.boltapp.model.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.junit.jupiter.api.BeforeEach;

public class RideTest {

    private Driver mockDriver;
    private Passenger mockPassenger;
    private Coordinate startLocation;
    private Coordinate destLocation;
    private Ride ride;

    @BeforeEach
    public void setUp() {
        mockDriver = mock(Driver.class);
        mockPassenger = mock(Passenger.class);

        //def coordinates
        startLocation = new Coordinate(12.15, 77.78);
        destLocation = new Coordinate(15.17, 70.15);

        // mock the passenger's location
        when(mockPassenger.getLocation()).thenReturn(startLocation);

        // create the ride instance
        ride = new Ride(mockDriver, mockPassenger,destLocation);
    }

    @Test
    public void testRideInitialization() {
        // Verify initial state
        assertEquals(mockDriver, ride.getDriver());
        assertEquals(mockPassenger, ride.getPassenger());
        assertEquals(startLocation, ride.getStartLocation());
        assertEquals(destLocation, ride.getDestLocation());
        assertEquals(RideStatus.REQUESTED, ride.getStatus());
    }

    @Test
    public void testStartRide() {
        // Set up the driver availability
        when(mockDriver.isAvailable()).thenReturn(true);

        // Start the ride
        ride.startRide();

        // Verify state change
        assertEquals(RideStatus.ONGOING, ride.getStatus());
        verify(mockDriver).setAvailable(false);
    }

    @Test
    public void testEndRide() {
        // Set initial state to ONGOING
        Long rideId = 1L;


        ride.startRide();

        // End the ride
        ride.endRide();

        // Verify state change
        assertEquals(RideStatus.COMPLETED, ride.getStatus());
        verify(mockDriver).setAvailable(true);
    }

    @Test
    public void testStartRideWhenNotRequested() {
        // Set initial state to COMPLETED
        Long rideId = 1L;
        ride.startRide();
        ride.endRide();

        assertEquals(RideStatus.COMPLETED, ride.getStatus());

        // Try starting the ride again
        ride.startRide();

        // Verify state doesn't change
        assertEquals(RideStatus.COMPLETED, ride.getStatus());

        // verify setAvailable(false) was nnot invoked after the ride was completed
        verify(mockDriver, times(1)).setAvailable(false);
        verify(mockDriver, times(1)).setAvailable(true);
        verifyNoMoreInteractions(mockDriver);
    }

    @Test
    public void testEndRideWhenNotOngoing() {
        // End ride without starting it
        Long rideId = 1L;
        ride.endRide();

        // Verify state doesn't change
        assertEquals(RideStatus.REQUESTED, ride.getStatus()); // passed
        verify(mockDriver, never()).setAvailable(true);     // not passed
    }
}
