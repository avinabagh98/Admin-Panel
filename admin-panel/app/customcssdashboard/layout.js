import CustomSidebar from '../../components/CustomCssDash/CustomSidebar'

export default function CustomCssDashboardLayout({ children }) {
    return (
        <>
            {/* <div><Sidebar /></div> */}

            <div>
                <CustomSidebar />
                {children}
            </div>
        </>
    )
}