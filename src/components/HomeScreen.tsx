// src/components/HomeScreen.tsx
import { useEffect, useState } from 'react';

// Importazioni Shadcn UI
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

// Importazioni delle componenti Dashboard esistenti
import { StatCard } from "@/components/Dashboard/StatCard";
import { PlayerCard } from "@/components/Dashboard/PlayerCard";
import { LeagueCard } from "@/components/Dashboard/LeagueCard";

// Importazioni React Icons
import { IoIosFootball } from "react-icons/io";           // Partite di calcio
import { LuGoal } from "react-icons/lu";                 // Marcatori (react-icons)
import { MdOutlineNewspaper } from "react-icons/md";     // Notizie/partite
import { RiCalendarTodoLine } from "react-icons/ri";     // Calendario/eventi
import { ImSpinner2 } from "react-icons/im";             // ccaricamento (spinner)
import { IoMdNotificationsOutline } from "react-icons/io"; // Notifiche (campanella)
import { RiAwardLine } from "react-icons/ri";            // Trofei/valore squadra
import { IoStarOutline } from "react-icons/io5";         // Punti/stelle
import { RiLineChartLine } from "react-icons/ri";        // Trend/posizione
import { FiUsers } from "react-icons/fi";                // Utenti/leghe attive


// --- Definizione delle interfacce per i tipi di dati ---
interface MatchNews {
  id: string;
  title: string;
}

interface TopScorer {
  id: string;
  name: string;
  goals: number;
  team: string;
}

// Definisci l'interfaccia Player qui, che sia coerente con PlayerCard.tsx e Market.tsx
interface Player {
  id: string;
  name: string;
  team: string;
  position: string;
  value: number;
  points: number;
  trend: 'up' | 'down' | 'stable';
  photo: string;
}

// ------------------- Dati Mock per Player e League -------------------
const myTeamPlayers: Player[] = [
  {
    id: 'p1',
    name: 'Lionel Messi',
    team: 'Inter Miami',
    position: 'Attaccante',
    value: 30000000,
    points: 180,
    trend: 'up',
    photo: 'https://via.placeholder.com/150/FFD700/000000?text=LM',
  },
  {
    id: 'p2',
    name: 'Ronaldinho',
    team: 'Al Nassr',
    position: 'Attaccante',
    value: 20000000,
    points: 160,
    trend: 'stable',
    photo: 'https://via.placeholder.com/150/32CD32/FFFFFF?text=CR',
  },
  {
    id: 'p3',
    name: 'Luka Modric',
    team: 'Real Madrid',
    position: 'Centrocampista',
    value: 8000000,
    points: 95,
    trend: 'down',
    photo: 'https://via.placeholder.com/150/ADD8E6/000000?text=LM',
  },
];

const mockLeagues = [
  {
    id: '1',
    name: 'Lega degli Amici',
    participants: 8,
    maxParticipants: 10,
    status: 'active' as const,
    isPrivate: true,
    position: 3,
    totalPoints: 1250,
  },
  {
    id: '2',
    name: 'Champions League',
    participants: 20,
    maxParticipants: 20,
    status: 'active' as const,
    isPrivate: false,
    position: 7,
    totalPoints: 980,
  },
];
// ---------------------------------------------------------------------

export default function HomeScreen() {
  const [etnaPadelMatches, setEtnaPadelMatches] = useState<MatchNews[]>([]);
  const [etnaPadelScorers, setEtnaPadelScorers] = useState<TopScorer[]>([]);
  const [devilSoccerMatches, setDevilSoccerMatches] = useState<MatchNews[]>([]);
  const [devilSoccerScorers, setDevilSoccerScorers] = useState<TopScorer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handlePlayerAction = (playerId: string, action: 'buy' | 'sell' | 'info') => {
    console.log(`Azione '${action}' richiesta per il giocatore con ID: ${playerId}`);
  };

  useEffect(() => {
    const fetchHomeData = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));

        setEtnaPadelMatches([
          { id: '1', title: 'Partita Padel 1 vs Partita Padel 2' },
          { id: '2', title: 'Partita Padel 3 vs Partita Padel 4' },
          { id: '3', title: 'Partita Padel 5 vs Partita Padel 6' },
        ]);
        setEtnaPadelScorers([
          { id: 'EP1', name: 'Marco Rossi', goals: 8, team: 'Padel Power' },
          { id: 'EP2', name: 'Luca Verdi', goals: 7, team: 'Smash Masters' },
          { id: 'EP3', name: 'Giulia Neri', goals: 6, team: 'Volley Aces' },
        ]);

        setDevilSoccerMatches([
          { id: 'DS1', title: 'Partita Calcio 1 vs Partita Calcio 2' },
          { id: 'DS2', title: 'Partita Calcio 3 vs Partita Calcio 4' },
          { id: 'DS3', title: 'Partita Calcio 5 vs Partita Calcio 6' },
        ]);
        setDevilSoccerScorers([
          { id: 'DSG1', name: 'Andrea Bianchi', goals: 12, team: 'Goal Getters' },
          { id: 'DSG2', name: 'Simone Neri', goals: 10, team: 'Net Busters' },
          { id: 'DSG3', name: 'Laura Gialli', goals: 9, team: 'Striker Force' },
        ]);

      } catch (error) {
        console.error('Errore nel caricamento dei dati della Home (simulato):', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const renderSection = (title: string, data: MatchNews[] | TopScorer[], type: 'matches' | 'scorers') => (
    <Card className="bg-football-card-dark text-white border-green-700/40 shadow-xl
                     hover:shadow-3xl hover:scale-[1.01] transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-football-green">
          {type === 'matches' ? <MdOutlineNewspaper className="w-5 h-5" /> : <LuGoal className="w-5 h-5" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-24">
            <ImSpinner2 className="h-6 w-6 animate-spin text-football-green" />
          </div>
        ) : data.length > 0 ? (
          <ScrollArea className="h-[200px] pr-4">
            <div className="space-y-3">
              {data.map((item, index) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-900 rounded-md border border-gray-700
                                             hover:bg-gray-800 transition-colors duration-200
                                             animate-slide-in-right"
                                             style={{ animationDelay: `${index * 0.05}s` }}>
                  {type === 'matches' ? (
                    <p className="text-gray-200 text-sm font-medium">{(item as MatchNews).title}</p>
                  ) : (
                    <p className="text-gray-200 text-sm font-medium">
                      {(item as TopScorer).name} - <span className="text-gray-400">{(item as TopScorer).team}</span> - Gol: <span className="font-bold text-football-gold">{(item as TopScorer).goals}</span>
                    </p>
                  )}
                  {type === 'matches' && <IoIosFootball className="w-4 h-4 text-green-500" />}
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <p className="text-center text-gray-400">Nessun dato disponibile.</p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="p-8 space-y-8 bg-background text-foreground min-h-screen font-sans animate-fade-in"> {/* Usa bg-background e text-foreground */}
      {/* Header con immagine di sfondo */}
      <div
        className="relative h-64 flex items-center justify-center rounded-xl overflow-hidden shadow-xl"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white text-center drop-shadow-lg [text-shadow:_0_0_15px_rgba(0,0,0,0.8)]">
            Benvenuto in Elysian Cup
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 text-center mt-2 drop-shadow-md [text-shadow:_0_0_10px_rgba(0,0,0,0.7)]">
            Domina il gioco. Regna nel campionato.
          </p>
        </div>
      </div>

      {/* Sezione di benvenuto e notifiche - Ex parte superiore della Dashboard */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-football-green text-center sm:text-left">
            Benvenuto, Fantallenatore!
          </h1>
          <p className="text-muted-foreground mt-1 text-center sm:text-left">
            Ecco il riepilogo delle tue squadre e leghe
          </p>
        </div>
        <Button className="bg-football-green hover:bg-football-green/90 shadow-md hover:shadow-lg transition-shadow duration-200 w-full sm:w-auto">
          <IoMdNotificationsOutline className="w-4 h-4 mr-2" />
          Notifiche
        </Button>
      </div>

      {/* Stats Cards dalla Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <StatCard
          title="Valore Squadra"
          value="€125M"
          icon={RiAwardLine}
          description="Totale rose attive"
          trend={{ value: 12, isPositive: true }}
          className="hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
        />
        <StatCard
          title="Punti Totali"
          value="1,847"
          icon={IoStarOutline}
          description="Questa stagione"
          trend={{ value: 8, isPositive: true }}
          className="hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
        />
        <StatCard
          title="Posizione Media"
          value="4°"
          icon={RiLineChartLine}
          description="Nelle leghe attive"
          trend={{ value: 2, isPositive: true }}
          className="hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
        />
        <StatCard
          title="Leghe Attive"
          value="5"
          icon={FiUsers}
          description="Partecipazioni"
          className="hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
        />
      </div>

      {/* Quick Actions dalla Dashboard */}
      <Card className="bg-gradient-card shadow-xl hover:shadow-3xl hover:scale-[1.01] transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-football-green">
            <RiCalendarTodoLine className="w-5 h-5" />
            Prossimi Eventi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row items-center justify-between p-3 bg-gray-900 rounded-lg shadow-sm hover:bg-gray-800 transition-colors duration-200 animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
              <div>
                <div className="font-medium text-lg">Trasferimenti</div>
                <div className="text-sm text-muted-foreground">
                  Finestra aperta fino al 15 Gen
                </div>
              </div>
              <Badge className="bg-football-green mt-2 sm:mt-0">Attivo</Badge>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between p-3 bg-gray-900 rounded-lg shadow-sm hover:bg-gray-800 transition-colors duration-200 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
              <div>
                <div className="font-medium text-lg">Derby della Madonnina</div>
                <div className="text-sm text-muted-foreground">
                  Inter vs Milan - Domenica 20:45
                </div>
              </div>
              <Badge variant="outline" className="mt-2 sm:mt-0">In arrivo</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sezioni Notizie/Marcatori dalla vecchia HomeScreen */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {renderSection("Etna Padel - Ultime Partite", etnaPadelMatches, 'matches')}
        {renderSection("Etna Padel - Migliori Marcatori", etnaPadelScorers, 'scorers')}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {renderSection("Devil Soccer - Ultime Partite", devilSoccerMatches, 'matches')}
        {renderSection("Devil Soccer - Migliori Marcatori", devilSoccerScorers, 'scorers')}
      </div>

      {/* Top Players dalla Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card shadow-xl hover:shadow-3xl hover:scale-[1.01] transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-football-green">
              <IoStarOutline className="w-5 h-5" />
              I Tuoi Top Player
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myTeamPlayers.map((player, index) => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  onAction={handlePlayerAction}
                  showActions={false}
                  className="animate-slide-in-right"
                  style={{ animationDelay: `${index * 0.05}s` }}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Leagues dalla Dashboard */}
        <Card className="bg-gradient-card shadow-xl hover:shadow-3xl hover:scale-[1.01] transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-football-green">
              <RiAwardLine className="w-5 h-5" />
              Le Tue Leghe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockLeagues.map((league, index) => (
                <LeagueCard
                  key={league.id}
                  league={league}
                  className="animate-slide-in-right"
                  style={{ animationDelay: `${index * 0.05}s` }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}