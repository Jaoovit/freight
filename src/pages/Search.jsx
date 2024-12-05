import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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

const Search = () => {

    const [searchParams] = useSearchParams()

    const [searchTransporter, setSearchTransporter] = useState([]);
    const query = searchParams.get("q");

    useEffect(() => {
        const getSearchedTransporters = async () => {
            try {
                const searchTransporterUrl = `${API_URL}/user/transporter/search?query=${query}`;

                const res = await fetch(searchTransporterUrl);
                const data = await res.json();

                setSearchTransporter(data.transporters)
            } catch(error) {
                console.error(`Error fetching transporter by ${query}:`, error);
            }
        }
        getSearchedTransporters();
    }, [query])

    return (
        <div className="flex flex-col items-center pt-24">
            <h2 className="text-4xl pb-12">Resultados para: <span className="text-orange-600">{query}</span></h2>
            {searchTransporter.length > 0 ? (
                <div className="flex flex-wrap gap-12 items-center py-24 justify-center">
                    {searchTransporter.map((transporter) => {
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
                                <p><strong>Freguesia: </strong>{transporter.neighborhood}</p>
                                <div className="flex justify-center mt-auto">
                                    <Link to={`/transporter/${transporter.id}`} className="bg-blue-950 text-center text-white rounded-full transition duration-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 px-4 py-2">Detalhes</Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div>Não há transportadores disponíveisl em {query}</div>
            )}
        </div>
    )
}

export default Search;