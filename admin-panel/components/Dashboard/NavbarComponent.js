"use client";

// import { Button, Container, Nav, Navbar, NavDropdown, Offcanvas } from "react-bootstrap";
// import Image from "next/image";
// import styles from './Navbar.module.css';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faUser, faStar, faReceipt } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import styles from './sidebar.module.css';

export function NavbarComponent() {
    const menuItems = [
        {
            title: 'Pages',
            list: [
                {
                    title: "Dashboard",
                    path: '/dashboard',
                    icon: <FontAwesomeIcon icon={faSquare} />
                },
                {
                    title: "Users",
                    path: '/dashboard/user',
                    icon: <FontAwesomeIcon icon={faUser} />
                },
                {
                    title: "Products",
                    path: '/dashboard/products',
                    icon: <FontAwesomeIcon icon={faStar} />
                },
                {
                    title: "Trancsactions",
                    path: '/dashboard/transactions',
                    icon: <FontAwesomeIcon icon={faReceipt} />
                }
            ]
        },
        {
            title: 'Analytics',
            list: [
                {
                    title: "Revenue",
                    path: '/dashboard/revenue',
                    icon: <FontAwesomeIcon icon={faSquare} />
                },
                {
                    title: "Reports",
                    path: '/dashboard/reports',
                    icon: <FontAwesomeIcon icon={faUser} />
                },
                {
                    title: "Teams",
                    path: '/dashboard/teams',
                    icon: <FontAwesomeIcon icon={faStar} />
                },

            ]
        },

        {
            title: 'User',
            list: [
                {
                    title: "Settings",
                    path: '/dashboard/settings',
                    icon: <FontAwesomeIcon icon={faSquare} />
                },
                {
                    title: "Help",
                    path: '/dashboard/help',
                    icon: <FontAwesomeIcon icon={faUser} />
                }
            ]
        }
    ]


    return (
        // <>
        //     {[false].map((expand) => (
        //         <Navbar key={expand} expand={expand} className={styles.Navbar}>
        //             <div className=" px-1 width-100vw d-flex align-items-center justify-content-center" >
        //                 <div className=" width-100% d-flex align-items-center justify-content-between ">
        //                     <div className="d-flex align-items-center justify-content-center gap-3">
        //                         <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        //                         <Navbar.Brand href="/dashboard">Waste Management</Navbar.Brand>
        //                     </div>
        //                     <div className="ms-auto">
        //                         <Image src="/vercel.svg" alt="waste" width={50} height={50} />
        //                     </div>
        //                 </div>
        //                 <Navbar.Offcanvas
        //                     id={`offcanvasNavbar-expand-${expand}`}
        //                     aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
        //                     placement="start"
        //                 >
        //                     <Offcanvas.Header closeButton>
        //                         <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
        //                             Waste Management Dashboard
        //                         </Offcanvas.Title>
        //                     </Offcanvas.Header>
        //                     <Offcanvas.Body>
        //                         <Nav className="justify-content-end flex-grow-1 pe-3">
        //                             <Nav.Link href="#action1">Add Users</Nav.Link>
        //                             <Nav.Link href="#action2"></Nav.Link>
        //                             <NavDropdown
        //                                 title="Pages"
        //                                 id={`offcanvasNavbarDropdown-expand-${expand}`}
        //                             >
        //                                 <NavDropdown.Item href="/dashboard/user">Users</NavDropdown.Item>

        //                             </NavDropdown>
        //                         </Nav>
        //                     </Offcanvas.Body>
        //                 </Navbar.Offcanvas>
        //             </div>
        //         </Navbar>
        //     ))}
        // </>

        <>

            <div className={styles.container}>
                <div className={styles.profileContainer}>
                    <div className={styles.profilePic}>
                        <Image src="/Profile.png" alt="Profile picture" width={45} height={45} />
                    </div>
                    <div className={styles.userdetails}>
                        <span className={styles.username}>John Doe</span>
                        <span className={styles.role}>Administrator</span>
                    </div>
                </div>
                <ul>
                    {
                        menuItems.map((item, index) => {
                            return (
                                <div key={index} className={styles.menuLink}>
                                    <li className={styles.menuLinkTitle}>{item.title}</li>
                                    <div className={styles.menu}>
                                        {item.list.map((listItem, index) => {
                                            return (
                                                <li key={index}>
                                                    <a href={listItem.path}>
                                                        <span className={styles.icon}>{listItem.icon}</span>
                                                        <span className={styles.menuItemsTitle}>{listItem.title}</span>
                                                    </a>
                                                </li>
                                            )
                                        })}
                                    </div>

                                </div>
                            )
                        })
                    }
                </ul>


            </div>
        </>


    )
}

