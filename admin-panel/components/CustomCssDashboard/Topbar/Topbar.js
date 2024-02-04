"use client";

import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import styles from './Topbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBackward } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';


export default function Topbar() {
    const router = useRouter();
    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    return (
        <>
            <Container fluid>
                <Navbar expand="lg" className={styles.navbar}>
                    <Nav className="d-flex align-items-center gap-2">
                        <FontAwesomeIcon icon={faUser} className={styles.icon} />
                        <Nav.Link href="#pricing" onClick={handleLogout}>Logout</Nav.Link>
                    </Nav>
                </Navbar>
            </Container>
        </>
    )
}