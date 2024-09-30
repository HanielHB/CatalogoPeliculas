import axios from "axios";
import { useEffect, useState } from "react";
import NavMenu from "../../components/NavMenu";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const FormMovieActors = () => {
    const navigate = useNavigate();
    
    // Estados para las películas y actores
    const [movieId, setMovieId] = useState('');
    const [actorId, setActorIds] = useState([]);

    const [moviesList, setMoviesList] = useState([]);
    const [actorsList, setActorsList] = useState([]);
    const [validated, setValidated] = useState(false);

    // Cargar lista de películas y actores
    useEffect(() => {
        getListaMovies();
        getListaActors();
    }, []);

    const getListaMovies = () => {
        axios.get('http://localhost:3000/movies')
            .then(res => {
                setMoviesList(res.data);
            })
            .catch(error => {
                console.log('Error al obtener películas:', error);
            });
    };

    const getListaActors = () => {
        axios.get('http://localhost:3000/actors')
            .then(res => {
                setActorsList(res.data);
            })
            .catch(error => {
                console.log('Error al obtener actores:', error);
            });
    };

    const onGuardarClick = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (form.checkValidity() === false) {
            return;
        }

        // Creando el objeto para movie_actors
        const movieActors = {
            movieId,
            actorId  // Es un array de IDs de actores seleccionados
        };

        insertMovieActors(movieActors);
    };

    const insertMovieActors = (movieActors) => {
        axios.post('http://localhost:3000/movieActors', movieActors)
            .then(res => {
                console.log(res.data);
                navigate('/movieActors');  // Redirige a la lista de movie_actors
            }).catch(error => {
                console.log(error);
            });
    };

    const onActorChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions);
        const selectedActorIds = selectedOptions.map(option => option.value);
        setActorIds(selectedActorIds);
    };

    return (
        <>
            <NavMenu />
            <Container>
                <Row className="mt-3 mb-3">
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h2>Asignar Actores a Película</h2>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    <Form.Group>
                                        <Form.Label>Película:</Form.Label>
                                        <Form.Select required value={movieId} onChange={(e) => setMovieId(e.target.value)}>
                                            <option value="">Seleccione una Película...</option>
                                            {moviesList.map(movie =>
                                                <option key={"movie-" + movie.id} value={movie.id}>{movie.title}</option>
                                            )}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Por favor seleccione una película.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    
                                    <Form.Group>
                                        <Form.Label>Actores:</Form.Label>
                                        <Form.Select multiple required value={actorId} onChange={onActorChange}>
                                            {actorsList.map(actor =>
                                                <option key={"actor-" + actor.id} value={actor.id}>{actor.name}</option>
                                            )}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Por favor seleccione al menos un actor.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mt-3">
                                        <Button type="submit">Guardar Asignación</Button>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default FormMovieActors;
