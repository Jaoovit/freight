import { Link } from "react-router-dom";
import { TbTruckDelivery } from "react-icons/tb";

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {

    const { isLoggedIn, logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <div className="p-4 font-bold text-white bg-blue-950 px-12">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <Link
                    className="transition flex items-center text-4xl hover:text-orange-600 duration-500 gap-3"
                    to="/"
                >
                    <TbTruckDelivery className="text-5xl" /> LogX
                </Link>
                {/* Desktop Menu */}
                { isLoggedIn ? (

                <div>

                <button
                    onClick={handleLogout}
                    className="transition hover:text-orange-600 duration-500"
                >
                    Logout
                </button>
                </div>

                ) : (

                <div>
                    <Link
                        className="transition hover:text-orange-600 duration-500"
                        to="/login"
                    >
                        Login
                    </Link>
                </div>

                )}
            </div>
        </div>
    );
};

export default NavBar;
