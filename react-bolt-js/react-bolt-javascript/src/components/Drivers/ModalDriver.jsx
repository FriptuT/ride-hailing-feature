import { Button, Modal, Form } from "react-bootstrap";


export default function ModalDriver({ showModal, handleClose, driverData, handleSubmit, setDriverData }) {

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name === 'available') {
            setDriverData(prevData => ({
                ...prevData,
                [name]: event.target.checked
            }));
        }
        else if (name === 'latitude' || name === 'longitude') {
            setDriverData(prevData => ({
                ...prevData,
                location: {
                    ...prevData.location,
                    [name]: parseFloat(value)
                }
            }));
        }
        else {
            setDriverData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    return (
        <>
            < Modal show={showModal} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Driver</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter driver name"
                                name="name"
                                value={driverData.name}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formAvailable">
                            <Form.Check
                                type="checkbox"
                                label="Available"
                                name="available"
                                checked={driverData.available}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formLatitude">
                            <Form.Label>Latitude</Form.Label>
                            <Form.Control
                                type="number"
                                step="any"
                                name="latitude"
                                value={driverData.location.latitude}
                                onChange={handleInputChange}
                                placeholder="Enter latitude"
                            />
                        </Form.Group>

                        <Form.Group controlId="formLongitude">
                            <Form.Label>Longitude</Form.Label>
                            <Form.Control
                                type="number"
                                step="any"
                                name="longitude"
                                value={driverData.location.longitude}
                                onChange={handleInputChange}
                                placeholder="Enter longitude"
                            />
                        </Form.Group>



                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}