import { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import SummaryApi from "../common/summaryApi";
import axiosInstance from "../utils/Axios";

const ResetPassword = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: "",
        newPassword: "",
        confirmPassword: ""
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const valideValue = Object.values(data).every(el => el)


    useEffect(()=>{
        if(!(location?.state?.data?.success)){
            navigate("/")
        }

        if(location?.state?.email){
            setData(prev => {
                return {
                    ...prev,
                    email: location?.state?.email
                }
            })
        }
    },[])

    const handleChange = (e) => {
        const { name, value } = e.target

        setData((prev) => {
            return {
                ...prev,
                [name] : value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(data.newPassword !== data.confirmPassword) {
            toast.error("Les deux mot de passe sont differents.")
            return
        }

        try {
            const rep = await axiosInstance({
                ...SummaryApi.resertPassword,
                data: data
            })

            if(rep.data.error) {
                toast.error(rep.data.message)
            }

            if(rep.data.success) {
                toast.success(rep.data.message)
                setData({
                    email: "",
                    newPassword: "",
                    confirmPassword: ""
                })
                navigate("/login")
            }
    
        } catch (error) {
            AxiosToastError(error)
        }
    }

    return (
        <div className="h-screen w-screen bg-blue-50 flex items-center justify-center">
            <div className="bg-white px-10 rounded pt-9 pb-5">
                <p className="text-center font-semibold">Réinitialisation du mot de passe</p>

                <form className="pt-10" onSubmit={handleSubmit}>
                    <div className="mt-5">
                        <div>
                            <label>Nouveau mot de passe <span className="text-red-500">*</span></label>
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
                             name="newPassword"
                             value={data.newPassword}
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
                    </div>
                    <div className="mt-5">
                        <div>
                            <label>Confirmez le mot de passe <span className="text-red-500">*</span></label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input 
                             type={showConfirmPassword? "text" : "password"}
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
                             name="confirmPassword"
                             value={data.confirmPassword}
                             onChange={handleChange}
                             placeholder="Confirmez le mot de passe"
                            />
                            <div 
                             className="cursor-pointer"
                             onClick={() => setShowConfirmPassword(prev => !prev)}
                            >
                                {showConfirmPassword ? (
                                    <FaRegEye/>
                                ) : (
                                    <FaRegEyeSlash/>
                                )}
                            </div>
                        </div>
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
                            Confirmer
                        </button>
                    </div>
                </form>

                <p>
                    Vous avez déjà un compte ? <Link to="/login" className="text-blue-500 underline">Se connecter</Link>
                </p>
            </div>
        </div>
    );
}

export default ResetPassword;
