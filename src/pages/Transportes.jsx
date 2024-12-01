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

    const [transportes, setTransportes] = useState([])

    useEffect(() => {
        const transportesUrl = `${API_URL}/user/transporter`
        const getTransporters = async () => {
            try {
                const res = await fetch(transportesUrl);
                const data = await res.json();
                setTransportes(data.transporters)

            } catch(error) {
                console.error("Error fetching deliveries:", error);
            };
        }
        getTransporters();
    },[])

    return (
        <div className="flex flex-col items-center pt-24">
            {transportes.length > 0 ? (
                <div>
                    {transportes.map((transporter) => {
                        return (
                            <div className="grid justify-items-stretch flex flex-col max-w-96 rounded-md p-8 bg-slate-100 text-slate-800 border-2 border-slate-200 gap-3 shadow-md" key={transporter.id}>
                                <img className="w-8 h-8 sm:w-48 sm:h-8 lg:w-[10rem] lg:h-[10rem] rounded-full overflow-hidden shadow-lg mx-auto" src={transporter.profileImage} alt={transporter.username} />
                                
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
                                <Link to={`/transporter/${transporter.id}`} className="bg-blue-950 text-white rounded-full transition duration-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Detalhes</Link>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div>Não há transportadores disponíveis</div>
            )}
        </div>
    )
}

export default Transportes;