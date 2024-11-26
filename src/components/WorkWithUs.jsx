const WorkWithUs = () => {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 px-8 sm:px-32 py-8">
            
            {/* Image Section */}
            <div className="sm:w-1/2 w-2/3 max-w-lg flex justify-center sm:order-last">
                <div className="w-40 h-40 sm:w-48 sm:h-48 lg:w-[30rem] lg:h-[30rem] rounded-full overflow-hidden shadow-lg">
                    <img 
                        src="/Take-Away-rafiki.png" 
                        alt="Frete" 
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Text Section */}
            <div className="flex flex-col items-center justify-center gap-6 text-center sm:w-1/2">
                <p className="text-4xl sm:text-6xl text-blue-950">
                    Junte-se a nós e torne-se um colaborador
                </p>
                <p className="text-lg sm:text-xl text-center sm:text-center text-gray-500">
                    Gostaria de fazer parte deste projeto e trabalhar connosco? Fale com um dos nossos atendentes e descubra como!
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
};

export default WorkWithUs;
