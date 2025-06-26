// src/components/Dashboard/Dashboard.tsx
import { StatCard } from "@/components/Dashboard/StatCard";
import { PlayerCard } from "@/components/Dashboard/PlayerCard";
import { LeagueCard } from "@/components/Dashboard/LeagueCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Users, TrendingUp, Star, Calendar, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Definisci l'interfaccia Player qui, assicurati che sia coerente con PlayerCard.tsx e Market.tsx
interface Player {
  id: string;
  name: string;
  team: string;
  position: string;
  value: number;
  points: number;
  trend: 'up' | 'down' | 'stable';
  photo: string; // Deve esserci questa proprietà
}

// Dati mock per i tuoi giocatori
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
    name: 'Cristiano Ronaldo',
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
]; // <-- Parentesi quadra di chiusura aggiunta qui!

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

export default function Dashboard() {
  // Funzione fittizia per onAction, non necessaria per il Dashboard ma richiesta da PlayerCard
  // La PlayerCard nel Dashboard non avrà bisogno di questa funzione per acquistare/vendere
  // ma il suo tipo richiede che sia presente. Potresti voler rendere onAction opzionale in PlayerCardProps
  // se non è sempre necessaria.
  const handlePlayerAction = (playerId: string, action: 'buy' | 'sell' | 'info') => {
    console.log(`Azione '${action}' richiesta per il giocatore con ID: ${playerId}`);
    // Qui non facciamo nulla perché è solo per la visualizzazione nel Dashboard.
    // Nel Market.tsx questa funzione avrà una logica reale.
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-football-green">
            Benvenuto, Fantallenatore!
          </h1>
          <p className="text-muted-foreground mt-1">
            Ecco il riepilogo delle tue squadre e leghe
          </p>
        </div>
        <Button className="bg-football-green hover:bg-football-green/90">
          <Bell className="w-4 h-4 mr-2" />
          Notifiche
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Valore Squadra"
          value="€125M"
          icon={Trophy}
          description="Totale rose attive"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Punti Totali"
          value="1,847"
          icon={Star}
          description="Questa stagione"
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Posizione Media"
          value="4°"
          icon={TrendingUp}
          description="Nelle leghe attive"
          trend={{ value: 2, isPositive: true }}
        />
        <StatCard
          title="Leghe Attive"
          value="5"
          icon={Users}
          description="Partecipazioni"
        />
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-football-green">
            <Calendar className="w-5 h-5" />
            Prossimi Eventi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
              <div>
                <div className="font-medium">Trasferimenti</div>
                <div className="text-sm text-muted-foreground">
                  Finestra aperta fino al 15 Gen
                </div>
              </div>
              <Badge className="bg-football-green">Attivo</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
              <div>
                <div className="font-medium">Derby della Madonnina</div>
                <div className="text-sm text-muted-foreground">
                  Inter vs Milan - Domenica 20:45
                </div>
              </div>
              <Badge variant="outline">In arrivo</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Players */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-football-green">
              <Star className="w-5 h-5" />
              I Tuoi Top Player
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myTeamPlayers.map((player) => ( // <-- Cambiato da mockPlayers a myTeamPlayers
                <PlayerCard
                  key={player.id}
                  player={player}
                  onAction={handlePlayerAction} // <-- Aggiunta la prop onAction
                  showActions={false} // <-- Mantieni questa prop se la gestisci in PlayerCard
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Leagues */}
        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-football-green">
              <Trophy className="w-5 h-5" />
              Le Tue Leghe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockLeagues.map((league) => (
                <LeagueCard
                  key={league.id}
                  league={league}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}