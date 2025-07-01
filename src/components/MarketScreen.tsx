import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlayerCard } from "@/components/Dashboard/PlayerCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// --- Importazioni delle icone da react-icons ---
import { FaArrowTrendUp, FaFilter, FaEuroSign, FaUsers, FaStar } from "react-icons/fa6"; // Per le icone Fa6
import { FaSearch } from "react-icons/fa"; // Per l'icona Search da Fa
import { FaMoneyBillTransfer } from 'react-icons/fa6'; // Icona per i trasferimenti

import { useToast } from "@/hooks/use-toast";

// Dati mock per il mercato
const availablePlayers = [
  {
    id: '1',
    name: 'Erling Haaland',
    team: 'Manchester City',
    position: 'Attaccante',
    value: 25000000,
    points: 156,
    trend: 'up' as const,
  },
  {
    id: '2',
    name: 'Kylian Mbappé',
    team: 'PSG',
    position: 'Attaccante',
    value: 30000000,
    points: 143,
    trend: 'up' as const,
  },
  {
    id: '3',
    name: 'Kevin De Bruyne',
    team: 'Manchester City',
    position: 'Centrocampista',
    value: 18000000,
    points: 128,
    trend: 'stable' as const,
  },
  {
    id: '4',
    name: 'Pedri',
    team: 'Barcelona',
    position: 'Centrocampista',
    value: 12000000,
    points: 89,
    trend: 'up' as const,
  },
  {
    id: '5',
    name: 'Virgil van Dijk',
    team: 'Liverpool',
    position: 'Difensore',
    value: 8000000,
    points: 92,
    trend: 'down' as const,
  },
  {
    id: '6',
    name: 'Manuel Neuer',
    team: 'Bayern Munich',
    position: 'Portiere',
    value: 6000000,
    points: 78,
    trend: 'stable' as const,
  },
];

const trendingPlayers = [
  {
    id: '7',
    name: 'Jude Bellingham',
    team: 'Real Madrid',
    position: 'Centrocampista',
    value: 15000000,
    points: 112,
    trend: 'up' as const,
  },
  {
    id: '8',
    name: 'Vinicius Jr',
    team: 'Real Madrid',
    position: 'Attaccante',
    value: 20000000,
    points: 134,
    trend: 'up' as const,
  },
  {
    id: '9',
    name: 'Jamal Musiala',
    team: 'Bayern Munich',
    position: 'Centrocampista',
    value: 14000000,
    points: 98,
    trend: 'up' as const,
  },
];

const myTransfers = [
  {
    id: 't1',
    type: 'buy' as const,
    player: 'Lorenzo Insigne',
    team: 'Napoli',
    value: 12000000,
    date: '2024-01-15',
    status: 'completed' as const
  },
  {
    id: 't2',
    type: 'sell' as const,
    player: 'Ciro Immobile',
    team: 'Lazio',
    value: 15000000,
    date: '2024-01-10',
    status: 'pending' as const
  },
];

export default function Market() {
  const [searchTerm, setSearchTerm] = useState("");
  const [positionFilter, setPositionFilter] = useState("all");
  const [teamFilter, setTeamFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const { toast } = useToast();

  // Estrae tutte le squadre uniche per il filtro
  const allTeams = Array.from(new Set(availablePlayers.map(p => p.team)));

  const handlePlayerAction = (playerId: string, action: 'buy' | 'sell' | 'info') => {
    const player = availablePlayers.find(p => p.id === playerId);
    
    if (action === 'buy') {
      toast({
        title: "Acquisto completato!",
        description: `Hai acquistato ${player?.name} per €${player?.value.toLocaleString()}`,
      });
    } else if (action === 'sell') {
      toast({
        title: "Vendita completata!",
        description: `Hai venduto ${player?.name} per €${player?.value.toLocaleString()}`,
      });
    } else if (action === 'info') {
      toast({
        title: "Informazioni Giocatore",
        description: `${player?.name} - ${player?.team} - ${player?.points} punti questa stagione`,
      });
    }
  };

  const filteredPlayers = availablePlayers.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          player.team.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = positionFilter === "all" || player.position.toLowerCase().includes(positionFilter.toLowerCase());
    const matchesTeam = teamFilter === "all" || player.team === teamFilter;
    const matchesPrice = priceFilter === "all" || 
                         (priceFilter === "low" && player.value < 10000000) ||
                         (priceFilter === "medium" && player.value >= 10000000 && player.value < 20000000) ||
                         (priceFilter === "high" && player.value >= 20000000);
    
    return matchesSearch && matchesPosition && matchesTeam && matchesPrice;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-football-green">Mercato</h1>
          <p className="text-muted-foreground mt-1">
            Acquista e vendi giocatori per migliorare la tua squadra
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-football-green">
            Budget: €50M
          </Badge>
          <Badge variant="outline" className="border-football-gold text-football-gold">
            15 trasferimenti rimasti
          </Badge>
        </div>
      </div>

      ---

      {/* Market Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-football-green/20 rounded-lg">
                <FaUsers className="w-5 h-5 text-football-green" /> {/* Icona aggiornata */}
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Giocatori Disponibili</div>
                <div className="text-xl font-bold text-football-green">
                  {availablePlayers.length}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <FaArrowTrendUp className="w-5 h-5 text-blue-500" /> {/* Icona aggiornata */}
              </div>
              <div>
                <div className="text-sm text-muted-foreground">In Crescita</div>
                <div className="text-xl font-bold text-blue-500">
                  {trendingPlayers.length}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-football-gold/20 rounded-lg">
                <FaEuroSign className="w-5 h-5 text-football-gold" /> {/* Icona aggiornata */}
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Valore Medio</div>
                <div className="text-xl font-bold text-football-gold">
                  €{(availablePlayers.reduce((sum, p) => sum + p.value, 0) / availablePlayers.length / 1000000).toFixed(1)}M
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <FaStar className="w-5 h-5 text-red-500" /> {/* Icona aggiornata */}
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Top Scorer</div>
                <div className="text-xl font-bold text-red-500">
                  {Math.max(...availablePlayers.map(p => p.points))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      ---

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-football-green">
            <FaFilter className="w-5 h-5" /> {/* Icona aggiornata */}
            Filtri
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" /> {/* Icona aggiornata */}
                <Input
                  placeholder="Cerca giocatori o squadre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={positionFilter} onValueChange={setPositionFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Posizione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutte le posizioni</SelectItem>
                <SelectItem value="portiere">Portiere</SelectItem>
                <SelectItem value="difensore">Difensore</SelectItem>
                <SelectItem value="centrocampista">Centrocampista</SelectItem>
                <SelectItem value="attaccante">Attaccante</SelectItem>
              </SelectContent>
            </Select>

            <Select value={teamFilter} onValueChange={setTeamFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Squadra" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutte le squadre</SelectItem>
                {allTeams.map(team => (
                  <SelectItem key={team} value={team}>{team}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Prezzo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutti i prezzi</SelectItem>
                <SelectItem value="low">Sotto €10M</SelectItem>
                <SelectItem value="medium">€10M - €20M</SelectItem>
                <SelectItem value="high">Sopra €20M</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setPositionFilter("all");
                setTeamFilter("all");
                setPriceFilter("all");
              }}
            >
              Reset Filtri
            </Button>
          </div>
        </CardContent>
      </Card>

      ---

      {/* Market Tabs */}
      <Tabs defaultValue="all-players" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all-players">Tutti i Giocatori</TabsTrigger>
          <TabsTrigger value="trending">In Crescita</TabsTrigger>
          <TabsTrigger value="transfers">I Miei Trasferimenti</TabsTrigger>
        </TabsList>

        <TabsContent value="all-players" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredPlayers.map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                onAction={handlePlayerAction}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-football-green">
                <FaArrowTrendUp className="w-5 h-5" /> {/* Icona aggiornata */}
                Giocatori in Crescita
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {trendingPlayers.map((player) => (
                  <PlayerCard
                    key={player.id}
                    player={player}
                    onAction={handlePlayerAction}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transfers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-football-green">
                <FaMoneyBillTransfer className="w-5 h-5" /> {/* Icona aggiornata */}
                Storico Trasferimenti
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myTransfers.map((transfer) => (
                  <div key={transfer.id} className="flex items-center justify-between p-4 bg-gradient-card rounded-lg">
                    <div className="flex items-center gap-4">
                      <Badge className={transfer.type === 'buy' ? 'bg-green-500' : 'bg-red-500'}>
                        {transfer.type === 'buy' ? 'Acquisto' : 'Vendita'}
                      </Badge>
                      <div>
                        <div className="font-semibold text-football-green">
                          {transfer.player}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {transfer.team} - {transfer.date}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-football-green">
                        €{transfer.value.toLocaleString()}
                      </div>
                      <Badge variant={transfer.status === 'completed' ? 'default' : 'secondary'}>
                        {transfer.status === 'completed' ? 'Completato' : 'In attesa'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}