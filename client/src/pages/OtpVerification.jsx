import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../utils/Axios";
import SummaryApi from "../common/summaryApi";
import AxiosToastError from "../utils/AxiosToastError"
import { Link, useLocation, useNavigate } from "react-router-dom";

const OtpVerification = () => {
    const [data, setData] = useState(["", "", "", "", "", ""])
    const navigate = useNavigate()
    const inputRef = useRef([])
    const location = useLocation()

    useEffect(() =>{
        if(!location?.state?.email){
            navigate("/forgot-password")
        }
    },[])

    const valideValue = data.every(el => el)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const rep = await axiosInstance({
                ...SummaryApi.otpVerification,
                data: {
                    otp: data.join(""),
                    email: location?.state?.email
                }
            })

            if(rep.data.error) {
                toast.error(rep.data.message)
            }

            if(rep.data.success) {
                toast.success(rep.data.message)
                setData(["", "", "", "", "", ""])
                navigate("/reset-password",{
                    state: {
                        data: rep.data,
                        email: location?.state?.email
                    }
                })
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    return (
        <div className="h-screen w-screen bg-blue-50 flex items-center justify-center">
            <div className="bg-white px-10 rounded pt-9 pb-5">
                <p className="text-center font-semibold">Veuillez saisir le code reçu par mail</p>

                <form className="pt-7" onSubmit={handleSubmit}>
                    <div className="mt-5">
                        <div>
                            <label htmlFor="otp">Entrez le code <span className="text-red-500">*</span></label>
                        </div>
                        <div className="flex gap-1">
                            {
                                data.map((el, i) => {
                                    return (
                                        <input
                                            key={"otp"+i}
                                            type="text"
                                            id="otp"
                                            ref={(ref) =>{
                                                inputRef.current[i] = ref
                                                return ref
                                            }}
                                            maxLength={1}
                                            onChange={(e) => {
                                                const value = e.target.value

                                                const newData = [...data]
                                                newData[i] = value
                                                setData(newData)

                                                if(value && i < 5) {
                                                    inputRef.current[i+1].focus()
                                                }
                                            }}
                                            value={data[i]}
                                            className="
                                             mt-2
                                           bg-blue-50
                                             w-14
                                             p-2
                                             border
                                             rounded
                                             outline-none
                                           focus:border-primary-200
                                             text-center
                                             font-semibold 
                                            "
                                        />
                                    )
                                })
                            }
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
                            Verifier 
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

export default OtpVerification;
