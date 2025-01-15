import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { IoIosArrowBack } from "react-icons/io";
import useMobile from "../hooks/useMobile";

const Search = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const [isSearchPage, setIsSearchPage] = useState(false)
    const [ isMobile ] = useMobile()

    useEffect(() => {
        const isSearch = location.pathname === "/recherche"
        setIsSearchPage(isSearch)
    },[location])


    const redirectToSearchPage = () => {
        navigate("/recherche")
    }

    return (
        <div className="w-full min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-primary-200">
            <div>
                {
                    (isMobile && isSearchPage) ? (
                        <Link to="/" className="flex justify-center items-center h-full p-2 m-1 group-focus-within:text-primary-200 bg-white rounded-full shadow-md">
                            <IoIosArrowBack size={20}/>
                        </Link>
                    ) : (
                        <button className="flex justify-center items-center h-full p-3 group-focus-within:text-primary-200">
                            <IoSearch size={22}/>
                        </button>
                    )
                }
            </div>
            <div className="w-full h-full">
                {
                    !isSearchPage ? (
                        <div className="w-full h-full flex items-center" onClick={redirectToSearchPage}>
                            <TypeAnimation
                                sequence={[
                                    'Recherchez "lait"',
                                    1000,
                                    'Recherchez "pain"',
                                    1000,
                                    'Recherchez "sucre"',
                                    1000,
                                    'Recherchez "fromage"',
                                    1000,
                                    'Recherchez "chocolat"',
                                    1000,
                                    'Recherchez "riz"',
                                    1000,
                                    'Recherchez "oeufs"',
                                    1000,
                                ]}
                                wrapper="span"
                                speed={50}
                                repeat={Infinity}
                            />
                        </div>
                    ) : (
                        <div className="w-full h-full">
                            <input
                             type="text"
                             autoFocus
                             placeholder="Recherchez un produit, une marque, une catégorie,..."
                             className="bg-transparent w-full h-full outline-none"
                            />
                        </div>
                    )
                }
            </div>            
        </div>
    );
}

export default Search;
