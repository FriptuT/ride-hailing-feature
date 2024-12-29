import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import ModalPassenger from "./ModalPassenger";
import agent from "../../api-consuming/agent";
import { toast, ToastContainer } from "react-toastify";


export default function PassengersPage() {

    const [passengers, setPassengers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [passengerData, setPassengerData] = useState({
        id: '',
        name: '',
        location: {
            latitude: null,
            longitude: null
        }
    });



    // modal opening
    const handleShow = (passengerId) => {
        agent.Passengers.listOne(passengerId)
            .then(response => {
                setPassengerData({
                    id: response.id,
                    name: response.name,
                    location: response.location
                });
                setShowModal(true);
            })
            .catch(error => {
                console.error("Error fetching passenger data: ", error);
                toast.error('Failed to fetch passenger details');
            });
    };

    // modal closing
    const handleClose = () => setShowModal(false);

    // Handle form submission (e.g., saving data)
    const handleSubmit = (event) => {
        event.preventDefault();
        // Here we have to  send the data to API
        agent.Passengers.editPassenger(passengerData.id, passengerData)
            .then(updatedPassenger => {
                // update driver in the local state
                setPassengers((prevPassengers =>
                    prevPassengers.map(passenger =>
                        passenger.id === updatedPassenger.id ? updatedPassenger : passenger
                    )
                ));
                toast.success('Passenger updated successfuly');
                setShowModal(false);
            })
            .catch((error) => {
                console.error('Error updating passenger:', error);
                toast.error('Failed to update passenger')
            })
    };


    function getPassengers() {
        agent.Passengers.listAll()
            .then(response => {
                console.log('Get all passengers: ', response);
                setPassengers(response);
            })
            .catch(error => {
                console.error("Error in fetching passengers: ", error);
                toast.error('Failed to fetch passengers');
            })
        toast.success('Passengers fetched successfully');
    }


    function deletePassenger(id) {
        agent.Passengers.deletePassenger(id)
            .then(() => {
                setPassengers((prevPassengers) => prevPassengers.filter((passenger) => passenger.id !== id));
                toast.success("Passenger deleted successfully");
            })
            .catch((error) => {
                console.error("Error in deleting passenger: ", error);
                toast.error("Failed to delete passenger");
            })
    }

    useEffect(() => {
        getPassengers();
    }, []);


    return (
        <>
            <div className="container mt-4">
                <h2 className="mb-3">Passengers table</h2>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Longitude</th>
                            <th>Latitude</th>
                        </tr>
                    </thead>
                    <tbody>
                        {passengers.map((passenger) => (
                            <tr key={passenger.id}>
                                <td>{passenger.id}</td>
                                <td>{passenger.name}</td>
                                <td>{passenger.location?.longitude}</td>
                                <td>{passenger.location?.latitude}</td>
                                <td>
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => handleShow(passenger.id)}
                                    >Edit</Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => deletePassenger(passenger.id)}
                                    >Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <ModalPassenger
                    showModal={showModal}
                    handleClose={handleClose}
                    passengerData={passengerData}         // pass passenger data to Modal
                    handleSubmit={handleSubmit}
                    setPassengerData={setPassengerData}   // pass setter for passengerData to allow editing
                />
            </div>
            <ToastContainer />
        </>
    );
}