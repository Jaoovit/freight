import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const AddManager = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [taxDocument, setTaxDocument] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [secret, setSecret] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("confPassword", confPassword);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("taxDocument", taxDocument);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("secret", secret);

    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    try {
      const response = await fetch(`${API_URL}/user/manager/register`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro desconhecido");
      }

      alert("Gestor adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar os dados:", error.message);
      alert(`Erro ao enviar os dados: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto p-12">
      <h2 className="text-3xl font-bold mb-4">Adicionar novo gestor</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="profileImage" className="block">Imagem de perfil:</label>
          <input
            type="file"
            id="profileImage"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
            accept="image/*"
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
          <label htmlFor="secret" className="block">Chave secreta para gestor:</label>
          <input
            type="password"
            id="secret"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-950 text-white rounded-full transition duration-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 px-4 py-2 justify-self-center"
        >
          Adicionar gestor
        </button>
      </form>
    </div>
  );
};

export default AddManager;
