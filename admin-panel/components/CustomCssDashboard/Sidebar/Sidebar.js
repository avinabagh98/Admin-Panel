"use client";
// Import necessary libraries
import React from 'react';
import { Nav } from 'react-bootstrap';
import styles from './sidebar.module.css';

// Main component for Admin Panel
const Sidebar = () => {
    return (
        <>
            <div className={styles.sidebar}>
                <Nav defaultActiveKey="/customcssdashboard" className="flex-column">
                    <Nav.Link href="/customcssdashboard">Dashboard</Nav.Link>
                    <Nav.Link href="/customcssdashboard/user">Users</Nav.Link>
                    <Nav.Link href="/settings">Settings</Nav.Link>
                </Nav>
            </div>
        </>
    );
};

export default Sidebar;


