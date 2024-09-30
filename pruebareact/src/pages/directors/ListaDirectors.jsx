import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { Link } from "react-router-dom";

const ListaDirectors = () => {
    const [ListaDirectors, setListaDirectors] = useState([]);

    useEffect(() => {
        getListaDirectors();
        document.title = "Lista de Directores";
    }, []);

    const getListaDirectors = () => {
        axios.get('http://localhost:3000/directors')
            .then(res => {
                setListaDirectors(res.data);
            }).catch(error => {
                console.log(error);
            });
    };

    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar el registro?");
        if (!confirm) {
            return;
        }
        axios.delete(`http://localhost:3000/directors/${id}`)
            .then(res => {
                console.log(res.data);
                getListaDirectors();  // Refresca la lista después de eliminar
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
                                    <h2>Lista de Directores</h2>
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
                                        {ListaDirectors.map(director =>
                                            <tr key={director.id}>
                                                <td>
                                                    <img src={"http://localhost:3000/director/" + director.id + ".jpg"} alt="Foto de perfil" width="100" />
                                                </td>
                                                <td>{director.id}</td>
                                                <td>{director.name}</td>
                                                <td><Link className="btn btn-success" to={"/directors/" + director.id + "/foto"}>Foto de Perfil</Link></td>
                                                <td><Link className="btn btn-primary" to={"/directors/" + director.id}>Editar</Link></td>
                                                <td><Button variant="danger" onClick={() => { eliminar(director.id) }}>Eliminar</Button></td>
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

export default ListaDirectors;
