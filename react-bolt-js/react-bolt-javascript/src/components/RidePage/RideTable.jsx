import { Button, Table } from "react-bootstrap";
import RideStatusEffect from "./RideStatusEffect";
import agent from "../../api-consuming/agent";
import { toast } from "react-toastify";


export default function RideTable({rides, handleStartRide, handleEndRide}){

    

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Rides Table</h2>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Passenger</th>
                        <th>Driver</th>
                        <th>Start Location</th>
                        <th>Destination</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {rides.map((ride) => (
                        <tr key={ride.id}>
                            <td>{ride.id}</td>
                            <td>{ride.passenger.name}</td>
                            <td>{ride.driver.name || "Unassigned"}</td>
                            <td>
                                ({ride.startLocation.latitude} , {ride.startLocation.longitude})
                            </td>
                            <td>
                                ({ride.destLocation.latitude}, {ride.destLocation.longitude})
                            </td>
                            <td>
                                <RideStatusEffect status={ride.status} />
                            </td>
                            <td>
                                {/* Render buttons based on status */}
                                {ride.status === "REQUESTED" && (
                                    <Button
                                        variant="success"
                                        size="sm"
                                        onClick={() => handleStartRide(ride.id)}
                                    >
                                        Start Ride
                                    </Button>
                                )}
                                {ride.status === "ONGOING" && (
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleEndRide(ride.id)}
                                    >
                                        End Ride
                                    </Button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}