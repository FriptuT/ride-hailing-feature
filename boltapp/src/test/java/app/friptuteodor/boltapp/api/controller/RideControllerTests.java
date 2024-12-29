package app.friptuteodor.boltapp.api.controller;


import app.friptuteodor.boltapp.controller.RideController;
import app.friptuteodor.boltapp.model.Ride;
import app.friptuteodor.boltapp.repository.RideRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class RideControllerTests {

    private RideController rideController;

    @Mock
    private RideRepository rideRepository;

    @Mock
    private Ride mockRide;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);

        rideController = new RideController(rideRepository);
    }

//    @Test
//    public void testEndRide_Successful () throws Exception {
//
//        // Arrange
//        Long ride = 1L;
//
//        when(rideRepository.findById(ride)).thenReturn(Optional.of(mockRide));
//
//        //Act
//        rideController.endRide(ride);
//
//        // assert
//        verify(mockRide).endRide(ride);
//        verify(rideRepository).save(mockRide);
//    }

    @Test
    public void testEndRide_RideNotFound () throws Exception {

        // Arrange
        Long rideId = 1L;

        // Mock the repository to return an empty Optional
        when(rideRepository.findById(rideId)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            rideController.endRide(rideId);
        });

        assertEquals("Ride not found", exception.getMessage());

        // Verify that save() is never called
        verify(rideRepository, never()).save(any());
    }
}
