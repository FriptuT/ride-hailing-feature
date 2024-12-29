import { useEffect, useState } from "react";
import agent from "../../api-consuming/agent";
import { Button, Table } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import ModalDriver from "./ModalDriver";


export default function DriversPage() {

    const [drivers, setDrivers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [driverData, setDriverData] = useState({
        id: '',
        name: '',
        available: false,
        location: {
            latitude: null,
            longitude: null
        }
    });



    // modal opening
    const handleShow = (driverId) => {
        agent.Drivers.listOne(driverId)
            .then(response => {
                setDriverData({
                    id: response.id,
                    name: response.name,
                    available: response.available,
                    location: response.location
                });
                setShowModal(true);
            })
            .catch(error => {
                console.error("Error fetching driver data: ", error);
                toast.error('Failed to fetch driver details');
            });
    };

    // modal closing
    const handleClose = () => setShowModal(false);

    // Handle form submission (e.g., saving data)
    const handleSubmit = (event) => {
        event.preventDefault();
        // Here we have to  send the data to API
        agent.Drivers.editDriver(driverData.id, driverData)
            .then(updatedDriver => {
                // update driver in the local state
                setDrivers((prevDrivers =>
                    prevDrivers.map(driver =>
                        driver.id === updatedDriver.id ? updatedDriver : driver
                    )
                ));
                toast.success('Driver updated successfuly');
                setShowModal(false);
            })
            .catch((error) => {
                console.error('Error updating driver:', error);
                toast.error('Failed to update driver')
            })
    };


    function getDrivers() {
        agent.Drivers.listAll()
            .then(response => {
                console.log('Get all drivers: ', response);
                setDrivers(response);
            })
            .catch(error => {
                console.error("Error in fetching drivers: ", error);
                toast.error('Failed to fetch drivers');
            })
        toast.success('Drivers fetched successfully');
    }


    function deleteDriver(id) {
        agent.Drivers.deleteDriver(id)
            .then(() => {
                setDrivers((prevDrivers) => prevDrivers.filter((driver) => driver.id !== id));
                toast.success("Driver deleted successfully");
            })
            .catch((error) => {
                console.error("Error in deleting driver: ", error);
                toast.error("Failed to delete driver");
            })
    }

    useEffect(() => {
        getDrivers();
    }, []);

    return (
        <>
            <div className="container mt-4">
                <h2 className="mb-3">Drivers table</h2>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Available</th>
                            <th>Longitude</th>
                            <th>Latitude</th>
                        </tr>
                    </thead>
                    <tbody>
                        {drivers.map((driver) => (
                            <tr key={driver.id}>
                                <td>{driver.id}</td>
                                <td>{driver.name}</td>
                                <td>{driver.available ? "Yes" : "No"}</td>
                                <td>{driver.location?.longitude}</td>
                                <td>{driver.location?.latitude}</td>
                                <td>
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => handleShow(driver.id)}
                                    >Edit</Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => deleteDriver(driver.id)}
                                    >Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <ModalDriver
                    showModal={showModal}
                    handleClose={handleClose}
                    driverData={driverData}         // pass driver data to Modal
                    handleSubmit={handleSubmit}
                    setDriverData={setDriverData}   // pass setter for driverData to allow editing
                />
                <ToastContainer />
            </div>
        </>

    );
}