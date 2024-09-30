import axios from "axios";
import { useEffect, useState } from "react";
import NavMenu from "../../components/NavMenu";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const FormDirector = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    
    // Estado para el campo name del director
    const [name, setName] = useState('');

    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (!id) return;
        getDirectorById();
    }, [id]);

    const getDirectorById = () => {
        axios.get(`http://localhost:3000/directors/${id}`)
            .then(res => {
                const director = res.data;
                setName(director.name);
            }).catch(error => {
                console.log(error);
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

        const director = { name };

        if (id) {
            editDirector(director);
        } else {
            insertDirector(director);
        }
    };

    const editDirector = (director) => {
        axios.put(`http://localhost:3000/directors/${id}`, director)
            .then(res => {
                console.log(res.data);
                navigate('/directors');
            }).catch(error => {
                console.log(error);
            });
    };

    const insertDirector = (director) => {
        axios.post('http://localhost:3000/directors', director)
            .then(res => {
                console.log(res.data);
                navigate('/directors');
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
                                    <h2>Formulario Director</h2>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    <Form.Group >
                                        <Form.Label>Nombre del Director:</Form.Label>
                                        <Form.Control required value={name} type="text" onChange={(e) => setName(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese un nombre.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Button type="submit">Guardar Director</Button>
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

export default FormDirector;
