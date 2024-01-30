"use client";
import { useEffect } from "react"
import axios from 'axios';
import Router from 'next/router'

export default function Dashboard() {

    useEffect(() => {

        const token = localStorage.getItem("token")
        if (!token) {
            alert("No token available")
        }
        else {
            async function fetchData() {
                const userDetails = await axios.get('http://localhost:8080/getuser', {
                    Headers: {
                        "auth-token": token
                    }
                })
            }

            fetchData();
        }
    }, [])


    return (
        <div>
            <h1>Your Dashboard</h1>
        </div>
    )
}