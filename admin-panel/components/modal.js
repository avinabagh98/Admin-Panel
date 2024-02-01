import { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import axios from 'axios';
import swal from 'sweetalert';
import { useRouter } from 'next/navigation';


export function MyVerticallyCenteredModal(props) {
    // console.log(props);

    try {
        // const randomNum = Math.floor(Math.random() * 100);
        // const [id, setId] = useState(props.user.id);
        const [name, setName] = useState(props.user.name);
        const [username, setUsername] = useState(props.user.username);
        const [role, setRole] = useState(props.user.role.name);

        const router = useRouter();

        const updatedUser = {
            id: id,
            name: name,
            username: username,
            role: role
        }

        useEffect(() => {

            setId(props.user.id);
            setName(props.user.name);
            setUsername(props.user.username);
            setRole(props.user.role.name);
        }, [])

        const handleNameChange = (e) => {
            setName(e.target.value);
        };
        const handleUsernameChange = (e) => {
            setUsername(e.target.value);
        };

        const handleRoleChange = (e) => {
            setRole(e.target.value);
        };

        const updateFormSubmit = async (updatedUser) => {
            try {
                const response = await axios.put(`http://localhost:8080/updateuser/${updatedUser.id}`, updatedUser);
                swal(response.data.message);
            } catch (error) {
                console.log(error)
            }
        }


        const handleUpdateFormSubmit = (e) => {
            e.preventDefault();
            updateFormSubmit(updatedUser).then(router.push('/user'));
        };





        return (
            <Modal

                onHide={props.onHide}
                show={props.show}

                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Update user: {props.user.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Form onSubmit={handleUpdateFormSubmit}>
                            <Row className="align-items-center">
                                {/* <Col sm={3} className="my-1">
                                    <Form.Control

                                        placeholder="Random num"
                                        value={randomNum}
                                    />
                                </Col> */}
                                <Col sm={3} className="my-1">
                                    <Form.Control id="inlineFormInputName"
                                        type="text"
                                        placeholder="Name"
                                        value={name}
                                        onChange={handleNameChange} />
                                </Col>
                                <Col sm={3} className="my-1">
                                    <Form.Control
                                        id="inlineFormInputGroupUsername"
                                        placeholder="Username"
                                        type="text"
                                        value={props.user.username}
                                        onChange={handleUsernameChange}
                                    />
                                </Col>

                                <Col sm={3} className="my-1">
                                    <Form.Control
                                        id="inlineFormInputGroupUsername"
                                        placeholder="Role"
                                        type="text"
                                        value={props.user.role.name}
                                        onChange={handleRoleChange}
                                    />
                                </Col>
                                <Col xs="auto" className="my-1">
                                    <Button type="submit" onClick={props.onHide}>Update</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Modal.Body>

            </Modal>
        )

    } catch (error) {
        console.log(error)
    }

}