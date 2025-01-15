import { Link } from "react-router-dom";
import Search from "./Search";
import { FaRegCircleUser } from "react-icons/fa6"

const Header = () => {
    return (
        <header className="h-24 lg:h-20 lg:shadow-md shadow-sm sticky top-0 flex flex-col justify-center gap-3">

            <div className="container mx-auto flex items-center px-2 justify-between">

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
                    <div className="text-neutral-600 lg:hidden">
                        <FaRegCircleUser size={26}/>
                    </div>
                    <div className="hidden lg:block">
                        Login
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-2 lg:hidden">
                <Search/>
            </div>

        </header>
    );
}

export default Header;
