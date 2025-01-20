import { Link, useLocation, useNavigate } from "react-router-dom";
import Search from "./Search";
import { FaRegCircleUser } from "react-icons/fa6"
import useMobile from "../hooks/useMobile";
import { TiShoppingCart } from "react-icons/ti"

const Header = () => {
    const [ isMobile ] = useMobile()
    const location = useLocation()
    const navigate = useNavigate()

    const isSearchPage = location.pathname === "/recherche"

    const redirectToLoginPage = () => {
        navigate("/login")
    }


    return (
        <header className="h-24 lg:h-20 lg:shadow-md shadow-sm sticky top-0 flex flex-col justify-center gap-3">
            {
                !(isSearchPage && isMobile) && (
                    <div className="container mx-auto flex items-center px-5 justify-between">

                        <div className="h-full">
                            <Link to="/" className="h-full flex justify-center items-center">
                                <h1 className="font-bold text-2xl hidden lg:block">E.COMM-<span>APP</span></h1>
                                <h1 className="font-bold text-xl lg:hidden">E.COMM-<span>APP</span></h1>
                            </Link>
                        </div>


                        <div className="hidden lg:block">
                            <Search/>
                        </div>

                        <div className="">
                            {/* icone utilisateur pour la version mobile */}
                            <div className="text-neutral-600 lg:hidden">
                                <FaRegCircleUser size={26}/>
                            </div>

                            {/* version desktop */}
                            <div className="hidden lg:flex items-center gap-10">
                                <button onClick={redirectToLoginPage} className="text-lg px-2">Se Connecter</button>
                                <button className="flex items-center gap-2 bg-green-800 hover:bg-green-700 px-2 py-2 rounded text-white">
                                    <div className="animate-bounce">
                                        <TiShoppingCart size={30}/>
                                    </div>
                                    <div className="font-semibold">
                                        <p>Mon panier</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
            <div className="container mx-auto px-5 lg:hidden">
                <Search/>
            </div>

        </header>
    );
}

export default Header;
