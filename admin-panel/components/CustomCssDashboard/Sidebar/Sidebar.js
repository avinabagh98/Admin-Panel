"use client";
// Import necessary libraries

import { Nav } from "react-bootstrap";
import styles from "./sidebar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCircleChevronLeft,
  faGear,
  faSquare,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

// Main component for Admin Panel
const Sidebar = ({ toggleSidebar, isCollapsed }) => {
  
  return (
    <>
      <div className={styles.sidebar}>

        <div className={styles.sidebarHeader}>
          {isCollapsed ? <></> : <h4 className="mb-0">Admin Panel</h4>}
          <FontAwesomeIcon
            icon={isCollapsed ? faBars :  faCircleChevronLeft}
            className={styles.sidebarHeaderIcon}
            onClick={toggleSidebar}
          />
        </div>

        <div className={styles.sidebarMenu}>
          <Nav defaultActiveKey="/customcssdashboard" className={styles.sidebarMenu}>

            <div className={`${styles.sidebarMenuLink}${isCollapsed ? "collapsed" : ""}`}>
              <FontAwesomeIcon icon={faSquare} />
              {isCollapsed ? (<></>) : (<Nav.Link href="/customcssdashboard">Dashboard</Nav.Link>)}
            </div>

            <div className={`${styles.sidebarMenuLink}${isCollapsed ? "collapsed" : ""}`}>
              <FontAwesomeIcon icon={faUser} />
              {isCollapsed ? (<></>) : (<Nav.Link href="/customcssdashboard/user">Users</Nav.Link>)}
              
            </div>

            <div className={`${styles.sidebarMenuLink}${isCollapsed ? "collapsed" : ""}`}>
              <FontAwesomeIcon icon={faGear} />
              {isCollapsed ? (<></>) : (<Nav.Link href="/settings">Settings</Nav.Link>)}
            </div>
          </Nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
