import { useState } from "react";
import './HomePage.css'
import Button from 'react-bootstrap/Button';
import agent from "../../api-consuming/agent";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddPassenger from "../AddPassenger/AddPassenger";

export default function HomePage() {


    // =====================FOR DRIVER=========================
    const [enteredValues, setEnteredValues] = useState({
        available: true,
        latitude: 0,
        longitude: 0,
        name: ''
    });

    function handleSubmit(event) {
        event.preventDefault();

        const {name, latitude, longitude, available} = enteredValues;

        // structure data correctly for the backend
        const driverData = {
            name,
            available,
            location: {
                longitude: parseFloat(longitude) || null,
                latitude: parseFloat(latitude) || null
            }
        };

        console.log("Submitting driver data: ", driverData);

        // send data to back end
        agent.Drivers.addDriver(driverData)
            .then(response => {
                console.log('Response:', response);
                toast.success('Driver added successfully!')
            })
            .catch(error => {
                console.error('Error:', error);
                toast.error('Failed to add driver. Please try again.')
            })
    }

    function handleReset(event) {
        event.preventDefault();
        setEnteredValues({
            available: true,
            latitude: 0,
            longitude: 0,
            name: ''
        })
    }

    function handleInputChange(identifier, value) {
        setEnteredValues(prevValues => ({
            ...prevValues,
            [identifier]: (identifier === 'latitude' || identifier === 'longitude') ? parseFloat(value) : value
        }));
    }

    // =====================FOR PASSENGER=========================

    const [passengerValues, setPassengerValues] = useState({
        latitude: 0,
        longitude: 0,
        name: ''
    });

    function handlePassengerSubmit(event) {
        event.preventDefault();

        const {name, latitude, longitude} = passengerValues;

        // structure data correctly for the backend
        const passengerData = {
            name,
            location: {
                longitude: parseFloat(longitude) || null,
                latitude: parseFloat(latitude) || null
            }
        };

        console.log("Submitting passenger data: ", passengerData);

        // send data to back end
        agent.Passengers.addPassenger(passengerData)
            .then(response => {
                console.log('Response:', response);
                toast.success('Passenger added successfully!')
            })
            .catch(error => {
                console.error('Error:', error);
                toast.error('Failed to add passenger. Please try again.')
            })
    }


    function handlePassengerReset(event) {
        event.preventDefault();
        setEnteredValues({
            latitude: 0,
            longitude: 0,
            name: ''
        })
    }

    function handlePassengerInputChange(identifier, value) {
        setPassengerValues(prevValues => ({
            ...prevValues,
            [identifier]: (identifier === 'latitude' || identifier === 'longitude') ? parseFloat(value) : value
        }));
    }

    return (
        <>
            <div className="drivers-form">
                <h4>Add a driver</h4>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <br />
                    <input
                        type="text"
                        name="name"
                        onChange={(event) => handleInputChange('name', event.target.value)}
                        value={enteredValues.name}
                    />
                    <br />
                    <label htmlFor="latitute">Latitude</label><br />
                    <input
                        type="number"
                        step="any"
                        name="latitude"
                        onChange={(event) => handleInputChange('latitude', event.target.value)}
                        value={enteredValues.latitude}
                    />
                    <br />
                    <label htmlFor="longitude">Longitude</label><br />
                    <input
                        type="number"
                        step="any"
                        name="longitude"
                        onChange={(event) => handleInputChange('longitude', event.target.value)}
                        value={enteredValues.longitude}
                    />
                    <br/>
                    <label htmlFor="available">Available</label><br />
                    <input
                        type="checkbox"
                        name="available"
                        checked={enteredValues.available}
                        onChange={(event) => handleInputChange('available', event.target.checked)}
                    />
                    <br/>
                    <Button variant="primary" type="submit">Add driver</Button>
                    <Button variant="secondary" onClick={handleReset}>Reset</Button>
                </form>
            </div>
            <AddPassenger 
            passengerValues={passengerValues}
            handlePassengerSubmit={handlePassengerSubmit}
            handlePassengerReset={handlePassengerReset}
            handlePassengerInputChange={handlePassengerInputChange}
            />
            <ToastContainer />
        </>
    );
}