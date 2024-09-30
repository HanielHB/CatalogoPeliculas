import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { Link } from "react-router-dom";

const ListaActors = () => {
    const [ListaActors, setListaActors] = useState([]);

    useEffect(() => {
        getListaActors();
        document.title = "Lista de Actores";
    }, []);

    const getListaActors = () => {
        axios.get('http://localhost:3000/actors')
            .then(res => {
                setListaActors(res.data);
            }).catch(error => {
                console.log(error);
            });
    };

    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar el registro?");
        if (!confirm) {
            return;
        }
        axios.delete(`http://localhost:3000/actors/${id}`)
            .then(res => {
                console.log(res.data);
                getListaActors();  // Refresca la lista después de eliminar
            }).catch(error => {
                console.log(error);
            });
    };

    return (
        <>
            <NavMenu />
            <Container className="mt-3 mb-3">
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h2>Lista de Actores</h2>
                                </Card.Title>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Foto</th>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ListaActors.map(actor =>
                                            <tr key={actor.id}>
                                                <td>
                                                    <img src={"http://localhost:3000/actor/" + actor.id + ".jpg"} alt="Foto de perfil" width="100" />
                                                </td>
                                                <td>{actor.id}</td>
                                                <td>{actor.name}</td>
                                                <td><Link className="btn btn-success" to={"/actors/" + actor.id + "/foto"}>Foto de Perfil</Link></td>
                                                <td><Link className="btn btn-primary" to={"/actors/" + actor.id}>Editar</Link></td>
                                                <td><Button variant="danger" onClick={() => { eliminar(actor.id) }}>Eliminar</Button></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ListaActors;
