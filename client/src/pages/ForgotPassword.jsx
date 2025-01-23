import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../utils/Axios";
import SummaryApi from "../common/summaryApi";
import AxiosToastError from "../utils/AxiosToastError"
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [data, setData] = useState({
        email: ""
    })
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
                ...SummaryApi.forgotPassword,
                data: data
            })

            if(rep.data.error) {
                toast.error(rep.data.message)
            }

            if(rep.data.success) {
                toast.success(rep.data.message)
                navigate("/otp-verification",{
                    state: data
                })
                setData({
                    email: ""
                })
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    return (
        <div className="h-screen w-screen bg-blue-50 flex items-center justify-center">
            <div className="bg-white px-10 rounded pt-9 pb-5">
                <p className="text-center font-semibold">Vous allez réinitialiser votre mot de passe</p>

                <form className="pt-7" onSubmit={handleSubmit}>
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
                            Recevoir un code
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

export default ForgotPassword;
