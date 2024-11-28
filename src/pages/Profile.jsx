import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Profile = () => {
    const { user, isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 px-8 sm:px-32 py-8">
            {/* Image Section */}
            <div className="sm:w-1/2 w-2/3 max-w-lg flex justify-center">
                <div className="w-40 h-40 sm:w-48 sm:h-48 lg:w-[30rem] lg:h-[30rem] rounded-full overflow-hidden shadow-lg">
                    <img 
                        src="/Coronavirus Delivery-Preventions-rafiki.png" 
                        alt="Frete" 
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Text Section */}
            <div className="flex flex-col items-center justify-center gap-6 text-center sm:text-center sm:w-1/2">
                <p className="text-lg sm:text-xl text-center sm:text-center text-gray-500">
                    Parece que ainda não iniciou sessão. Faça o login para ver o seu perfil.
                </p>
                <Link 
                    to='/login' 
                    className="px-8 py-3 bg-blue-950 text-white rounded-full font-semibold text-lg transition duration-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer"
                >
                    Iniciar sessão
                </Link>
            </div>
        </div>
        );
    }

    if (!user) {
        return <p>Loading your profile...</p>;
    }

    console.log(user)

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 px-8 sm:px-32 pt-8 sm:pt-24">
            <div className="sm:w-1/2 w-1/2 max-w-lg flex justify-center">
                <div className="w-32 h-32 sm:w-48 sm:h-48 lg:w-[30rem] lg:h-[30rem] rounded-full overflow-hidden shadow-lg">
                    <img 
                        src={user.profileImage} 
                        alt="Frete" 
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
            <div className="flex flex-col items-left text-xl gap-8 px-8 sm:px-32 pt-8 sm:pt-24">
                <p><strong>Nome:</strong> {user.firstName} {user.lastName}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Telefone:</strong> {user.phone}</p>
                <p><strong>Distrito:</strong> {user.state}</p>
                <p><strong>Conselho:</strong> {user.city}</p>
                <p><strong>Freguesia:</strong> {user.neighborhood}</p>    
            </div>
        </div>
    );
};

export default Profile;



