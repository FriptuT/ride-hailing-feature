import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router';

export default function Header() {

    return (
        <Nav fill variant="tabs">
            <Nav.Item className="nav-border">
                <Nav.Link as={Link} to="homepage">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="drivers">Drivers</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="passengers">Passengers</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="ask-a-ride">Ask a Ride!</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}