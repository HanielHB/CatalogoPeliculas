import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // Importar Link para redirección
import NavMenu from "../../components/NavMenu";
import { Container, Table, Card, Row, Col } from "react-bootstrap";

const ActorMoviesList = () => {
    const { actorId } = useParams();  // Obtener el ID del actor desde la URL
    const [actor, setActor] = useState(null);  // Almacena la información del actor
    const [movies, setMovies] = useState([]);  // Almacena las películas en las que ha actuado

    useEffect(() => {
        getMoviesForActor();
    }, [actorId]);

    const getMoviesForActor = () => {
        axios.get(`http://localhost:3000/actors/actors/${actorId}/movies`)
            .then(res => {
                setActor(res.data);
                setMovies(res.data.actedMovies || []);  // Asegúrate de que siempre sea un array
            }).catch(error => {
                console.log(error);
            });
    };

    if (!actor) {
        return <div>Cargando información del actor...</div>;
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
                            src={`http://localhost:3000/actor/${actorId}.jpg`}  // URL de la imagen del actor
                            alt={`Foto de ${actor.name}`}
                        />
                        <Card.Body>
                            <Card.Title>{actor.name}</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <h2>Películas de: {actor.name}</h2>
                            </Card.Title>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Portada</th>
                                        <th>Título</th>
                                        <th>Sinopsis</th>
                                        <th>Fecha de estreno</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {movies.map(movie => (
                                        <tr key={movie.id}>
                                            <td>
                                                <img
                                                    src={`http://localhost:3000/movie/${movie.id}.jpg`}  // URL de la imagen de la película
                                                    alt={`Portada de ${movie.title}`}
                                                    width="80"
                                                />
                                            </td>
                                            <td>
                                                <Link to={`/movies/${movie.id}/actors`}> {/* Enlace a la lista de actores */}
                                                    {movie.title}
                                                </Link>
                                            </td>
                                            <td>{movie.synopsis}</td>
                                            <td>{movie.releaseDate}</td>
                                        </tr>
                                    ))}
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

export default ActorMoviesList;
