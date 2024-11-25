import { useState } from "react";
import { Link } from "react-router-dom";
import { TbTruckDelivery } from "react-icons/tb";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

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

                {/* Hamburger Icon for Small Screens */}
                <div className="sm:hidden">
                    <button onClick={toggleMenu} aria-label="Toggle Menu">
                        {isOpen ? (
                            <HiX className="text-4xl text-blue-950" />
                        ) : (
                            <HiMenuAlt3 className="text-4xl text-blue-950" />
                        )}
                    </button>
                </div>

                {/* Desktop Menu */}
                <div className="hidden sm:flex items-center gap-8">
                    <Link
                        className="transition hover:text-orange-600 duration-500"
                        to="/contact"
                    >
                        Contacto
                    </Link>
                    <Link
                        className="transition hover:text-orange-600 duration-500"
                        to="/aboutUs"
                    >
                        Sobre nós
                    </Link>
                    <Link
                        className="transition hover:text-orange-600 duration-500"
                        to="/workWithUs"
                    >
                        Trabalhe conosco
                    </Link>
                    <Link
                        className="transition hover:text-orange-600 duration-500"
                        to="/login"
                    >
                        Login
                    </Link>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="flex flex-col mt-4 space-y-4 sm:hidden">
                    <Link
                        className="transition hover:text-orange-600 duration-500"
                        to="/contact"
                        onClick={toggleMenu}
                    >
                        Contacto
                    </Link>
                    <Link
                        className="transition hover:text-orange-600 duration-500"
                        to="/aboutUs"
                        onClick={toggleMenu}
                    >
                        Sobre nós
                    </Link>
                    <Link
                        className="transition hover:text-orange-600 duration-500"
                        to="/workWithUs"
                        onClick={toggleMenu}
                    >
                        Trabalhe conosco
                    </Link>
                    <Link
                        className="transition hover:text-orange-600 duration-500"
                        to="/login"
                        onClick={toggleMenu}
                    >
                        Login
                    </Link>
                </div>
            )}
        </div>
    );
};

export default NavBar;
