import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { Link } from "react-router-dom";

const ListaMovieActors = () => {
    const [ListaMovieActors, setListaMovieActors] = useState([]);

    useEffect(() => {
        getListaMovieActors();
        document.title = "Lista de Asignaciones Películas-Actores";
    }, []);

    const getListaMovieActors = () => {
        axios.get('http://localhost:3000/movieActors')
            .then(res => {
                setListaMovieActors(res.data);
            }).catch(error => {
                console.log(error);
            });
    };

    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar esta asignación?");
        if (!confirm) {
            return;
        }
        axios.delete(`http://localhost:3000/movieActors/${id}`)
            .then(res => {
                console.log(res.data);
                getListaMovieActors();  // Refresca la lista después de eliminar
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
                                    <h2>Lista de Asignaciones Películas-Actores</h2>
                                </Card.Title>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>ID Película</th>
                                            <th>Título de la Película</th>
                                            <th>ID Actor</th>
                                            <th>Nombre del Actor</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ListaMovieActors.map(asignacion =>
                                            <tr key={`${asignacion.movieId}-${asignacion.actorId}`}>
                                                
                                                <td>{asignacion.movie.title}</td>
                                                
                                                <td>{asignacion.actor.name}</td>
                                                <td><Link className="btn btn-primary" to={"/movie_actors/" + asignacion.id}>Editar</Link></td>
                                                <td><Button variant="danger" onClick={() => { eliminar(asignacion.id) }}>Eliminar</Button></td>
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

export default ListaMovieActors;
