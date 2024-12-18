import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const weekdayMap = {
    Monday: "Segunda",
    Tuesday: "Terça",
    Wednesday: "Quarta",
    Thursday: "Quinta",
    Friday: "Sexta",
    Saturday: "Sábado",
    Sunday: "Domingo"
};

const Transportes = () => {     
    const [transportes, setTransportes] = useState([]);

    useEffect(() => {
        const transportesUrl = `${API_URL}/user/transporter`;
        const getTransporters = async () => {
            try {
                const res = await fetch(transportesUrl, {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await res.json();
                setTransportes(data.transporters);
            } catch (error) {
                console.error("Error fetching transporters:", error);
            }
        };
        getTransporters();
    }, []);

    return (
        <div className="flex flex-col items-center pt-24">
            <div className="w-full flex justify-start px-24 pb-6 mb-4">
                <Link 
                    to="/add-transporter"
                    className="bg-blue-950 text-white rounded-full transition duration-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 px-4 py-2"
                >
                    Add transportador
                </Link>
            </div>
            {transportes.length > 0 ? (
                <div className="flex flex-wrap justify-center items-center gap-6">
                    {transportes.map((transporter) => {
                        return (
                            <div className="flex flex-col max-w-xs w-80 h-[400px] p-4 bg-slate-100 text-slate-800 border-2 border-slate-200 gap-4 rounded-md shadow-md" key={transporter.id}>
                                <img 
                                    className="w-32 h-32 rounded-full object-cover shadow-lg mx-auto" 
                                    src={transporter.profileImage} 
                                    alt={transporter.username} 
                                />
                                <p><strong>Nome: </strong>{transporter.firstName} {transporter.lastName}</p>
                                <p><strong>Dias de Trabalho: </strong>
                                    {transporter.workdays && transporter.workdays.length > 0 ? (
                                        transporter.workdays
                                            .map(day => weekdayMap[day] || day)
                                            .join(', ')
                                    ) : (
                                        <span>Não especificado</span>
                                    )}
                                </p>
                                <p><strong>Distrito: </strong>{transporter.state}</p>
                                <p><strong>Conselho: </strong>{transporter.city}</p>
                                <div className="flex justify-center mt-auto">
                                    <Link to={`/transporter/${transporter.id}`} className="bg-blue-950 text-center text-white rounded-full transition duration-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 px-4 py-2">
                                        Detalhes
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div>Não há transportadores disponíveis</div>
            )}
        </div>
    );
}

export default Transportes;
