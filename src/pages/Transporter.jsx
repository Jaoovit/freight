import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const Transporter = () => {
    const { id } = useParams();
    const [transporter, setTransporter] = useState(null);
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const getTransporter = async () => {
            const transporterUrl = `${API_URL}/user/${id}`;
            try {
                const res = await fetch(transporterUrl);
                const data = await res.json();

                setTransporter(data.user);
                setCars(data.user.car);
            } catch (error) {
                console.error(`Error fetching transporter ${id}:`, error);
            }
        };
        getTransporter();
    }, [id]);

    if (!transporter) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col gap-8 sm:gap-16 px-8 sm:px-32 pt-8 sm:pt-24">
            <div className="mt-8">
                <Link
                to={`/transporter/${id}/add-car`}
                className="bg-blue-950 text-white font-medium text-lg rounded-full transition duration-300 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 px-6 py-2 self-start mt-4"
                >
                Adicionar Carro
                </Link>
            </div>
            {/* Transporter Information */}
            <div className="flex flex-col items-center">
                <div className="sm:w-1/2 w-1/2 max-w-lg flex justify-center">
                    <div className="w-32 h-32 sm:w-48 sm:h-48 lg:w-[30rem] lg:h-[30rem] rounded-full overflow-hidden shadow-lg">
                        <img 
                            src={transporter.profileImage} 
                            alt={transporter.username} 
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
                <div className="flex flex-col items-left text-xl gap-8 px-8 sm:px-32 pt-8 sm:pt-24" key={transporter.id}>
                    <p><strong>Name: </strong>{transporter.firstName} {transporter.lastName}</p>
                    <p><strong>Email: </strong>{transporter.email}</p>
                    <p><strong>Telefone: </strong>{transporter.phone}</p>
                    <p><strong>Distrito: </strong>{transporter.state}</p>
                    <p><strong>Conselho: </strong>{transporter.city}</p>
                    <p><strong>Freguesia: </strong>{transporter.neighborhood}</p>
                    <p><strong>Código postal: </strong>{transporter.postalCode}</p>
                    <p><strong>NIF: </strong>{transporter.taxDocument}</p>
                    <p><strong>IBAN: </strong>{transporter.iban}</p>
                </div>
            </div>


            {/* Cars Information */}
            <h2 className="text-2xl font-bold mb-4">Carros</h2>
            {cars.length > 0 ? (
               <div className="flex flex-wrap justify-center items-center gap-6">
               {cars.map((car) => (
                   <div 
                       className="flex flex-col justify-between max-w-xs w-80 h-[400px] p-4 bg-slate-100 text-slate-800 border-2 border-slate-200 gap-4 rounded-md shadow-md"
                       key={car.id}
                   >
                       <div className="flex-grow flex flex-col gap-2 text-lg overflow-hidden">
                           <p className="truncate"><strong>Modelo: </strong>{car.model}</p>
                           <p className="truncate"><strong>Ano: </strong>{car.year}</p>
                           <p className="truncate"><strong>Matrícula: </strong>{car.registration}</p>
                           <p className="truncate"><strong>Categoria: </strong>{car.category}</p>
                           <p className="truncate"><strong>Cor: </strong>{car.color}</p>
                           <br />
                           <ul className="text-sm">
                               <strong>Dimensão da mala:</strong>
                               <li className="truncate"><strong>Altura: </strong>{car.height}m</li>
                               <li className="truncate"><strong>Largura: </strong>{car.width}m</li>
                               <li className="truncate"><strong>Profundidade: </strong>{car.depth}m</li>
                               <li className="truncate"><strong>Capacidade: </strong>{car.capacity} L</li>
                           </ul>
                       </div>
                       <div className="flex justify-center mt-auto">
                        <Link 
                            to={`/car/${car.id}`} 
                            className="bg-blue-950 text-white rounded-full transition text-center duration-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 py-2 px-4"
                            aria-label={`Ver detalhes do carro ${car.model}`}
                        >
                            Detalhes
                        </Link>
                       </div>
                   </div>
               ))}
           </div>
           
            ) : (
                <div className="mt-8">Esse transportador não tem nenhum carro disponível.</div>
            )}
        </div>
    );
};

export default Transporter;

