import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table, Modal  } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { Link } from "react-router-dom";
import moment from "moment";

const ListaMovies = () => {
    const [ListaMovies, setListaMovies] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedTrailerUrl, setSelectedTrailerUrl] = useState(null);
    
    useEffect(() => {
        getListaMovies();
        document.title = "Lista de Películas";
    }, []);

    const getListaMovies = () => {
        axios.get('http://localhost:3000/movies/')
            .then(res => {
                setListaMovies(res.data);
            }).catch(error => {
                console.log(error);
            });
    };

    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar esta película?");
        if (!confirm) {
            return;
        }
        axios.delete(`http://localhost:3000/movies/${id}`)
            .then(res => {
                console.log(res.data);
                getListaMovies();  // Refresca la lista después de eliminar
            }).catch(error => {
                console.log(error);
            });
    };

    const handleShowTrailer = (trailerUrl) => {
        // Solo transformar si la URL es de YouTube
        if (trailerUrl.includes("watch?v=")) {
            const embedUrl = trailerUrl.replace("watch?v=", "embed/");
            setSelectedTrailerUrl(embedUrl);
        } else {
            setSelectedTrailerUrl(trailerUrl);  // Si ya está en formato embed, úsalo directamente
        }
        setShowModal(true);
    };
    

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedTrailerUrl(null);
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
                                    <h2>Lista de Películas</h2>
                                </Card.Title>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Portada</th>
                                            <th>ID</th>
                                            <th>Título</th>
                                            <th>Sinopsis</th>
                                            <th>Fecha de estreno</th>
                                            <th>Calificación (Rotten Tomatoes)</th>
                                            <th>Tráiler</th>
                                            <th>Director</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {ListaMovies.map(movie =>
                                            <tr key={movie.id}>
                                                <td>
                                                    <img src={"http://localhost:3000/movie/" + movie.id + ".jpg"} alt="Portada de película" width="100" />
                                                </td>
                                                <td>{movie.id}</td>
                                                <td>{movie.title}</td>
                                                <td>{movie.synopsis}</td>
                                                <td>{moment(movie.releaseDate).format('DD/MM/YYYY')}</td>
                                                <td>{movie.rottenTomatoesRating}</td>
                                                <td>
                                                    <Button variant="primary" onClick={() => handleShowTrailer(movie.trailerUrl)}>Ver Tráiler</Button>
                                                </td>
                                                <td>{movie.movieDirector ? movie.movieDirector.name : "Sin Director"}</td>
                                                <td><Link className="btn btn-success" to={"/movies/" + movie.id + "/foto"}>Foto de Perfil</Link></td>
                                                <td><Link className="btn btn-primary" to={"/movies/" + movie.id}>Editar</Link></td>
                                                <td><Button variant="danger" onClick={() => { eliminar(movie.id) }}>Eliminar</Button></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            {/* Modal para mostrar el tráiler */}
            <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Tráiler</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedTrailerUrl ? (
                        <div className="embed-responsive embed-responsive-16by9">
                            <iframe
                                className="embed-responsive-item"
                                width="100%"
                                height="400px"
                                src={selectedTrailerUrl}
                                title="Tráiler"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    ) : <p>Tráiler no disponible</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ListaMovies;
