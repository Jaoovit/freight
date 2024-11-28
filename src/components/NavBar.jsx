import { useState } from "react";
import { Link } from "react-router-dom";
import { TbTruckDelivery } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMenu, FiX } from 'react-icons/fi'; // Hamburger menu icon and close icon

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle the menu
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

                {/* Hamburger Icon (only visible on small screens) */}
                <div className="lg:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? (
                            <FiX className="text-3xl" />
                        ) : (
                            <FiMenu className="text-3xl" />
                        )}
                    </button>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex gap-9">
                    {isLoggedIn ? (
                        <>
                            <Link 
                                className="transition hover:text-orange-600 duration-500"
                                to="/profile"
                            >   
                                Perfil    
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="transition hover:text-orange-600 duration-500"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            className="transition hover:text-orange-600 duration-500"
                            to="/login"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>

            {/* Mobile Menu (visible only when isMenuOpen is true) */}
            <div className={`lg:hidden mt-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
                {isLoggedIn ? (
                    <>
                        <Link
                            className="block py-2 px-4 transition hover:bg-blue-700 hover:text-white duration-500"
                            to="/profile"
                            onClick={() => setIsMenuOpen(false)} // Close the menu when clicked
                        >
                            Perfil
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="block py-2 px-4 transition hover:bg-blue-700 hover:text-white duration-500"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <Link
                        className="block py-2 px-4 transition hover:bg-blue-700 hover:text-white duration-500"
                        to="/login"
                        onClick={() => setIsMenuOpen(false)} // Close the menu when clicked
                    >
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default NavBar;

