"use client";

import { useEffect, useState } from 'react';
import swal from 'sweetalert';

export default function UpdateForm({ props }) {

    const { id } = props;

    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');



    useEffect(() => {
        try {
            async function fetchuserData(id) {
                try {
                    const res = await axios.get(`http://localhost:8080/getuserrolewithid/${id}`);
                    setName(res.data.name);
                    setUsername(res.data.username);
                    setRole(res.data.role);

                } catch (error) {
                    console.log(error);
                }
            }
            fetchuserData(id);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleUpdateFormSubmit = async (updatedUser) => {
        try {
            const response = await axios.put(`http://localhost:8080/updateuser/${id}`, updatedUser);
            swal(response.data.message);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Form onSubmit={handleUpdateFormSubmit}>
                <Row className="align-items-center">
                    <Col sm={3} className="my-1">
                        <Form.Control id="inlineFormInputName"
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </Col>
                    <Col sm={3} className="my-1">
                        <Form.Control
                            id="inlineFormInputGroupUsername"
                            placeholder="Username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Col>

                    <Col sm={3} className="my-1">
                        <Form.Control
                            id="inlineFormInputGroupUsername"
                            placeholder="Role"
                            type="text"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        />
                    </Col>
                    <Col xs="auto" className="my-1">
                        <Button type="submit" onClick={props.onHide}>Update</Button>
                    </Col>
                </Row>
            </Form>
        </>
    )


}