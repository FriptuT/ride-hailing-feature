import { Button } from "react-bootstrap";
import './AddPassenger.css';

export default function AddPassenger({passengerValues, handlePassengerSubmit, handlePassengerReset, handlePassengerInputChange}){
    return (
        <>
            <div className="passenger-form">
                <h4>Add a passenger</h4>
                <form onSubmit={handlePassengerSubmit}>
                    <label htmlFor="name">Name</label>
                    <br />
                    <input
                        type="text"
                        name="name"
                        onChange={(event) => handlePassengerInputChange('name', event.target.value)}
                        value={passengerValues.name}
                    />
                    <br />
                    <label htmlFor="latitute">Latitude</label><br />
                    <input
                        type="number"
                        step="any"
                        name="latitude"
                        onChange={(event) => handlePassengerInputChange('latitude', event.target.value)}
                        value={passengerValues.latitude}
                    />
                    <br />
                    <label htmlFor="longitude">Longitude</label><br />
                    <input
                        type="number"
                        step="any"
                        name="longitude"
                        onChange={(event) => handlePassengerInputChange('longitude', event.target.value)}
                        value={passengerValues.longitude}
                    />
                    <br/>
                    <Button variant="primary" type="submit">Add passenger</Button>
                    <Button variant="secondary" onClick={handlePassengerReset}>Reset</Button>
                </form>
            </div>
        </>
    );
}