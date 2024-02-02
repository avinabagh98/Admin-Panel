"use client";

import { useEffect, useState } from "react"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Container, Table, Button, Modal } from 'react-bootstrap'
import swal from 'sweetalert';
// import { MyVerticallyCenteredModal } from '../../../components/modal'



export default function User() {

    const router = useRouter();

    const [users, setUsers] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [selectedUser, setSelectedUser] = useState();


    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            router.push("/login")
        }
        else {
            try {

                async function fetchData() {
                    const userDetails = await axios.get('http://localhost:8080/getalluserwithrole', {
                        headers: {
                            "auth-token": token
                        }
                    })
                    setUsers(userDetails.data)
                }

                fetchData();
            } catch (error) {
                console.log(error)
            }
        }
    }, [users])


    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };


    const updateHandler = (user) => {
        try {

            // setModalShow(true);
            // setSelectedUser(user);
            router.push(`/update/${user.id}`)
        } catch (error) {
            swal(error);
        }
    }


    const deleteHandler = (id) => {
        try {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this user",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then(async (willDelete) => {
                    if (willDelete) {
                        try {
                            await axios.delete(`http://localhost:8080/deleteuser/${id}`);
                        } catch (error) {
                            swal(error)
                        }
                        swal("User has been deleted!", {
                            icon: "success",
                        });
                    }
                });
        } catch (error) {
            swal(error)
        }
    }


    return (
        <> <Container>
            <div>
                <h1 className=" my-3 p-3 text-primary text-center">Your User Dashboard</h1>
            </div>

            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr key={users.id}>
                            <th>#</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>RoleId</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            users.map((user) => {

                                return (
                                    <tr key={user.id}>

                                        <td className="row-data">{user.id}</td>
                                        <td className="row-data">{user.name}</td>
                                        <td className="row-data">{user.username}</td>
                                        <td className="row-data">{user.roleId}</td>
                                        <td className="row-data">{user.role.name}</td>
                                        <td className="row-data d-flex gap-2">
                                            <div>
                                                <Button variant="warning" onClick={() => { updateHandler(user) }} className="update">
                                                    Update
                                                </Button>
                                            </div>

                                            <div>
                                                <Button variant="danger" onClick={() => { deleteHandler(user.id) }} className="delete">
                                                    Delete
                                                </Button>
                                            </div></td>

                                    </tr>


                                )
                            })}
                    </tbody>
                </Table>
            </div>

            {/* <div>
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    user={selectedUser}

                />
            </div> */}

            <div className="m-3">

                <Button variant="danger" onClick={handleLogout} className="logout">
                    Logout
                </Button>
            </div>
        </Container>
        </>
    )
}
