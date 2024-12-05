import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        setError('');

        try {
            const response = await fetch(`${API_URL}/session/login`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                login(data.token, data.user);
                navigate('/');
            } else {
                const errorData = await response.json();
                console.error('Login failed:', errorData.message);
                setError('Usuário ou senha incorretos');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 px-8 sm:px-32 pt-8 sm:pt-24">
            <div className="sm:w-1/2 w-1/2 max-w-lg flex justify-center">
                <div className="w-32 h-32 sm:w-48 sm:h-48 lg:w-[30rem] lg:h-[30rem] rounded-full overflow-hidden shadow-lg">
                    <img 
                        src="/Mail-sent-bro.png" 
                        alt="Frete" 
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
            <div className='flex flex-col gap-9'>
                <form onSubmit={handleSubmit} className="max-w-md bg-white grid justify-items-stretch">
                    <div className="text-s mb-4 text-center text-gray-500">
                        Inicie sessão na sua conta, gerencie as suas entregas e consulte o saldo disponível
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="password">Palavra-passe</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    {error && (
                        <div className="text-red-500 text-center mb-4">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="px-8 py-3 justify-self-center bg-blue-950 text-white rounded-full font-semibold text-lg transition duration-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Login
                    </button>
                </form>
                <div className='text-gray-500'>
                    Esqueceu sua senha? <Link to="recoverPassword" className='text-blue-950 transition duration-500 hover:text-orange-600 font-bold'>Recuperar senha</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
