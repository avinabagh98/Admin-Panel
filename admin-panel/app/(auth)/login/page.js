"use client";

import React from "react";
import Link from "next/link";
import { Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import styles from './login.module.css';
import { useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation'
import swal from 'sweetalert';



export default function Login() {

    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const formData = {
        username,
        password
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/login', formData);
            if (response.data.success) {
                const token = response.data.token
                localStorage.setItem("token", token);
                router.push('/customcssdashboard')

            }
            if (response.status === 401) {
                swal("login failed", "Invalid Credentials", "error")

            }

        } catch (error) {
            swal("login failed", error.response.data.message, "error");


        }

    }


    return (
        <Container className={styles.container}>
            <Row>
                <Col>
                    <div className={styles.formContainer}>
                        <Form className={styles.form} onSubmit={submitHandler}>
                            <div className={styles.heading}>
                                <p className="mb-3 text-center">Admin Panel Login</p>
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
                            <FloatingLabel controlId="floatingPassword" label="Password">
                                <Form.Control type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
                            </FloatingLabel>

                            <div>
                                <Button type="submit"
                                    variant="primary" className="w-100 mt-3">Login</Button>
                            </div>
                            <div><p className="my-2 text-center ">Don't have an account? <Link className="text-decoration-none" href="/register">Register</Link></p></div>
                        </Form>

                    </div>
                </Col>
            </Row>
        </Container>
    );
}