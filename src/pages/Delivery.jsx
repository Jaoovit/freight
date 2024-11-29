import { useState, useEffect } from "react";
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL;

const Delivery = () => {

    const [undeliveredDeliveries, setUndeliveredDeliveries] = useState([]);
    const { user } = useAuth();

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
                    console.log(data.cars);
                    setUndeliveredDeliveries(undelivered);
                } catch (error) {
                    console.error("Error fetching deliveries:", error);
                }
            };
            getCars();
        }
    }, [user]);

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
            </div>
        </div>
    );
}

export default Delivery;