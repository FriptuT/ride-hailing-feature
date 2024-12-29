package app.friptuteodor.boltapp.repository;

import app.friptuteodor.boltapp.model.Ride;
import org.springframework.data.repository.ListCrudRepository;

public interface RideRepository extends ListCrudRepository<Ride, Long> {
}
