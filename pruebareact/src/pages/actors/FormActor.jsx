import axios from "axios";
import { useEffect, useState } from "react";
import NavMenu from "../../components/NavMenu";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const FormActor = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    
    // Estado para el campo name del actor
    const [name, setName] = useState('');

    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (!id) return;
        getActorById();
    }, [id]);

    const getActorById = () => {
        axios.get(`http://localhost:3000/actors/${id}`)
            .then(res => {
                const actor = res.data;
                setName(actor.name);
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

        const actor = { name };

        if (id) {
            editActor(actor);
        } else {
            insertActor(actor);
        }
    };

    const editActor = (actor) => {
        axios.put(`http://localhost:3000/actors/${id}`, actor)
            .then(res => {
                console.log(res.data);
                navigate('/actors');
            }).catch(error => {
                console.log(error);
            });
    };

    const insertActor = (actor) => {
        axios.post('http://localhost:3000/actors', actor)
            .then(res => {
                console.log(res.data);
                navigate('/actors');
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
                                    <h2>Formulario Actor</h2>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    <Form.Group >
                                        <Form.Label>Nombre del Actor:</Form.Label>
                                        <Form.Control required value={name} type="text" onChange={(e) => setName(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese un nombre.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Button type="submit">Guardar Actor</Button>
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

export default FormActor;
