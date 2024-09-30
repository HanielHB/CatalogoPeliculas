import axios from "axios";
import { useEffect, useState } from "react";
import NavMenu from "../../components/NavMenu";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

const FotoMovie = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [fotoPerfil, setFotoPerfil] = useState(null);
    const [validated, setValidated] = useState(false);


    const onChangeFoto = (e) => {
        setFotoPerfil(e.target.files[0]);
    }
    const onGuardarClick = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (form.checkValidity() === false) {
            return;
        }
        const formData = new FormData();
        formData.append('fotoPerfil', fotoPerfil);
        axios.post(`http://localhost:3000/movies/${id}/foto`, formData)
            .then(res => {
                console.log(res.data);
                navigate(`/movies`);
            }).catch(error => {
                console.log(error);
            });
    }
    return (
        <>
            <NavMenu />
            <Container>
                <Row className="mt-3 mb-3">
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h2>Foto de perfil</h2>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    <Form.Group >
                                        <Form.Label>Seleccione una imagen:</Form.Label>
                                        <Form.Control required type="file" onChange={onChangeFoto} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor seleccione un archivo.
                                        </Form.Control.Feedback>

                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Button type="submit">Guardar datos</Button>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>);
}

export default FotoMovie;