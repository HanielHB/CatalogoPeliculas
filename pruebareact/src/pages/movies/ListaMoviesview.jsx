import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table, Modal  } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import moment from "moment";
import { Link } from "react-router-dom";

const ListaMoviesview = () => {
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
                // Ordenar las películas por la calificación de Rotten Tomatoes de forma descendente
                const sortedMovies = res.data.sort((a, b) => b.rottenTomatoesRating - a.rottenTomatoesRating);
                setListaMovies(sortedMovies);
            }).catch(error => {
                console.log(error);
            });
    };

    const handleShowTrailer = (trailerUrl) => {
        if (trailerUrl.includes("watch?v=")) {
            const embedUrl = trailerUrl.replace("watch?v=", "embed/");
            setSelectedTrailerUrl(embedUrl);
        } else {
            setSelectedTrailerUrl(trailerUrl);
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
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ListaMovies.map(movie => (
                                            <tr key={movie.id}>
                                                <td>
                                                    <img src={"http://localhost:3000/movie/" + movie.id + ".jpg"} alt="Portada de película" width="100" />
                                                </td>
                                                <td>{movie.id}</td>
                                                <td>
                                                    <Link to={`/movies/${movie.id}/actors`}>
                                                        {movie.title}
                                                    </Link>
                                                </td>
                                                <td>{movie.synopsis}</td>
                                                <td>{moment(movie.releaseDate).format('DD/MM/YYYY')}</td>
                                                <td>{movie.rottenTomatoesRating}</td>
                                                <td>
                                                    <Button variant="primary" onClick={() => handleShowTrailer(movie.trailerUrl)}>Ver Tráiler</Button>
                                                </td>
                                                <td>{movie.movieDirector ? movie.movieDirector.name : "Sin Director"}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
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

export default ListaMoviesview;
