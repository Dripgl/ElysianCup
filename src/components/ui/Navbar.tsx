import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [menuVisible, setMenuVisible] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            console.log('Simulazione logout...');
            await new Promise(resolve => setTimeout(resolve, 500)); // Simula un'operazione asincrona

            setMenuVisible(false);
            // Ora usiamo navigate per reindirizzare
            navigate('/login');
            console.log('Reindirizzato a /login');
        } catch (error) {
            console.error("Errore durante il logout:", error);
            console.error('Si è verificato un problema durante il logout.');
        }
    };

    const navigateTo = (path: string) => {
        setMenuVisible(false);
        // Ora usiamo navigate per la navigazione
        navigate(path);
        console.log(`Navigazione a ${path}`);
    };

    return (
        // Navbar container: sfondo scuro, padding, flexbox per allineamento
        <nav className="flex justify-between items-center px-4 py-3 bg-gray-900 shadow-md relative z-10">
            {/* Logo a sinistra */}
            {/* Assumi che il logo sia in public/assets/images/Logo.png */}
            <img src="/assets/images/Logo.png" alt="Elysian Cup Logo" className="w-10 h-10 object-contain" />

            {/* Icona menu a destra - usa un div per renderlo cliccabile */}
            <div
                className="text-white cursor-pointer hover:text-green-400 transition-colors"
                onClick={() => setMenuVisible(true)}
            >
                {/* Font Awesome icon - richiede CDN nel tuo index.html */}
                <i className="fa fa-bars text-xl"></i>
            </div>

            {/* Modal Menu Overlay */}
            {menuVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-20" onClick={() => setMenuVisible(false)}>
                    {/* Modal Content - click propagation stop per non chiudere il menu al click sul contenuto */}
                    <div className="bg-gray-800 w-64 p-6 rounded-l-lg shadow-xl relative transform transition-transform duration-300 ease-out translate-x-0" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-white text-2xl font-bold mb-6 text-center">Menu</h2>
                        
                        {/* Menu Item - Profilo */}
                        <div 
                            className="flex items-center text-white text-lg py-3 px-4 rounded-md cursor-pointer hover:bg-gray-700 transition-colors mb-3"
                            onClick={() => navigateTo('/account')}
                        >
                            <i className="fa fa-user mr-3 text-green-400"></i> <p>Profilo</p>
                        </div>
                        
                        {/* Menu Item - Settings */}
                        <div 
                            className="flex items-center text-white text-lg py-3 px-4 rounded-md cursor-pointer hover:bg-gray-700 transition-colors mb-3"
                            onClick={() => navigateTo('/settings')} // Assumo una rotta /settings
                        >
                            <i className="fa fa-cog mr-3 text-green-400"></i> <p>Settings</p>
                        </div>
                        
                        {/* Menu Item - Market */}
                        <div 
                            className="flex items-center text-white text-lg py-3 px-4 rounded-md cursor-pointer hover:bg-gray-700 transition-colors mb-3"
                            onClick={() => navigateTo('/market')}
                        >
                            <i className="fa fa-shopping-cart mr-3 text-green-400"></i> <p>Market</p>
                        </div>
                        
                        {/* Menu Item - Logout */}
                        <div 
                            className="flex items-center text-white text-lg py-3 px-4 rounded-md cursor-pointer hover:bg-gray-700 transition-colors mb-3"
                            onClick={handleLogout}
                        >
                            <i className="fa fa-sign-out mr-3 text-red-500"></i> <p>Logout</p>
                        </div>
                        
                        {/* Menu Item - Regolamento */}
                        <div 
                            className="flex items-center text-white text-lg py-3 px-4 rounded-md cursor-pointer hover:bg-gray-700 transition-colors mb-3"
                            onClick={() => navigateTo('/regulations')} // Assumo una rotta /regulations
                        >
                            <i className="fa fa-book mr-3 text-green-400"></i> <p>Regolamento</p>
                        </div>

                        {/* Pulsante di chiusura per il mobile/accessibilità */}
                        <button 
                            className="absolute top-4 right-4 text-white hover:text-green-400 transition-colors text-2xl"
                            onClick={() => setMenuVisible(false)}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}