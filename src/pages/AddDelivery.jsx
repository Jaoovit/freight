import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const AddDelivery = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        protocol: "",
        price: "",
        origin: "",
        destination: "",
        scheduledAt: "",
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const response = await fetch(`${API_URL}/car/${id}/delivery`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage("Delivery created successfully!");
                setFormData({
                    protocol: "",
                    price: "",
                    origin: "",
                    destination: "",
                    scheduledAt: "",
                });
                setTimeout(() => navigate(`/car/${id}`), 2000);
            } else {
                setErrorMessage(data.message || "Error creating delivery.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setErrorMessage("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white">
            <h1 className="text-2xl font-bold mb-6">Adicionar entrega</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block font-medium mb-2" htmlFor="protocol">
                        Protocolo
                    </label>
                    <input
                        type="text"
                        id="protocol"
                        name="protocol"
                        value={formData.protocol}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-medium mb-2" htmlFor="price">
                        Preço
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                        min="0"
                        step="0.01"
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-medium mb-2" htmlFor="origin">
                        Origem
                    </label>
                    <input
                        type="text"
                        id="origin"
                        name="origin"
                        value={formData.origin}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-medium mb-2" htmlFor="destination">
                        Destino
                    </label>
                    <input
                        type="text"
                        id="destination"
                        name="destination"
                        value={formData.destination}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-medium mb-2" htmlFor="scheduledAt">
                        Data e horário
                    </label>
                    <input
                        type="datetime-local"
                        id="scheduledAt"
                        name="scheduledAt"
                        value={formData.scheduledAt}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                    />
                </div>
                {errorMessage && (
                    <div className="mb-4 text-red-600">{errorMessage}</div>
                )}
                {successMessage && (
                    <div className="mb-4 text-green-600">{successMessage}</div>
                )}
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-blue-950 text-white font-medium text-lg rounded-full transition duration-300 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 px-6 py-2 self-start mt-4"
                    >
                        Adicionar entrega
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddDelivery;
