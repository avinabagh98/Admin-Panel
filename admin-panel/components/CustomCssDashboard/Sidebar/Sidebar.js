"use client";
// Import necessary libraries
import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import styles from './sidebar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackspace, faBars } from '@fortawesome/free-solid-svg-icons';

// Main component for Admin Panel
const Sidebar = () => {

    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <>

            <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`} >
                <div className={styles.sidebarHeader}>
                    <h4>Admin Panel</h4>
                    <FontAwesomeIcon icon={(isCollapsed) ? faBars : faBackspace}
                        className={styles.sidebarHeaderIcon}
                        onClick={toggleSidebar} />
                </div>
                <div className={styles.sidebarMenu}>
                    <Nav defaultActiveKey="/customcssdashboard" className="flex-column">
                        <Nav.Link href="/customcssdashboard">Dashboard</Nav.Link>
                        <Nav.Link href="/customcssdashboard/user">Users</Nav.Link>
                        <Nav.Link href="/settings">Settings</Nav.Link>
                    </Nav>
                </div>

            </div>


        </>
    );
};

export default Sidebar;


