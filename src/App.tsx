// src/App.tsx
import { Routes, Route } from 'react-router-dom';

// Importa i tuoi componenti
import LoginScreen from '@/components/LoginScreen';
import RegisterScreen from '@/components/RegisterScreen';
import Dashboard from '@/components/Dashboard/Dashboard';
import { AppSidebar } from '@/components/AppSidebar';
import { Toaster } from "@/components/ui/toaster";

// Importa il VERO MarketScreen dal suo percorso
import MarketScreen from '@/components/MarketScreen';

// Rimuovi o commenta le definizioni "Coming Soon!" per i componenti che hai già creato
const TeamScreen = () => <div className="p-8 text-white"><h1>La Mia Squadra (Coming Soon!)</h1></div>;
const LeaguesScreen = () => <div className="p-8 text-white"><h1>Leghe (Coming Soon!)</h1></div>;
// const MarketScreen = () => <div className="p-8 text-white"><h1>Mercato (Coming Soon!)</h1></div>; // <-- RIMUOVI O COMMENTA QUESTA RIGA!
const CalendarScreen = () => <div className="p-8 text-white"><h1>Calendario (Coming Soon!)</h1></div>;
const AdminUsersScreen = () => <div className="p-8 text-white"><h1>Gestione Utenti (Coming Soon!)</h1></div>;
const AdminLeaguesScreen = () => <div className="p-8 text-white"><h1>Gestione Leghe (Coming Soon!)</h1></div>;
const SettingsScreen = () => <div className="p-8 text-white"><h1>Impostazioni (Coming Soon!)</h1></div>;


function App() {
  return (
    <Routes>
      {/* Rotte pubbliche (Login, Register) */}
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />

      {/* Layout per le rotte autenticate con Sidebar */}
      <Route path="/*" element={
        <div className="flex min-h-screen bg-gray-950"> {/* Contenitore principale flex */}
          <AppSidebar />
          <Toaster />
          <main className="flex-1 p-8 overflow-y-auto"> {/* Contenuto principale */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<TeamScreen />} />
              <Route path="/leagues" element={<LeaguesScreen />} />
              <Route path="/market" element={<MarketScreen />} />
              <Route path="/calendar" element={<CalendarScreen />} />
              <Route path="/admin/users" element={<AdminUsersScreen />} />
              <Route path="/admin/leagues" element={<AdminLeaguesScreen />} />
              <Route path="/settings" element={<SettingsScreen />} />
              {/* Aggiungi qui altre rotte protette */}
            </Routes>
          </main>
        </div>
      } />
    </Routes>
  );
}

export default App;