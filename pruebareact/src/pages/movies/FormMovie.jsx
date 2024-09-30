import axios from "axios";
import { useEffect, useState } from "react";
import NavMenu from "../../components/NavMenu";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

const FormMovie = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    
    // Estados para los campos de la película
    const [title, setTitle] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [rottenTomatoesRating, setRottenTomatoesRating] = useState('');
    const [trailerUrl, setTrailerUrl] = useState('');
    const [directorId, setDirectorId] = useState('');

    const [directorsList, setDirectorsList] = useState([]);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (id) {
            getMovieById();
        }
    }, [id]);

    useEffect(() => {
        getListaDirectores();
    }, []);

    const getMovieById = () => {
        axios.get(`http://localhost:3000/movies/${id}`)
            .then(res => {
                const movie = res.data;
                setTitle(movie.title);
                setSynopsis(movie.synopsis);
                setReleaseDate(moment(movie.releaseDate).format('YYYY-MM-DD'));
                setRottenTomatoesRating(movie.rottenTomatoesRating);
                setTrailerUrl(movie.trailerUrl);
                setDirectorId(movie.directorId);
            }).catch(error => {
                console.log(error);
            });
    };

    const getListaDirectores = () => {
        axios.get('http://localhost:3000/directors')
            .then(res => {
                // Actualiza la lista de directores con todos los directores disponibles
                setDirectorsList(res.data);
            })
            .catch(error => {
                console.log('Error al obtener directores:', error);
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

        const movie = {
            title,
            synopsis,
            releaseDate,
            rottenTomatoesRating,
            trailerUrl,
            directorId // Asegúrate de que este sea el ID seleccionado correctamente
        };

        if (id) {
            editMovie(movie);
        } else {
            insertMovie(movie);
        }
    };

    const editMovie = (movie) => {
        axios.put(`http://localhost:3000/movies/${id}`, movie)
            .then(res => {
                console.log(res.data);
                navigate('/movies');
            }).catch(error => {
                console.log(error);
            });
    };

    const insertMovie = (movie) => {
        axios.post('http://localhost:3000/movies', movie)
            .then(res => {
                console.log(res.data);
                navigate('/movies');
            }).catch(error => {
                console.log(error);
            });
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
                                    <h2>Formulario Película</h2>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    <Form.Group >
                                        <Form.Label>Título:</Form.Label>
                                        <Form.Control required value={title} type="text" onChange={(e) => setTitle(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese un título.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Sinopsis:</Form.Label>
                                        <Form.Control required value={synopsis} type="text" onChange={(e) => setSynopsis(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese una sinopsis.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Fecha de estreno:</Form.Label>
                                        <Form.Control required value={releaseDate} type="date" onChange={(e) => setReleaseDate(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese una fecha de estreno válida.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Calificación Rotten Tomatoes:</Form.Label>
                                        <Form.Control required value={rottenTomatoesRating} type="number" step="0.1" onChange={(e) => setRottenTomatoesRating(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese una calificación.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>URL del tráiler:</Form.Label>
                                        <Form.Control required value={trailerUrl} type="url" onChange={(e) => setTrailerUrl(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese una URL válida.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Director:</Form.Label>
                                        <Form.Select required value={directorId} onChange={(e) => setDirectorId(e.target.value)}>
                                            <option value="">Seleccione un Director...</option>
                                            {directorsList.map(director =>
                                                <option key={"director-" + director.id} value={director.id}>{director.name}</option>
                                            )}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Por favor seleccione un Director.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Button type="submit">Guardar Película</Button>
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

export default FormMovie;
