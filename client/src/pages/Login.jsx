import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import axiosInstance from "../utils/Axios";
import SummaryApi from "../common/summaryApi";
import AxiosToastError from "../utils/AxiosToastError"
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target

        setData((prev) => {
            return {
                ...prev,
                [name] : value
            }
        })
    }

    const valideValue = Object.values(data).every(el => el)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const rep = await axiosInstance({
                ...SummaryApi.login,
                data: data
            })

            if(rep.data.error) {
                toast.error(rep.data.message)
            }

            if(rep.data.success) {
                toast.success(rep.data.message)
                localStorage.setItem('accessToken', rep.data.data.accessToken)
                localStorage.setItem('refreshToken', rep.data.data.refreshToken)
                
                setData({
                    email: "",
                    password: ""
                })
                navigate("/")
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    return (
        <div className="h-screen w-screen bg-blue-50 flex items-center justify-center">
            <div className="bg-white px-10 rounded pt-9 pb-5">
                <p className="text-center font-semibold">Ravi de vous revoir</p>

                <form className="pt-10" onSubmit={handleSubmit}>
                    <div className="mt-5">
                        <div>
                            <label>Email <span className="text-red-500">*</span></label>
                        </div>
                        <div className="">
                            <input 
                             autoFocus
                             type="email"
                             className="
                              bg-blue-50
                              w-full
                              h-9
                              p-2
                              border
                              rounded
                              outline-none
                              focus:border-primary-200
                             "
                             name="email"
                             value={data.email}
                             onChange={handleChange}
                             placeholder="Entrez votre mail"
                            />
                        </div>
                    </div>
                    <div className="mt-5">
                        <div>
                            <label>Mot de passe <span className="text-red-500">*</span></label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input 
                             type={showPassword? "text" : "password"}
                             className="
                              bg-blue-50
                              w-full
                              h-9
                              p-2
                              border
                              rounded
                              outline-none
                              focus:border-primary-200
                             "
                             name="password"
                             value={data.password}
                             onChange={handleChange}
                             placeholder="Entrez votre mot de passe"
                            />
                            <div 
                             className="cursor-pointer"
                             onClick={() => setShowPassword(prev => !prev)}
                            >
                                {showPassword ? (
                                    <FaRegEye/>
                                ) : (
                                    <FaRegEyeSlash/>
                                )}
                            </div>
                        </div>
                        <Link to="/forgot-password" className="block mt-2 text-right text-sm text-purple-700 hover:text-purple-500">Mot de passe oublié ?</Link>
                    </div>

                    <div className="my-6 flex justify-center">
                        <button
                         disabled={!valideValue}
                         className={`
                          ${valideValue ? "bg-green-800" : "bg-gray-300"}
                          btn
                          w-full 
                          rounded py-1
                          ${valideValue && "hover:bg-green-700"} 
                          text-white 
                          font-semibold
                        `}>
                            Se connecter
                        </button>
                    </div>
                </form>

                <p>
                    Vous n&apos;avez pas de compte ? <Link to="/register" className="text-blue-500 underline">S&apos;inscrire</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
