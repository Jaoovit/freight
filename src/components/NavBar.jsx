import { Link } from "react-router-dom";
import { TbTruckDelivery } from "react-icons/tb";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from "react";

const NavBar = () => {
    const [search, setSearch] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const { isLoggedIn, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!search) return;
        navigate(`/search?q=${search}`);
        setSearch("");
    };

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
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

                {/* Hamburger Menu Icon */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-2xl hover:text-orange-600"
                    >
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-9 items-center">
                    {isLoggedIn ? (
                        <>
                            <Link
                                className="transition hover:text-orange-600 duration-500"
                                to="/profile"
                            >
                                Perfil
                            </Link>
                            {user.role === "transporter" && (
                                <Link
                                    className="transition hover:text-orange-600 duration-500"
                                    to="/delivery"
                                >
                                    Entregas
                                </Link>
                            )}
                            {user.role === "manager" && (
                                <div className="flex items-center gap-9">
                                    <form
                                        className="flex gap-9"
                                        onSubmit={handleSubmit}
                                    >
                                        <input
                                            className="text-gray-500 rounded-md p-2 border shadow-sm border-slate-300 focus:outline-none focus:border-blue-950"
                                            type="text"
                                            placeholder="Procure um transportador"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                        />
                                        <button
                                            className="transition border-2 rounded-md p-2 hover:text-slate-100 hover:border-slate-100 hover:bg-blue-950 duration-200"
                                            type="submit"
                                        >
                                            <FaSearch />
                                        </button>
                                    </form>
                                    <Link
                                        className="transition hover:text-orange-600 duration-500"
                                        to="/payments"
                                    >
                                        Pagamentos
                                    </Link>
                                    <Link
                                        className="transition hover:text-orange-600 duration-500"
                                        to="/deliveryToConfirm"
                                    >
                                        Entregas
                                    </Link>
                                    <Link
                                        className="transition hover:text-orange-600 duration-500"
                                        to="/transporters"
                                    >
                                        Transportadores
                                    </Link>
                                </div>
                            )}
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

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden flex flex-col gap-4 mt-4">
                    {isLoggedIn ? (
                        <>
                            <Link
                                className="transition hover:text-orange-600 duration-500"
                                to="/profile"
                                onClick={toggleMenu}
                            >
                                Perfil
                            </Link>
                            {user.role === "transporter" && (
                                <Link
                                    className="transition hover:text-orange-600 duration-500"
                                    to="/delivery"
                                    onClick={toggleMenu}
                                >
                                    Entregas
                                </Link>
                            )}
                            {user.role === "manager" && (
                                <>
                                    <form
                                        className="flex gap-2"
                                        onSubmit={(e) => {
                                            handleSubmit(e);
                                            toggleMenu();
                                        }}
                                    >
                                        <input
                                            className="text-gray-500 rounded-md p-2 border shadow-sm border-slate-300 focus:outline-none focus:border-blue-950 w-full"
                                            type="text"
                                            placeholder="Procure um transportador"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                        />
                                        <button
                                            className="transition border-2 rounded-md p-2 hover:text-slate-100 hover:border-slate-100 hover:bg-blue-950 duration-200"
                                            type="submit"
                                        >
                                            <FaSearch />
                                        </button>
                                    </form>
                                    <Link
                                        className="transition hover:text-orange-600 duration-500"
                                        to="/payments"
                                        onClick={toggleMenu}
                                    >
                                        Pagamentos
                                    </Link>
                                    <Link
                                        className="transition hover:text-orange-600 duration-500"
                                        to="/deliveryToConfirm"
                                        onClick={toggleMenu}
                                    >
                                        Entregas
                                    </Link>
                                    <Link
                                        className="transition hover:text-orange-600 duration-500"
                                        to="/transporters"
                                        onClick={toggleMenu}
                                    >
                                        Transportadores
                                    </Link>
                                </>
                            )}
                            <button
                                onClick={() => {
                                    handleLogout();
                                    toggleMenu();
                                }}
                                className="transition hover:text-orange-600 duration-500"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            className="transition hover:text-orange-600 duration-500"
                            to="/login"
                            onClick={toggleMenu}
                        >
                            Login
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
};

export default NavBar;



