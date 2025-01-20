import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import Home from "../pages/Home"
import SearchPages from "../pages/SearchPages"
import Register from "../pages/Register"
import Login from "../pages/Login"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "",
                element: <Home/>
            },
            {
                path: "recherche",
                element: <SearchPages/>
            }
        ]
    },
    {
        path: "/register",
        element: <Register/>
    },
    {
        path: "/login",
        element: <Login/>
    }
])

export default router