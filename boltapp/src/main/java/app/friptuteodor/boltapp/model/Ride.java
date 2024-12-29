package app.friptuteodor.boltapp.model;


import jakarta.persistence.*;

@Entity
public class Ride {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Driver driver;

    @ManyToOne Passenger passenger;


    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "latitude", column = @Column(name = "start_latitude")),
            @AttributeOverride(name = "longitude", column = @Column(name = "start_longitude"))
    })
    private Coordinate startLocation;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "latitude", column = @Column(name = "dest_latitude")),
            @AttributeOverride(name = "longitude", column = @Column(name = "dest_longitude"))
    })
    private Coordinate destLocation;

    @Enumerated(EnumType.STRING)
    private RideStatus status;

    public Ride(Driver driver, Passenger passenger, Coordinate destLocation) {
        this.driver = driver;
        this.passenger = passenger;
        this.startLocation = passenger.getLocation();
        this.destLocation = destLocation;
        this.status = RideStatus.REQUESTED;
    }

    public Ride() {

    }

    public void startRide() {
        if(status != RideStatus.REQUESTED) {
            return;
        }
        status = RideStatus.ONGOING;
        driver.setAvailable(false);
    }

    public void endRide() {
        if(status != RideStatus.ONGOING) {
            return;
        }
        status = RideStatus.COMPLETED;
        driver.setAvailable(true);
    }

    // getters and setters
    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public Driver getDriver() {
        return driver;
    }

    public void setDriver(Driver newDriver) {
        this.driver = newDriver;
    }

    public Passenger getPassenger() {
        return passenger;
    }
    public void setPassenger(Passenger newPassenger) {
        this.passenger = newPassenger;
    }

    public Coordinate getStartLocation() {
        return startLocation;
    }

    public void setStartLocation(Coordinate newStartLocation) {
        this.startLocation = newStartLocation;
    }

    public Coordinate getDestLocation() {
        return destLocation;
    }

    public void setDestLocation(Coordinate newDestLocation) {
        this.destLocation = newDestLocation;
    }

    public RideStatus getStatus() {
        return status;
    }

    public void setStatus(RideStatus newStatus) {
        this.status = newStatus;
    }
}
