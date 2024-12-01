import { Link } from "react-router-dom";
import { TbTruckDelivery } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

const NavBar = () => {
    const [search, setSearch] = useState("");
    const { isLoggedIn, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!search) return
        navigate(`/search?q=${search}`)
        setSearch("")
      }

    const handleLogout = async () => {
        console.log("Handle logout triggered.");
        await logout();
        console.log("Navigating to home page...");
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
                <div className="flex gap-9 items-center">
                    {isLoggedIn ? (
                        <>
                            <Link 
                                className="transition hover:text-orange-600 duration-500"
                                to="/profile"
                            >   
                                Perfil    
                            </Link>
                            {user.role === "transporter" && (
                                <>
                                    <Link
                                        className="transition hover:text-orange-600 duration-500"
                                        to="/delivery"
                                    >
                                        Entregas
                                    </Link>
                                </>
                            )}
                            {user.role === "manager" && (
                                <div className="flex items-center gap-9">
                                    <form className="flex gap-9" onSubmit={handleSubmit}>
                                        <input className="text-gray-500 rounded-md p-2 border shadow-sm border-slate-300 focus:outline-none focus:border-blue-950" type="text" placeholder="Procure um transportador" value={search} onChange={(e) => {setSearch(e.target.value)}}/>
                                        <button className="transition border-2 rounded-md p-2 hover:text-slate-100 hover:border-slate-100 hover:bg-blue-950 duration-200" type="submit"><FaSearch /></button>
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
        </div>
    );
};

export default NavBar;


