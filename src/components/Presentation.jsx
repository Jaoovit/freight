const Presentation = () => {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 px-8 sm:px-32 py-8">
            {/* Image Section */}
            <div className="sm:w-1/2 w-2/3 max-w-lg flex justify-center sm:order-last">
                <div className="w-40 h-40 sm:w-48 sm:h-48 lg:w-[30rem] lg:h-[30rem] rounded-full overflow-hidden shadow-lg">
                    <img 
                        src="/Navigation-pana.png" 
                        alt="Frete" 
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
            {/* Text Section */}
            <div className="flex flex-col items-center sm:items-start justify-center gap-6 text-center sm:text-center sm:w-1/2">
                <p className="text-lg sm:text-2xl text-blue-950">
                    Somos uma transportadora com sede em Santo Tirso, no distrito do Porto, que opera em todo o território de Portugal continental. Com uma equipa dedicada e uma abordagem moderna.
                </p>
            </div>
        </div>
    );
};

export default Presentation;
