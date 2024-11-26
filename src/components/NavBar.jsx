import { Link } from "react-router-dom";
import { TbTruckDelivery } from "react-icons/tb";

const NavBar = () => {

    return (
        <div className="p-14 font-bold text-blue-950">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <Link
                    className="transition flex items-center text-4xl hover:text-orange-600 duration-500 gap-3"
                    to="/"
                >
                    <TbTruckDelivery className="text-5xl" /> LogX
                </Link>
                {/* Desktop Menu */}
                <div>
                    <Link
                        className="transition hover:text-orange-600 duration-500"
                        to="/login"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
