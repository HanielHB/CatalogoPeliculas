import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavMenu = () => {
    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Proyecto</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Movies" id="basic-nav-dropdown">
                            <Link className="dropdown-item" to={"/movies"}>Lista de Movies</Link>
                            <Link className="dropdown-item" to="/movies/create">
                                Crear Movies
                            </Link>
                        </NavDropdown>
                        <NavDropdown title="Actores" id="basic-nav-dropdown">
                            <Link className="dropdown-item" to={"/actors"}>Lista de Actores</Link>
                            <Link className="dropdown-item" to="/actors/create">
                                Crear Actor
                            </Link>
                        </NavDropdown>
                        <NavDropdown title="MovieActores" id="basic-nav-dropdown">
                            <Link className="dropdown-item" to={"/movieActors"}>Lista de MovieActores</Link>
                            <Link className="dropdown-item" to="/movieActors/create">
                                Crear MovieActor
                            </Link>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavMenu;