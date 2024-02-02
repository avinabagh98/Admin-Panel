"use client";

import { useEffect, useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert';
import { useRouter } from 'next/navigation';
import e from 'cors';

export default function UpdateForm({ id, name, username, role }) {

    const router = useRouter();

    const [newName, setNewName] = useState(name);
    const [newUsername, setNewUsername] = useState(username);
    const [newRole, setNewRole] = useState(role);

    const updatedUser = {
        id: id,
        name: newName,
        username: newUsername,
        role: newRole
    }

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
        updateFormSubmit(updatedUser).then(router.push('/customcssdashboard/user'));
    };

    return (
        <>
            <Form onSubmit={handleUpdateFormSubmit} className='bg-dark m-5 p-2'>
                <Row className="align-items-center">
                    <Col sm={3} className="my-1">
                        <Form.Control id="inlineFormInputName"
                            type="text"
                            placeholder="Name"
                            value={newName}
                            onChange={(e) => {
                                setNewName(e.target.value)
                            }}
                        />
                    </Col>
                    <Col sm={3} className="my-1">
                        <Form.Control
                            id="inlineFormInputGroupUsername"
                            placeholder="Username"
                            type="text"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                        />
                    </Col>

                    <Col sm={3} className="my-1">
                        <Form.Control
                            id="inlineFormInputGroupUsername"
                            placeholder="Role"
                            type="text"
                            value={newRole}
                            onChange={(e) => setNewRole(e.target.value)}
                        />
                    </Col>
                    <Col xs="auto" className="my-1">
                        <Button type="submit" variant='warning'>Update</Button>
                    </Col>
                </Row>
            </Form>
        </>
    )


}