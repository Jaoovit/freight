import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const AddTransporter = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [taxDocument, setTaxDocument] = useState('');
  const [iban, setIban] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [workDays, setWorkDays] = useState([]);
  const [profileImage, setProfileImage] = useState(null);

  const handleCheckboxChange = (day) => {
    setWorkDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const diasMap = {
    "Segunda": "Monday",
    "Terça": "Tuesday",
    "Quarta": "Wednesday",
    "Quinta": "Thursday",
    "Sexta": "Friday",
    "Sábado": "Saturday",
    "Domingo": "Sunday",
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (workDays.length === 0) {
      alert("Por favor, selecione ao menos um dia de trabalho.");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("confPassword", confPassword);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("taxDocument", taxDocument);
    formData.append("iban", iban);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("state", state);
    formData.append("city", city);
    formData.append("neighborhood", neighborhood);
    formData.append("postalCode", postalCode);
    formData.append("workdays", JSON.stringify(workDays.map((dia) => diasMap[dia])));

    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    try {
      const response = await fetch(`${API_URL}/user/transporter/register`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Erro desconhecido");
      }

      const data = await response.json();
      alert("Transportador adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar os dados:", error.message);
      alert(`Erro ao enviar os dados: ${error.message}`);
    }
  };

  

  return (
    <div className="container mx-auto p-12">
      <h2 className="text-3xl font-bold mb-4">Adicionar novo transportador</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
      <div>
          <label htmlFor="profileImage" className="block">Imagem de perfil:</label>
          <input
            type="file"
            id="profileImage"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="username" className="block">Nome de usuário:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="password" className="block">Palavra passe:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="confPassword" className="block">Confirmar palavra passe:</label>
          <input
            type="password"
            id="confPassword"
            value={confPassword}
            onChange={(e) => setConfPassword(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="firstName" className="block">Primeiro nome:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block">Ultimo nome:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="taxDocument" className="block">NIF:</label>
          <input
            type="text"
            id="taxDocument"
            value={taxDocument}
            onChange={(e) => setTaxDocument(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="iban" className="block">IBAN:</label>
          <input
            type="text"
            id="iban"
            value={iban}
            onChange={(e) => setIban(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="email" className="block">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block">Número de telemóvel:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="state" className="block">Distrito:</label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="city" className="block">Conselho:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="neighborhood" className="block">Freguesia:</label>
          <input
            type="text"
            id="neighborhood"
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="postalCode" className="block">Código postal:</label>
          <input
            type="text"
            id="postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Dias de trabalho
          </label>
          <div className="grid grid-cols-2 gap-2">
            {["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"].map((dia) => (
              <label key={dia} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={dia}
                  checked={workDays.includes(dia)}
                  onChange={() => handleCheckboxChange(dia)}
                  className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{dia}</span>
              </label>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-950 text-white rounded-full transition duration-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 px-4 py-2 justify-self-center"
        >
          Adicionar transportador
        </button>
      </form>
    </div>
  );
};

export default AddTransporter;

