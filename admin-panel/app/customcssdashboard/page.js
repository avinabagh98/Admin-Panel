"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';


export default function CustomCssDashboardPage() {

    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
        } else {
            try {
                async function fetchData() {
                    const userDetails = await axios.get(
                        "http://localhost:8080/getalluserwithrole",
                        {
                            headers: {
                                "auth-token": token,
                            },
                        }
                    );
                }

                fetchData();
            } catch (error) {
                console.log(error);
            }
        }
    }, []);
    return (
        <>

        </>
    )
}