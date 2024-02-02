"use client";
// Import necessary libraries
import React from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import styles from './sidebar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

// Main component for Admin Panel
const CustomSidebar = () => {
    return (
        <Container fluid>
            <Row>
                {/* Sidebar */}
                <Col md={2} className={styles.sidebar}>
                    <Nav defaultActiveKey="/dashboard" className="flex-column">
                        {/* Sidebar content goes here */}
                        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link href="/customcssdashboard/user">Users</Nav.Link>
                        <Nav.Link href="/settings">Settings</Nav.Link>
                    </Nav>
                </Col>

                {/* Main Content */}
                <Col md={10} className={styles.mainContent}>
                    {/* Navbar */}
                    <Navbar expand="lg" className={styles.navbar}>
                        {/* <Navbar.Brand href="#home">Admin Panel</Navbar.Brand> */}
                        <Nav className="d-flex align-items-center gap-2">
                            <FontAwesomeIcon icon={faUser} className={styles.icon} />
                            <Nav.Link href="#pricing">Logout</Nav.Link>
                        </Nav>
                        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" >
                            <Nav className="ml-auto">
                                <Nav.Link href="#">Profile</Nav.Link>
                                <Nav.Link href="#">Logout</Nav.Link>
                            </Nav>
                        </Navbar.Collapse> */}
                    </Navbar>

                    {/* <Container fluid>
                        <h2 className={styles.heading}>Welcome to the Admin Panel!</h2>
                    </Container>  */}
                </Col>
            </Row>
        </Container>
    );
};

export default CustomSidebar;
