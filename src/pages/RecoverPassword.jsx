import { useState } from 'react';
import { useNavigate } from "react-router-dom";


const RecoverPassword = () => {

    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        navigate("/login/redefinePassword")
    }

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 px-8 sm:px-32 pt-8 sm:pt-24">
            <div className="sm:w-1/2 w-1/2 max-w-lg flex justify-center">
                <div className="w-32 h-32 sm:w-48 sm:h-48 lg:w-[30rem] lg:h-[30rem] rounded-full overflow-hidden shadow-lg">
                    <img 
                        src="/Forgot-password-amico.png" 
                        alt="Frete" 
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
            <div className='flex flex-col gap-9'>
                <form onSubmit={handleSubmit} className="max-w-md bg-white grid justify-items-stretch">
                    <div className="text-s mb-4 text-center text-gray-500">Esqueceu sua senha? Digite o seu email e clique em recuperar senha</div>
                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="username">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <button type="submit" className="px-8 py-3 justify-self-center bg-blue-950 text-white rounded-full font-semibold text-lg transition duration-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Recuperar senha
                    </button>
                </form>
            </div>
        </div>
    )
}

export default RecoverPassword;