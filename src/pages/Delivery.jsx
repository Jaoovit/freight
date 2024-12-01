import { useState, useEffect } from "react";
import { useAuth } from '../context/AuthContext';
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const Delivery = () => {
    const [undeliveredDeliveries, setUndeliveredDeliveries] = useState([]);
    const [unpaydDeliveries, setUnpaydDeliveries] = useState([]);
    const { user, isLoggedIn } = useAuth();

    useEffect(() => {
        if (user?.id) {
            const carsUrl = `${API_URL}/car/user/${user.id}`;
            const getCars = async () => {
                try {
                    const res = await fetch(carsUrl);
                    const data = await res.json();
                    
                    const undelivered = data.cars.flatMap((car) =>
                        car.delivery.filter((delivery) => delivery.deliveryStatus === "undelivered")
                    );

                    setUndeliveredDeliveries(undelivered);

                    const unpaid = data.cars.flatMap((car) => 
                        car.delivery.filter((delivery) => delivery.paymentStatus === "unpaid" && delivery.deliveryStatus === "delivered")
                    );

                    setUnpaydDeliveries(unpaid);

                } catch (error) {
                    console.error("Error fetching deliveries:", error);
                }
            };
            getCars();
            
        }
    }, [user?.id]);
    console.log(undeliveredDeliveries)

    const formatScheduledDate = (scheduledAt) => {
        const scheduledDate = new Date(scheduledAt);

        const date = scheduledDate.toLocaleDateString("pt-PT", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });

        const time = scheduledDate.toLocaleTimeString("pt-PT", {
            hour: "2-digit",
            minute: "2-digit",
        });

        return { date, time };
    };

    const totalFee = unpaydDeliveries.reduce((sum, delivery) => sum + delivery.fee, 0);

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
        return (
            
            <div className="flex flex-col items-center pt-24">
                <h1 className="text-lg sm:text-2xl text-blue-950 font-bold">Entregas por fazer:</h1>
                
                <div>
                    {undeliveredDeliveries.length > 0 ? (
                        <div className="flex flex-col sm:flex-row gap-12 items-center py-24">
                            {undeliveredDeliveries.map((delivery) => {
                                const { date, time } = formatScheduledDate(delivery.scheduledAt);

                                return (
                                    <div className="grid justify-items-stretch flex flex-col max-w-96 rounded-md p-8 bg-slate-100 text-slate-800 border-2 border-slate-200 gap-3 shadow-md" key={delivery.id}>
                                        <p><strong>Protocolo:</strong> {delivery.protocol}</p>
                                        <p><strong>Origem:</strong> {delivery.origin}</p>
                                        <p><strong>Destino:</strong> {delivery.destination}</p>
                                        <p><strong>Data:</strong> {date}</p>
                                        <p><strong>Hora:</strong> {time}</p>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p>Sem entregas disponíveis.</p>
                    )}
                    {/* Total Fee Section */}
                {unpaydDeliveries && (
                    <div className="mt-8 flex justify-center items-center gap-9">
                        <h3 className="text-xl font-semibold text-slate-800">Total a Receber:</h3>
                        <p className="text-2xl text-blue-950 font-bold">{totalFee.toFixed(2)} €</p>
                    </div>
                )}
                </div>
                
            </div>
        );
}

export default Delivery;

