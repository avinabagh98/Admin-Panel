"use client";

import Sidebar from "../../components/CustomCssDashboard/Sidebar/Sidebar";
import { Container, Row, Col } from "react-bootstrap";
import Topbar from "../../components/CustomCssDashboard/Topbar/Topbar";
import React, { useState } from "react";
import styles from "./layout.module.css";

export default function CustomCssDashboardLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md={isCollapsed ? 1 : 2}>
            <Sidebar toggleSidebar={toggleSidebar} isCollapsed={isCollapsed} />
          </Col>
          <Col md={isCollapsed ? 11 : 10}>
            <Row>
              <Topbar />
            </Row>
            <Row className={styles.children}>{children}</Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
