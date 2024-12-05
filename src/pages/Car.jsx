import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const Car = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const getCar = async () => {
            const carUrl = `${API_URL}/car/${id}, `;
            try {
                const res = await fetch(carUrl, {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await res.json();
                setCar(data.car);
            } catch (error) {
                console.error("Error fetching car data:", error);
            }
        };
        getCar();
    }, [id]);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            car?.carImage && car.carImage.length > 0
                ? prevIndex === car.carImage.length - 1
                    ? 0
                    : prevIndex + 1
                : 0
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            car?.carImage && car.carImage.length > 0
                ? prevIndex === 0
                    ? car.carImage.length - 1
                    : prevIndex - 1
                : 0
        );
    };

    if (!car) {
        return <div className="text-center py-8">Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center gap-8 px-4 sm:px-16 lg:px-32 py-8">
            {/* Car Image Carousel */}
            {car.carImage && car.carImage.length > 0 ? (
                <div className="relative w-full max-w-4xl">
                    <img
                        src={car.carImage[currentImageIndex]?.imageUrl || ""}
                        alt={`Image ${currentImageIndex + 1} for car ${car.id}`}
                        className="w-full h-80 sm:h-96 object-cover rounded-md shadow-md transition-opacity duration-500 ease-in-out"
                    />
                    <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition duration-300"
                    >
                        ◄
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition duration-300"
                    >
                        ►
                    </button>
                </div>
            ) : (
                <p>Sem imagens disponíveis</p>
            )}

            {/* Car Details */}
            <div className="w-full max-w-4xl bg-white p-6">
                <h2 className="text-2xl font-bold mb-4">Detalhes do carro</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
                    <p><strong>Modelo: </strong>{car.model}</p>
                    <p><strong>Matrícula: </strong>{car.registration}</p>
                    <p><strong>Categoria: </strong>{car.category}</p>
                    <p><strong>Cor: </strong>{car.color}</p>
                    <p><strong>Capacidade em litros: </strong>{car.capacity} L</p>
                    <p><strong>Ano: </strong>{car.year}</p>
                </div>
                <div className="mt-6">
                    <h3 className="text-xl font-bold mb-2">Dimenções</h3>
                    <ul className="list-disc pl-6 text-lg">
                        <li><strong>Altura: </strong>{car.height}m</li>
                        <li><strong>Largura: </strong>{car.width}m</li>
                        <li><strong>Profundidade: </strong>{car.depth}m</li>
                    </ul>
                </div>
                <div className="mt-8 text-center">
                <Link
                    to={`/car/${car.id}/add-delivery`}
                    className="bg-blue-950 text-white font-medium text-lg rounded-full transition duration-300 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 px-6 py-2 self-start mt-4"
                >
                    Adicionar entrega
                </Link>
            </div>
            </div>
        </div>
    );
};

export default Car;


