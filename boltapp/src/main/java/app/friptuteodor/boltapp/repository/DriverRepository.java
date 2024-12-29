package app.friptuteodor.boltapp.repository;

import app.friptuteodor.boltapp.model.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DriverRepository extends ListCrudRepository<Driver, Long> {
    List<Driver> findByAvailableTrue();
}
