// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { AppSidebar } from '@/components/AppSidebar';
import AccountScreen from '@/components/AccountScreen';
import HomeScreen from '@/components/HomeScreen';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { RxHamburgerMenu, RxCross2 } from 'react-icons/rx';

import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import MatchesScreen from './components/MatchesScreen';
import RankingScreen from './components/RankingScreen';
import TeamScreen from './components/TeamScreen';
import MarketScreen from './components/MarketScreen';
import TournamentsScreen from './components/TournamentScreen';

// Componente Layout per le pagine autenticate (con Sidebar)
const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground dark">
      {/* Sidebar (visibile sempre su md e oltre, nascosta/toggle su mobile) */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 transform bg-card w-64 transition-transform ease-in-out duration-300 md:relative md:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <AppSidebar onLinkClick={() => setIsSidebarOpen(false)} />
      </div>

      {/* Overlay per chiudere la sidebar cliccando fuori (solo su mobile) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {/* Bottone per aprire la sidebar su mobile (visibile solo su schermi piccoli) */}
        <div className="md:hidden flex justify-end mb-4">
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <RxCross2 className="h-6 w-6" /> : <RxHamburgerMenu className="h-6 w-6" />}
          </Button>
        </div>

        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/account" element={<AccountScreen />} />
          <Route path="/matches" element={<MatchesScreen />} />
          <Route path="/ranking" element={<RankingScreen />} />
          <Route path="/team" element={<TeamScreen />} />
          <Route path="/market" element={<MarketScreen />} />
          <Route path="/tournaments" element={<TournamentsScreen />} />
          
          {/* Aggiungi qui tutte le altre rotte interne come /leagues, /rewards */}
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        {/* Rotte senza sidebar (e.g., autenticazione) */}
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />

        {/* Tutte le rotte che usano il layout dell'app (con sidebar) */}
        <Route path="/*" element={<AppLayout />} />
      </Routes>
    </Router>
  );
}

export default App;