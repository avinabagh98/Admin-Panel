import { NavbarComponent } from "../../components/Dashboard/NavbarComponent";

export default function DashboardLayout({ children }) {
    return (
        <>
            {/* <div><Sidebar /></div> */}

            <div>
                <NavbarComponent />
                {children}
            </div>
        </>
    )
}