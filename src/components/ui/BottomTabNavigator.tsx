// components/ui/BottomTabNavigator.tsx
import React, { useEffect, useState } from 'react';
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';

// Importa i tuoi componenti "screen"
// Per ora, userò dei placeholder. Dovrai convertirli da React Native a React Web.
import HomeScreen from '../HomeScreen'; // Converti questo per React Web
import MatchesScreen from '../MatchesScreen'; // Converti questo per React Web
import TeamScreen from '../TeamScreen'; // Converti questo per React Web
import TournamentsScreen from '../TournamentScreen'; // Converti questo per React Web
// import MarketScreen from '../MarketScreen'; // Decommenta e converti se usi
// import AccountScreen from '../AccountScreen'; // Decommenta e converti se usi
import AdminScreen from '../AccountScreen'; // Il tuo account screen, converti anche questo

export default function BottomTabNavigator() {
    const [tournamentCount, setTournamentCount] = useState(0);
    const [matchCount, setMatchCount] = useState(0);
    const location = useLocation(); // Hook di react-router-dom per sapere il percorso attuale

    useEffect(() => {
        // TODO: Qui dovrai fare le chiamate al tuo backend per ottenere il conteggio
        // di tornei e partite. Questa logica è già quasi pronta per il web.
        const fetchCounts = async () => {
            try {
                // Esempio:
                // const tournamentsResponse = await fetch('/api/tournaments/count');
                // const tournamentsData = await tournamentsResponse.json();
                // setTournamentCount(tournamentsData.count);

                // const matchesResponse = await fetch('/api/matches/count');
                // const matchesData = await matchesResponse.json();
                // setMatchCount(matchesData.count);

                // Simulazione dati per test
                setTournamentCount(3); // Esempio: 3 tornei attivi
                setMatchCount(5);     // Esempio: 5 partite in attesa
            } catch (error) {
                console.error("Errore nel recupero dei conteggi:", error);
            }
        };

        fetchCounts();
    }, []);

    // Helper per renderizzare icone con badge
    const renderIconWithBadge = (iconClass: string, badgeCount: number, isActive: boolean) => (
        <div className="relative flex flex-col items-center justify-center">
            <i className={`${iconClass} ${isActive ? 'text-purple-600' : 'text-gray-400'} text-xl mb-1`}></i>
            {badgeCount > 0 && (
                <span className="absolute -right-1 -top-1 bg-red-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {badgeCount}
                </span>
            )}
        </div>
    );

    // Definizione delle tue tab
    const tabs = [
        { name: "Home", path: "/", icon: "fa fa-home", component: HomeScreen },
        { name: "Matches", path: "/matches", icon: "fa fa-futbol-o", badgeCount: matchCount, component: MatchesScreen },
        { name: "Team", path: "/team", icon: "fa fa-shield", component: TeamScreen },
        { name: "Tournaments", path: "/tournaments", icon: "fa fa-trophy", badgeCount: tournamentCount, component: TournamentsScreen },
        // Decommenta se ti servono
        // { name: "Market", path: "/market", icon: "fa fa-shopping-cart", component: MarketScreen },
        { name: "Account", path: "/account", icon: "fa fa-user", component: AdminScreen }, // Ho mantenuto AdminScreen come da originale
    ];

    return (
        <div className="flex flex-col h-screen">
            {/* Contenuto della pagina attuale */}
            <div className="flex-grow overflow-auto">
                <Routes>
                    {tabs.map((tab) => (
                        <Route key={tab.path} path={tab.path} element={<tab.component />} />
                    ))}
                    {/* Reindirizzamento per il percorso base se necessario */}
                    <Route path="*" element={<HomeScreen />} /> 
                </Routes>
            </div>

            {/* Bottom Tab Bar */}
            <nav className="flex justify-around items-center h-16 bg-white border-t border-gray-200 shadow-lg fixed bottom-0 left-0 right-0 z-30">
                {tabs.map((tab) => (
                    <NavLink
                        key={tab.name}
                        to={tab.path}
                        className={({ isActive }) => 
                            `flex flex-col items-center justify-center p-2 rounded-md transition-colors duration-200 
                            ${isActive ? 'text-purple-600' : 'text-gray-600'} 
                            hover:bg-gray-100 hover:text-purple-700`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                {renderIconWithBadge(tab.icon, tab.badgeCount || 0, isActive)}
                                <span className={`text-xs font-bold mt-1 ${isActive ? 'text-purple-600' : 'text-gray-600'}`}>
                                    {tab.name}
                                </span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
}