import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import Home from "../pages/Home"
import SearchPages from "../pages/SearchPages"
import Register from "../pages/Register"
import Login from "../pages/Login"
import ForgotPassword from "../pages/ForgotPassword"
import OtpVerification from "../pages/OtpVerification"
import ResetPassword from "../pages/ResetPassword"

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
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword/>
    },
    {
        path: "/otp-verification",
        element: <OtpVerification/>
    },
    {
        path: "/reset-password",
        element: <ResetPassword/>
    }
])

export default router