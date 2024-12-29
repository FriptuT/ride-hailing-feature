import { useEffect, useState } from "react";
import agent from "../../api-consuming/agent";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "react-bootstrap";
import './RidePage.css';
import RideTable from "./RideTable";


export default function RidePage() {

    const [rideValues, setRideValues] = useState({
        passengerId: '',
        destX: 0,
        destY: 0
    });

    const [passengers, setPassengers] = useState([]);

    // Fetch passengers when the form loads
    useEffect(() => {
        agent.Passengers.listAll()
            .then(response => {
                console.log('ToSelect passengers: ', response);
                setPassengers(response);
            })
            .catch(error => {
                console.error("Error fetching passengers:", error);
                toast.error('Failed to load passengers.');
            });

            fetchRides();
    }, []);

    function handleSubmit(event) {
        event.preventDefault();

        const { passengerId, destX, destY } = rideValues;

        if (!passengerId) {
            toast.error('Please select a passenger.');
            return;
        }

        const rideData = {
            passengerId: parseInt(passengerId, 10),
            destX: parseFloat(destX),
            destY: parseFloat(destY)
        };

        console.log("Submitting ride request data:", rideData);

        // send data to backend
        agent.Rides.requestRide(rideData.passengerId, rideData.destX, rideData.destY)
            .then(response => {
                console.log("Ride request successful:", response);
                toast.success("Ride requested successfully!");
                fetchRides();
            })
            .catch(error => {
                console.error("Error requesting ride:", error);
                toast.error("Failed to request a ride. Please try again.");
            });
    }

    function handleReset(event) {
        event.preventDefault();
        setRideValues({
            passengerId: '',
            destX: 0,
            destY: 0,
        });
    }

    function handleInputChange(identifier, value) {
        setRideValues(prevValues => ({
            ...prevValues,
            [identifier]: value,
        }));
    }

    // ------------------------------RIDES TABLE-----------------------------
    const [rides, setRides] = useState([]);

    function fetchRides(){
        agent.Rides.listAll()
            .then((response) => {
                console.log("Fetched rides:", response);
                setRides(response);
            })
            .catch((error) => {
                console.error("Error fetching rides: ", error);
            });
    }

    // Handle start ride
    const handleStartRide = (id) => {
        agent.Rides.startRide(id)
            .then((response) => {
                toast.success("Ride started!");
                setRides((prevRides) => prevRides.map(ride => 
                    ride.id === id ? { ...ride, status: "ONGOING" } : ride
                ));
            })
            .catch((error) => {
                console.error("Error starting ride:", error);
                toast.error("Failed to start ride");
            });
    };

    // Handle end ride
    const handleEndRide = (id) => {
        agent.Rides.endRide(id)
            .then((response) => {
                toast.success("Ride ended!");
                setRides((prevRides) => prevRides.map(ride => 
                    ride.id === id ? { ...ride, status: "COMPLETED" } : ride
                ));
            })
            .catch((error) => {
                console.error("Error ending ride:", error);
                toast.error("Failed to end ride");
            });
    };

    return (
        <>
            <div className="ride-request-form">
                <h4>Request a Ride</h4>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="passengerId">Passenger</label>
                    <br />
                    <select
                        name="passengerId"
                        onChange={(event) => handleInputChange('passengerId', event.target.value)}
                        value={rideValues.passengerId}
                    >
                        <option value="">Select a passenger</option>
                        {passengers.map(passenger => (
                            <option key={passenger.id} value={passenger.id}>
                                {passenger.name}
                            </option>
                        ))}
                    </select>
                    <br />
                    <label htmlFor="destX">Destination Latitude (destX)</label>
                    <br />
                    <input
                        type="number"
                        step="any"
                        name="destX"
                        onChange={(event) => handleInputChange('destX', event.target.value)}
                        value={rideValues.destX}
                    />
                    <br />
                    <label htmlFor="destY">Destination Longitude (destY)</label>
                    <br />
                    <input
                        type="number"
                        step="any"
                        name="destY"
                        onChange={(event) => handleInputChange('destY', event.target.value)}
                        value={rideValues.destY}
                    />
                    <br />
                    <Button variant="primary" type="submit">Request Ride</Button>
                    <Button variant="secondary" onClick={handleReset}>Reset</Button>
                </form>
            </div>

            <RideTable
            rides={rides}
            handleStartRide={handleStartRide}
            handleEndRide={handleEndRide}
            />


            <ToastContainer />
        </>

    );
}