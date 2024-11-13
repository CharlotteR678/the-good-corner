import { Outlet } from "react-router-dom"
import Header from "../../components/header/Header"
import "../../App.css"

 const Layout = () => {
    return (
        <main className="main-content">
            <Header/>
            <Outlet />
        </main>
    )
}

export default Layout