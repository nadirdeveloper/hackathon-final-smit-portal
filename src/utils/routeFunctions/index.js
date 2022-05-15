import { Navigate } from "react-router-dom"
import SideNav from "../../components/Layout/SideBar"

const isAuthRoute = ({ component: RouteComponent, redirectUrl, user, loading, }) => {
    if (loading) {
        return (
            <div></div>
        )
    }
    return !user ? <RouteComponent /> : <Navigate to={redirectUrl} />
}
const isAdminRoute = ({ component: RouteComponent, redirectUrl, user, loading, currentUserData }) => {
    if (loading) {
        return (
            <div></div>
        )
    }
    return user ? (currentUserData?.role === "admin" ? <SideNav>
    <RouteComponent />
    </SideNav> : <Navigate to={"/unauthorized"} />) : (<Navigate to={redirectUrl} />)
}

export {
    isAuthRoute,
    isAdminRoute,
}