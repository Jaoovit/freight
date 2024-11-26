const Footer = () => {
    return (
        <footer className="bg-blue-950 text-white py-6 px-8 mt-32">
            <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-center sm:items-start gap-6 sm:gap-0">
                
                {/* Logo and Description */}
                <div className="text-center sm:text-left">
                    <h2 className="text-2xl font-semibold">LogX</h2>
                    <p className="mt-2 text-sm text-gray-300">
                        A transportadora que facilita o seu transporte com eficiência e tecnologia.
                    </p>
                </div>               
            </div>

            <div className="mt-6 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
                <p>&copy; 2024 LogX. Todos os direitos reservados. Desenvolvido por <a className="transition hover:text-orange-600 duration-500"href="https://github.com/Jaoovit">João Oliveira</a>.</p>
            </div>
        </footer>
    );
};

export default Footer;
