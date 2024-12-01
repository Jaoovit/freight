import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

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
                setCars(data.user.car); // Assuming 'car' is an array of cars
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
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 px-8 sm:px-32 pt-8 sm:pt-24">
            {/* Transporter Information */}
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

            {/* Cars Information */}
            {cars.length > 0 ? (
                <div className="w-full mt-8">
                    <h2 className="text-2xl font-bold mb-4">Carros</h2>
                    {cars.map((car) => (
                        <div className="flex flex-col sm:flex-row gap-4 mb-6 border-b pb-4" key={car.id}>
                            <div className="flex flex-col sm:w-2/3 w-full text-lg">
                                <p><strong>Modelo: </strong>{car.model}</p>
                                <p><strong>Ano: </strong>{car.year}</p>
                                <p><strong>Matrícula: </strong>{car.registration}</p>
                                <p><strong>Categoria: </strong>{car.category}</p>
                                <p><strong>Cor: </strong>{car.color}</p><br />
                                <ul><strong>Dimenção da mala: </strong>
                                    <li><strong>Altura: </strong>{car.height}m </li>
                                    <li><strong>Largura: </strong>{car.width}m</li>
                                    <li><strong>Profundidade: </strong>{car.depth}m</li>
                                    <li><strong>Capacidade: </strong>{car.capacity} L</li>
                                </ul>
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

