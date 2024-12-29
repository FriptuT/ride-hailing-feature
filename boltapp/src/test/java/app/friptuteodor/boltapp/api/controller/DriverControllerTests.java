package app.friptuteodor.boltapp.api.controller;


import app.friptuteodor.boltapp.controller.DriverController;
import app.friptuteodor.boltapp.model.Coordinate;
import app.friptuteodor.boltapp.model.Driver;
import app.friptuteodor.boltapp.repository.DriverRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;


import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public class DriverControllerTests {

    @Mock
    private DriverRepository driverRepository;

    @InjectMocks
    private DriverController driverController;


    @Test
    public void testGetAllDrivers(){
        // initialize mocks
        MockitoAnnotations.openMocks(this);

        // prepare mock data
        Coordinate locationDriver1 = new Coordinate(1,2);
        Coordinate locationDriver2 = new Coordinate(3,4);
        Driver driver1 = new Driver("Tati", locationDriver1 );
        Driver driver2 = new Driver("Tata", locationDriver2);

        List<Driver> mockDrivers = Arrays.asList(driver1, driver2);

        // define behaviour for the mocked repository
        when(driverRepository.findAll()).thenReturn(mockDrivers);

        // Call the method to test
        List<Driver> result = driverController.getAllDrivers();

        // verify the results
        assertThat(result).isNotNull();
        assertThat(result.size()).isEqualTo(2);
        assertThat(result).containsExactly(driver1, driver2);

        // verify repository interaction
        verify(driverRepository, times(1)).findAll();
    }

    @Test
    public void testGetDriverByID(){
        // initialize mocks
        MockitoAnnotations.openMocks(this);


        Long id = 1L;
        Coordinate locationDriver1 = new Coordinate(45.77,4.87);
        Driver driver1 = new Driver("Tati", locationDriver1);
        driver1.setId(id);

        // define behaviour for the mocked repository
        when(driverRepository.findById(id)).thenReturn(Optional.of(driver1));

        // call the method to test
        Driver response = driverController.getDriverById(id);

        // verify the results
        assertThat(response).isNotNull();
        assertThat(response.isAvailable()).isTrue();
        assertThat(response.getLocation()).isEqualTo(locationDriver1);

        // verify repo interaction
        verify(driverRepository, times(1)).findById(id);
    }
}
