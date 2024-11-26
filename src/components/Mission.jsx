const Mission = () => {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 px-8 sm:px-32 py-8">
            {/* Image Section */}
            <div className="sm:w-1/2 w-2/3 max-w-lg flex justify-center">
                <div className="w-40 h-40 sm:w-48 sm:h-48 lg:w-[30rem] lg:h-[30rem] rounded-full overflow-hidden shadow-lg">
                    <img 
                        src="/Online-consulting-rafiki.png" 
                        alt="Frete" 
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
            {/* Text Section */}
            <div className="flex flex-col items-center sm:items-start justify-center gap-6 text-center sm:text-left sm:w-1/2">
                <p className="text-lg sm:text-2xl sm:text-center sm:text-left text-blue-950">
                A nossa missão é simplificar o transporte de mercadorias, combinando o uso da tecnologia com a competência e dedicação dos nossos colaboradores. Procuramos garantir a satisfação plena dos nossos clientes.
                </p>
            </div>
        </div>
    )
}

export default Mission