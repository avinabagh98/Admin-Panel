"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button, Col, Container, Dropdown, FloatingLabel, Form, Row } from "react-bootstrap";
import styles from '../register/register.module.css';
import axios from 'axios';
import swal from 'sweetalert';
import { useRouter } from "next/navigation";


export default function Register() {

    const router = useRouter();

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [roleId, setRoleId] = useState("");
    const [roles, setRoles] = useState([]);

    const formData = {
        name,
        username,
        password,
        roleId
    }



    useEffect(() => {
        try {
            async function fetchRole() {
                const userDetails = await axios.get('http://localhost:8080/getroles');
                setRoles(userDetails.data)
            }
            fetchRole();
        } catch (error) {
            console.log(error)
        }
    }, [])


    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== cpassword) {
            swal("Password Mismatach", "Password and confirm password does not match", "warning")

        }
        else {
            try {
                const response = await axios.post('http://localhost:8080/adduser', formData);

                if (response.data.success) {
                    swal("Successfull", "successfully user created", "success")
                    router.push('/login');
                }

            }
            catch (error) {
                if (error.response.status === 401) {
                    swal("Warning", error.response.data.message, "warning")
                }
                else {
                    swal("Error", error.response.data.message, "error")
                }
            }
        }
    }



    return (
        <Container className={styles.container}>
            <Row>
                <Col>
                    <div className={styles.formContainer}>
                        <Form className={styles.form} onSubmit={submitHandler}>
                            <div className={styles.heading}>
                                <p className="mb-3 text-center">Admin Panel Register</p>
                            </div>
                            <div>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Name"
                                    className="mb-3"
                                >
                                    <Form.Control type="text" placeholder="username" required onChange={(e) => setName(e.target.value)} />
                                </FloatingLabel>
                            </div>
                            <div className="my-3">
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Username"
                                    className="mb-3"
                                >
                                    <Form.Control type="text" placeholder="username" required onChange={(e) => setUsername(e.target.value)} />
                                </FloatingLabel>
                            </div>
                            <div className="my-3">
                                <FloatingLabel controlId="floatingPassword" label="Password">
                                    <Form.Control type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
                                </FloatingLabel>
                            </div>
                            <div className="my-3">
                                <FloatingLabel controlId="floatingconfirmPassword" label="Confirm Password">
                                    <Form.Control type="password" placeholder="Confirm Password" required onChange={(e) => setCPassword(e.target.value)} />
                                </FloatingLabel>
                            </div>

                            <div>
                                <Form.Select aria-label="Default select example" onChange={(e) => setRoleId(e.target.value)}>
                                    <option>Select Role</option>
                                    {roles.map((role) => {
                                        return (
                                            <option value={role.id}>{role.name}</option>
                                        )
                                    })}
                                </Form.Select>


                            </div>
                            <div>
                                <Button type="submit"
                                    variant="primary" className="w-100 mt-3">Register</Button>
                            </div>
                            <div><p className="my-2 text-center ">Already have an account? <Link className="text-decoration-none" href="/login">Login</Link></p></div>
                        </Form>

                    </div>
                </Col>
            </Row >
        </Container >
    );
}