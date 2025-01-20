import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const Register = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className="h-screen w-screen bg-blue-50 flex items-center justify-center">
            <div className="bg-white px-10 rounded pt-9">
                <p className="text-center font-semibold">Bienvenue sur E.COMM-APP</p>

                <form className="pt-10" onSubmit={handleSubmit}>
                    <div className="lg:flex gap-3">
                        <div>
                            <div>
                                <label>Nom complet <span className="text-red-500">*</span></label>
                            </div>
                            <div>
                                <input 
                                 type="text"
                                 autoFocus
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
                                 name="name"
                                 value={data.name}
                                 onChange={handleChange}
                                 placeholder="Entrez votre nom complet"
                                />
                            </div>
                        </div>
                        <div className="mt-5 lg:mt-0">
                            <div>
                                <label>Email <span className="text-red-500">*</span></label>
                            </div>
                            <div>
                                <input 
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
                    </div>
                    <div className="mt-5">
                        <div>
                            <label>Confirmez mot de passe <span className="text-red-500">*</span></label>
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
                            {"S'inscrire"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
