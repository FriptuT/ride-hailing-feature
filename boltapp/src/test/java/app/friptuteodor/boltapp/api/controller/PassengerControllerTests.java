package app.friptuteodor.boltapp.api.controller;


import app.friptuteodor.boltapp.controller.PassengerController;
import app.friptuteodor.boltapp.model.Coordinate;
import app.friptuteodor.boltapp.model.Driver;
import app.friptuteodor.boltapp.model.Passenger;
import app.friptuteodor.boltapp.repository.PassengerRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import static org.mockito.Mockito.*;
import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


public class PassengerControllerTests {

    @Mock
    private PassengerRepository passengerRepository;

    @InjectMocks
    private PassengerController passengerController;

    @Test
    public void testGetAllPassengers() {
        //ARRANGE
        // initialize mocks
        MockitoAnnotations.openMocks(this);

        // prepare mock data
        Coordinate locationPass1 = new Coordinate(1,2);
        Coordinate locationPass2 = new Coordinate(2,3);
        Passenger passenger1 = new Passenger("Teodor",locationPass1);
        Passenger passenger2 = new Passenger("Mami",locationPass2);

        List<Passenger> mockPassengers = Arrays.asList(passenger1, passenger2);

        // ACT
        when(passengerRepository.findAll()).thenReturn(mockPassengers);

        // call the method to test
        List<Passenger> passengers = passengerController.getAllPassengers();

        //ASSERT
        // verify the results
        assertThat(passengers).isNotNull();
        assertThat(passengers.size()).isEqualTo(2);
        assertThat(passengers).containsExactly(passenger1, passenger2);

        verify(passengerRepository, times(1)).findAll();
    }

}
