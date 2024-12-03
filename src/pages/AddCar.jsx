import { useState } from "react";
import { useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const AddCar = () => {
  const { id: userId } = useParams();
  const [formData, setFormData] = useState({
    registration: "",
    model: "",
    color: "",
    category: "",
    year: "",
    height: "",
    width: "",
    depth: "",
    capacity: "",
  });
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setMessage("Invalid user ID.");
      return;
    }

    const formDataObj = new FormData();
    for (const key in formData) {
      formDataObj.append(key, formData[key]);
    }

    Array.from(images).forEach((image) => {
      formDataObj.append("images", image);
    });

    try {
      const response = await fetch(`${API_URL}/user/${userId}/car`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formDataObj,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Car registered successfully!");
        setFormData({
          registration: "",
          model: "",
          color: "",
          category: "",
          year: "",
          height: "",
          width: "",
          depth: "",
          capacity: "",
        });
        setImages([]);
      } else {
        setMessage(data.message || "Failed to register car.");
      }
    } catch (error) {
      console.error("Error registering car:", error);
      setMessage("Error registering car.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Adicionar Carro</h2>
      {message && <p className="mb-4 text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label htmlFor="registration" className="font-medium mb-1">
            Matrícula
          </label>
          <input
            type="text"
            id="registration"
            name="registration"
            value={formData.registration}
            onChange={handleInputChange}
            required
            className="border px-4 py-2 rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="model" className="font-medium mb-1">
            Modelo
          </label>
          <input
            type="text"
            id="model"
            name="model"
            value={formData.model}
            onChange={handleInputChange}
            required
            className="border px-4 py-2 rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="color" className="font-medium mb-1">
            Cor
          </label>
          <input
            type="text"
            id="color"
            name="color"
            value={formData.color}
            onChange={handleInputChange}
            required
            className="border px-4 py-2 rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="category" className="font-medium mb-1">
            Categoria
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            className="border px-4 py-2 rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="year" className="font-medium mb-1">
            Ano
          </label>
          <input
            type="number"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            required
            className="border px-4 py-2 rounded-md"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label htmlFor="height" className="font-medium mb-1">
              Altura (cm)
            </label>
            <input
              type="number"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              required
              step="0.01"
              className="border px-4 py-2 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="width" className="font-medium mb-1">
              Largura (cm)
            </label>
            <input
              type="number"
              id="width"
              name="width"
              value={formData.width}
              onChange={handleInputChange}
              required
              step="0.01"
              className="border px-4 py-2 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="depth" className="font-medium mb-1">
              Profundidade (cm)
            </label>
            <input
              type="number"
              id="depth"
              name="depth"
              value={formData.depth}
              onChange={handleInputChange}
              required
              step="0.01"
              className="border px-4 py-2 rounded-md"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="capacity" className="font-medium mb-1">
            Capacidade (litros)
          </label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={formData.capacity}
            onChange={handleInputChange}
            required
            step="1"
            className="border px-4 py-2 rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="images" className="font-medium mb-1">
            Imagens (máximo 5)
          </label>
          <input
            type="file"
            id="images"
            name="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="border px-4 py-2 rounded-md"
          />
        </div>
        <div className="text-center">
            <button
            type="submit"
            className="bg-blue-950 text-white font-medium text-lg rounded-full transition duration-300 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 px-6 py-2 self-start mt-4"
            >
            Adicionar Carro
            </button>
        </div>
      </form>
    </div>
  );
};

export default AddCar;
