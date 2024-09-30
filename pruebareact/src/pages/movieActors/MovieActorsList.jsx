import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavMenu from "../../components/NavMenu";
import { Link } from "react-router-dom";
import { Container, Table, Card, Row, Col, Button, Modal } from "react-bootstrap";

const MovieActorsList = () => {
    const { movieId } = useParams();  // Obtener el ID de la película desde la URL
    const [movie, setMovie] = useState(null);  // Almacena la película completa
    const [cast, setCast] = useState([]);  // Almacena el reparto (cast)
    const [showModal, setShowModal] = useState(false);  // Estado para controlar el modal
    const [selectedTrailerUrl, setSelectedTrailerUrl] = useState(null);  // URL del tráiler seleccionado

    useEffect(() => {
        getActorsForMovie();
    }, [movieId]);

    const getActorsForMovie = () => {
        axios.get(`http://localhost:3000/movies/movies/${movieId}/actors`)
            .then(res => {
                setMovie(res.data);
                setCast(res.data.cast || []);  // Asegúrate de que `cast` siempre sea un array
            }).catch(error => {
                console.log(error);
            });
    };

    const handleShowTrailer = (trailerUrl) => {
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

    if (!movie) {
        return <div>Cargando información de la película...</div>;
    }

    return (
        <>
        <NavMenu />
        <Container className="mt-3 mb-3">
            <Row>
                <Col md={4}>
                    <Card>
                        <Card.Img
                            variant="top"
                            src={`http://localhost:3000/movie/${movieId}.jpg`}  // URL de la imagen de la película
                            alt={`Portada de ${movie.title}`}
                        />
                        <Card.Body>
                            <Card.Title>{movie.title}</Card.Title>
                            <Card.Text>{movie.synopsis}</Card.Text>
                            <Button variant="primary" onClick={() => handleShowTrailer(movie.trailerUrl)}>
                                Ver Tráiler
                            </Button>  {/* Botón para ver el tráiler */}
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <h2>Actores de la Película: {movie.title}</h2>
                            </Card.Title>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Foto</th>
                                        <th>Nombre del Actor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cast.map(actor => (
                                        <tr key={actor.id}>
                                            <td>
                                                <img
                                                    src={`http://localhost:3000/actor/${actor.id}.jpg`}  // URL de la imagen del actor
                                                    alt={`Foto de ${actor.name}`}
                                                    width="80"
                                                    height="80"
                                                    style={{ borderRadius: '50%' }}  // Esto lo hace circular
                                                />
                                            </td>
                                            <td>
                                                <Link to={`/actors/${actor.id}/movies`}>
                                                    {actor.name}
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
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
};

export default MovieActorsList;
