import { Button, Modal, Form } from "react-bootstrap";


export default function ModalPassenger({ showModal, handleClose, passengerData, handleSubmit, setPassengerData }) {

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name === 'available') {
            setPassengerData(prevData => ({
                ...prevData,
                [name]: event.target.checked
            }));
        }
        else if (name === 'latitude' || name === 'longitude') {
            setPassengerData(prevData => ({
                ...prevData,
                location: {
                    ...prevData.location,
                    [name]: parseFloat(value)
                }
            }));
        }
        else {
            setPassengerData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    return (
        <>
            < Modal show={showModal} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Passenger</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter driver name"
                                name="name"
                                value={passengerData.name}
                                onChange={handleInputChange}
                            />
                        </Form.Group>


                        <Form.Group controlId="formLatitude">
                            <Form.Label>Latitude</Form.Label>
                            <Form.Control
                                type="number"
                                step="any"
                                name="latitude"
                                value={passengerData.location.latitude}
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
                                value={passengerData.location.longitude}
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