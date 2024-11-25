const Home = () => {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 px-8 sm:px-32 py-8">
            {/* Image Section */}
            <div className="sm:w-1/2 w-2/3 max-w-lg flex justify-center">
                <div className="w-40 h-40 sm:w-48 sm:h-48 lg:w-[30rem] lg:h-[30rem] rounded-full overflow-hidden shadow-lg">
                    <img 
                        src="/delivery-man.jpg" 
                        alt="Frete" 
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Text Section */}
            <div className="flex flex-col items-center sm:items-start justify-center gap-6 text-center sm:text-left sm:w-1/2">
                <p className="text-4xl sm:text-6xl text-blue-950">
                    Da origem ao destino, sempre com você.
                </p>
                <p className="text-lg sm:text-xl text-center sm:text-left text-gray-500">
                    Está à procura de um frete confiável e rápido? Fale com um dos nossos atendentes e garanta a melhor solução!
                </p>
                <a 
                    href="#atendentes" 
                    className="px-8 py-3 bg-blue-950 text-white rounded-full font-semibold text-lg transition duration-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer"
                >
                    Falar com atendente
                </a>
            </div>
        </div>
    );
}

export default Home;






