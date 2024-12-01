import { Link } from "react-router-dom";
import { TbTruckDelivery } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
    const { isLoggedIn, user, logout } = useAuth();
    const navigate = useNavigate();

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
                <div className="flex gap-9">
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
                                <>
                                    <Link
                                        className="transition hover:text-orange-600 duration-500"
                                        to="/payments"
                                    >
                                        Pagamentos
                                    </Link>
                                </>
                            )}
                            {user.role === "manager" && (
                                <>
                                    <Link
                                        className="transition hover:text-orange-600 duration-500"
                                        to="/deliveryToConfirm"
                                    >
                                        Entregas
                                    </Link>
                                </>
                            )}
                            {user.role === "manager" && (
                                <>
                                    <Link
                                        className="transition hover:text-orange-600 duration-500"
                                        to="/transporters"
                                    >
                                        Transportadores
                                    </Link>
                                </>
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


