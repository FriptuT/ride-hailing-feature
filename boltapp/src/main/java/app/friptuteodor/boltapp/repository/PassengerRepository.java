package app.friptuteodor.boltapp.repository;

import app.friptuteodor.boltapp.model.Passenger;
import org.springframework.data.repository.ListCrudRepository;

public interface PassengerRepository extends ListCrudRepository<Passenger, Long> {
}
