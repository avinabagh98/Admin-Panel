"use client";
import { useEffect, useState } from "react"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Table, Button } from 'react-bootstrap'

export default function User() {
    const router = useRouter();
    const [users, setUsers] = useState([]);


    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            router.push("/login")
        }
        else {
            try {

                async function fetchData() {
                    const userDetails = await axios.get('http://localhost:8080/getuserwithrole', {
                        headers: {
                            "auth-token": token
                        }
                    })

                    setUsers(userDetails.data)
                }

                fetchData();
            } catch (error) {

            }
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };



    return (
        <>
            <div>
                <h1>Your User Dashboard</h1>
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

                                    </tr>
                                )
                            })}
                    </tbody>
                </Table>


            </div>

            <div className="m-3">

                <Button variant="danger" onClick={handleLogout} className="logout">
                    Logout
                </Button>
            </div>
        </>
    )
}
