import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlayerCard } from "@/components/Dashboard/PlayerCard"; 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Search, Filter, DollarSign, Users, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// --- Tipi di Dati Aggiornati ---
// Ho uniformato l'interfaccia Player per includere 'photo' e la 'position' come stringa generica
// per la compatibilità con i dati mock e la logica di filtering esistente.
interface Player {
  id: string;
  name: string;
  // Sebbene nel mock originale ci sia 'surname', ho mantenuto solo 'name' per semplicità
  // in linea con i dati mock iniziali di questo file. Se vuoi 'surname', aggiungilo qui.
  team: string;
  position: string; // Resa più generica per compatibilità con i mock
  value: number;
  points: number;
  trend: 'up' | 'down' | 'stable';
  photo: string; // Aggiunto campo photo
}

interface Transfer {
  id: string;
  type: 'buy' | 'sell';
  player: string; // Nome del giocatore
  team: string; // Squadra del giocatore
  value: number;
  date: string;
  status: 'completed' | 'pending';
}

// --- Dati Mock per il Mercato (combinati e adattati) ---
const initialPlayersData: Player[] = [
  {
    id: '1',
    name: 'Erling Haaland',
    team: 'Manchester City',
    position: 'Attaccante',
    value: 25000000,
    points: 156,
    trend: 'up',
    photo: 'https://via.placeholder.com/150/32CD32/FFFFFF?text=EH'
  },
  {
    id: '2',
    name: 'Kylian Mbappé',
    team: 'PSG',
    position: 'Attaccante',
    value: 30000000,
    points: 143,
    trend: 'up',
    photo: 'https://via.placeholder.com/150/32CD32/FFFFFF?text=KM'
  },
  {
    id: '3',
    name: 'Kevin De Bruyne',
    team: 'Manchester City',
    position: 'Centrocampista',
    value: 18000000,
    points: 128,
    trend: 'stable',
    photo: 'https://via.placeholder.com/150/32CD32/FFFFFF?text=KD'
  },
  {
    id: '4',
    name: 'Pedri',
    team: 'Barcelona',
    position: 'Centrocampista',
    value: 12000000,
    points: 89,
    trend: 'up',
    photo: 'https://via.placeholder.com/150/32CD32/FFFFFF?text=PE'
  },
  {
    id: '5',
    name: 'Virgil van Dijk',
    team: 'Liverpool',
    position: 'Difensore',
    value: 8000000,
    points: 92,
    trend: 'down',
    photo: 'https://via.placeholder.com/150/32CD32/FFFFFF?text=VV'
  },
  {
    id: '6',
    name: 'Manuel Neuer',
    team: 'Bayern Munich',
    position: 'Portiere',
    value: 6000000,
    points: 78,
    trend: 'stable',
    photo: 'https://via.placeholder.com/150/32CD32/FFFFFF?text=MN'
  },
  // Giocatori in crescita dal mock originale (aggiunti a initialPlayersData o gestiti separatamente)
  {
    id: '7',
    name: 'Jude Bellingham',
    team: 'Real Madrid',
    position: 'Centrocampista',
    value: 15000000,
    points: 112,
    trend: 'up',
    photo: 'https://via.placeholder.com/150/32CD32/FFFFFF?text=JB'
  },
  {
    id: '8',
    name: 'Vinicius Jr',
    team: 'Real Madrid',
    position: 'Attaccante',
    value: 20000000,
    points: 134,
    trend: 'up',
    photo: 'https://via.placeholder.com/150/32CD32/FFFFFF?text=VJ'
  },
  {
    id: '9',
    name: 'Jamal Musiala',
    team: 'Bayern Munich',
    position: 'Centrocampista',
    value: 14000000,
    points: 98,
    trend: 'up',
    photo: 'https://via.placeholder.com/150/32CD32/FFFFFF?text=JM'
  },
];

const initialTransfersData: Transfer[] = [
  {
    id: 't1',
    type: 'buy',
    player: 'Lorenzo Insigne',
    team: 'Napoli',
    value: 12000000,
    date: '2024-01-15',
    status: 'completed'
  },
  {
    id: 't2',
    type: 'sell',
    player: 'Ciro Immobile',
    team: 'Lazio',
    value: 15000000,
    date: '2024-01-10',
    status: 'pending'
  },
];

// Estrae tutte le squadre uniche per il filtro
const allTeams = Array.from(new Set(initialPlayersData.map(p => p.team)));

export default function Market() {
  const [searchTerm, setSearchTerm] = useState("");
  const [positionFilter, setPositionFilter] = useState("all");
  const [teamFilter, setTeamFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [players, setPlayers] = useState<Player[]>([]); // Useremo questo stato per i giocatori
  const [myTransfers, setMyTransfers] = useState<Transfer[]>(initialTransfersData); // Stato per i trasferimenti
  const { toast } = useToast();

  // Simula il caricamento dei dati all'inizio
  useEffect(() => {
    // Qui faresti la tua chiamata API reale:
    // fetch('/api/players').then(res => res.json()).then(data => setPlayers(data));
    setPlayers(initialPlayersData); // Per ora, usiamo i dati mock
  }, []);

  const handlePlayerAction = (playerId: string, action: 'buy' | 'sell' | 'info') => {
    const player = players.find(p => p.id === playerId);
    if (!player) return;

    if (action === 'buy') {
      toast({
        title: "Acquisto completato!",
        description: `Hai acquistato ${player.name} per €${player.value.toLocaleString()}`,
      });
      // Simula l'aggiunta alla lista dei trasferimenti
      setMyTransfers(prev => [...prev, {
        id: `t${Date.now()}`, // ID unico
        type: 'buy',
        player: player.name,
        team: player.team,
        value: player.value,
        date: new Date().toISOString().slice(0, 10), // Data corrente
        status: 'completed'
      }]);
      // Rimuovi il giocatore dal mercato disponibile se acquistato
      setPlayers(prev => prev.filter(p => p.id !== playerId));

    } else if (action === 'sell') {
      toast({
        title: "Vendita completata!",
        description: `Hai venduto ${player.name} per €${player.value.toLocaleString()}`,
      });
      // Simula l'aggiunta alla lista dei trasferimenti
      setMyTransfers(prev => [...prev, {
        id: `t${Date.now()}`, // ID unico
        type: 'sell',
        player: player.name,
        team: player.team,
        value: player.value,
        date: new Date().toISOString().slice(0, 10), // Data corrente
        status: 'completed'
      }]);
      // Potresti riaggiungere il giocatore al mercato disponibile (o simulare che sia disponibile per altri)
      // setPlayers(prev => [...prev, player]); // Se vuoi che il giocatore venduto torni sul mercato

    } else if (action === 'info') {
      toast({
        title: "Informazioni Giocatore",
        description: `${player.name} (${player.team}) - Posizione: ${player.position} - Punti: ${player.points} - Valore: €${player.value.toLocaleString()}`,
      });
    }
  };

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          player.team.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = positionFilter === "all" || player.position.toLowerCase() === positionFilter.toLowerCase();
    const matchesTeam = teamFilter === "all" || player.team === teamFilter;
    const matchesPrice = priceFilter === "all" ||
                         (priceFilter === "low" && player.value < 10000000) ||
                         (priceFilter === "medium" && player.value >= 10000000 && player.value < 20000000) ||
                         (priceFilter === "high" && player.value >= 20000000);

    return matchesSearch && matchesPosition && matchesTeam && matchesPrice;
  });

  // Giocatori in crescita (filtrati dai players disponibili o da una lista separata se preferisci)
  const trendingPlayers = players.filter(player => player.trend === 'up');

  // Calcolo delle statistiche del mercato
  const totalPlayersAvailable = players.length;
  const avgPlayerValue = totalPlayersAvailable > 0
    ? (players.reduce((sum, p) => sum + p.value, 0) / totalPlayersAvailable / 1000000).toFixed(1)
    : '0.0';
  const topScorerPoints = players.length > 0
    ? Math.max(...players.map(p => p.points))
    : 0;

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
            Budget: €50.0M
          </Badge>
          <Badge variant="outline" className="border-football-gold text-football-gold">
            15 trasferimenti rimasti
          </Badge>
        </div>
      </div>

      {/* Market Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-football-green/20 rounded-lg">
                <Users className="w-5 h-5 text-football-green" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Giocatori Disponibili</div>
                <div className="text-xl font-bold text-football-green">
                  {totalPlayersAvailable}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-blue-500" />
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
                <DollarSign className="w-5 h-5 text-football-gold" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Valore Medio</div>
                <div className="text-xl font-bold text-football-gold">
                  €{avgPlayerValue}M
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <Star className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Top Scorer</div>
                <div className="text-xl font-bold text-red-500">
                  {topScorerPoints}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-gray-800 text-white border-green-700/40 hover:border-green-600/60 transition-colors">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-football-green">
            <Filter className="w-5 h-5" />
            Filtri
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Cerca giocatori o squadre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-900 border-gray-700 text-white focus:border-football-green"
                />
              </div>
            </div>

            <Select value={positionFilter} onValueChange={setPositionFilter}>
              <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700 text-white focus:border-football-green">
                <SelectValue placeholder="Posizione" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-white border-gray-700">
                <SelectItem value="all">Tutte le posizioni</SelectItem>
                <SelectItem value="portiere">Portiere</SelectItem>
                <SelectItem value="difensore">Difensore</SelectItem>
                <SelectItem value="centrocampista">Centrocampista</SelectItem>
                <SelectItem value="attaccante">Attaccante</SelectItem>
              </SelectContent>
            </Select>

            <Select value={teamFilter} onValueChange={setTeamFilter}>
              <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700 text-white focus:border-football-green">
                <SelectValue placeholder="Squadra" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-white border-gray-700">
                <SelectItem value="all">Tutte le squadre</SelectItem>
                {allTeams.map(team => (
                  <SelectItem key={team} value={team}>{team}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700 text-white focus:border-football-green">
                <SelectValue placeholder="Prezzo" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-white border-gray-700">
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
              className="border-football-green text-football-green hover:bg-football-green/10"
            >
              Reset Filtri
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Market Tabs */}
      <Tabs defaultValue="all-players" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800 border-gray-700">
          <TabsTrigger
            value="all-players"
            className="data-[state=active]:bg-football-green data-[state=active]:text-white"
          >
            Tutti i Giocatori
          </TabsTrigger>
          <TabsTrigger
            value="trending"
            className="data-[state=active]:bg-football-green data-[state=active]:text-white"
          >
            In Crescita
          </TabsTrigger>
          <TabsTrigger
            value="transfers"
            className="data-[state=active]:bg-football-green data-[state=active]:text-white"
          >
            I Miei Trasferimenti
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all-players" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredPlayers.length > 0 ? (
              filteredPlayers.map((player) => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  onAction={handlePlayerAction}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-muted-foreground p-8">Nessun giocatore trovato con i filtri selezionati.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="trending" className="space-y-4">
          <Card className="bg-gray-800 text-white border-green-700/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-football-green">
                <TrendingUp className="w-5 h-5" />
                Giocatori in Crescita
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {trendingPlayers.length > 0 ? (
                  trendingPlayers.map((player) => (
                    <PlayerCard
                      key={player.id}
                      player={player}
                      onAction={handlePlayerAction}
                    />
                  ))
                ) : (
                  <p className="col-span-full text-center text-muted-foreground p-8">Nessun giocatore in crescita al momento.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transfers" className="space-y-4">
          <Card className="bg-gray-800 text-white border-green-700/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-football-green">
                <DollarSign className="w-5 h-5" />
                Storico Trasferimenti
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myTransfers.length > 0 ? (
                  myTransfers.map((transfer) => (
                    <div key={transfer.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gradient-card rounded-lg border border-gray-700">
                      <div className="flex items-center gap-4 mb-2 sm:mb-0">
                        <Badge className={transfer.type === 'buy' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}>
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
                      <div className="text-right sm:ml-auto">
                        <div className="font-bold text-football-green">
                          €{transfer.value.toLocaleString()}
                        </div>
                        <Badge
                          variant={transfer.status === 'completed' ? 'default' : 'secondary'}
                          className={`${transfer.status === 'completed' ? 'bg-gray-600 hover:bg-gray-700' : 'bg-yellow-600 hover:bg-yellow-700'} text-white mt-1`}
                        >
                          {transfer.status === 'completed' ? 'Completato' : 'In attesa'}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground p-8">Nessun trasferimento registrato.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}