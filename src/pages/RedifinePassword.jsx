import { useState } from "react";

const RedefinePassword = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [token, setToken] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 px-8 sm:px-32 pt-8 sm:pt-24">
            <div className="sm:w-1/2 w-1/2 max-w-lg flex justify-center">
                <div className="w-32 h-32 sm:w-48 sm:h-48 lg:w-[30rem] lg:h-[30rem] rounded-full overflow-hidden shadow-lg">
                    <img 
                        src="/Security-amico.png" 
                        alt="Frete" 
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
            <div className='flex flex-col gap-9'>
            <form onSubmit={handleSubmit} className="max-w-md bg-white grid justify-items-stretch">
                    <div className="text-s mb-4 text-center text-gray-500">Para redefinir a sua palavra-passe, introduza uma nova palavra-passe, confirme-a e insira o código de verificação que enviámos para o seu e-mail </div>
                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            required
                        />
                        <label className="block text-gray-700" htmlFor="password">Palavra-passe</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            required
                        />
                        <label className="block text-gray-700" htmlFor="confPassword">Confirme a palavra-passe</label>
                        <input
                            type="password"
                            id="confPassword"
                            value={confPassword}
                            onChange={(e) => setConfPassword(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            required
                        />
                        <label className="block text-gray-700" htmlFor="token">Chave de Verificação</label>
                        <input
                            type="password"
                            id="token"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <button type="submit" className="px-8 py-3 justify-self-center bg-blue-950 text-white rounded-full font-semibold text-lg transition duration-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Redefinir palavra-passe
                    </button>
                </form>
            </div>
        </div>
    )
}

export default RedefinePassword;