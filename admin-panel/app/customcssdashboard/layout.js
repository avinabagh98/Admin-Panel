import Sidebar from '../../components/CustomCssDashboard/Sidebar/Sidebar'
import { Container, Row, Col } from 'react-bootstrap'
import Topbar from '../../components/CustomCssDashboard/Topbar/Topbar'

export default function CustomCssDashboardLayout({ children }) {
    return (
        <>
            <Container fluid>
                <Row>
                    <Col md={2} className='p-0'> <Sidebar /> </Col>
                    <Col md={10} className='pt-2'>
                        <Row><Topbar /></Row>
                        <Row>{children}</Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}


