// src/components/Dashboard/PlayerCard.tsx (o dove si trova il tuo PlayerCard.tsx)

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingDown, TrendingUpIcon, Info } from "lucide-react";

// interfaccia Player coerente con Market.tsx e Dashboard.tsx
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

// *** Modifica QUI: Aggiungi onAction e showActions all'interfaccia PlayerCardProps ***
interface PlayerCardProps {
  player: Player;
  onAction: (playerId: string, action: 'buy' | 'sell' | 'info') => void;
  showActions?: boolean; // Resa opzionale con '?'
}

export function PlayerCard({ player, onAction, showActions = true }: PlayerCardProps) {
  // `showActions = true` imposta il valore predefinito a true, così non devi specificarlo
  // ovunque a meno che tu non voglia impostarlo su false.

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUpIcon className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'stable':
      default:
        return null; // O un'icona di stabilità se ne hai una
    }
  };

  const getTrendBadgeClass = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'bg-green-500 hover:bg-green-600';
      case 'down':
        return 'bg-red-500 hover:bg-red-600';
      case 'stable':
      default:
        return 'bg-gray-500 hover:bg-gray-600'; // Grigio per stabile
    }
  };

  return (
    <Card className="bg-gradient-card border border-gray-700 hover:border-football-green transition-colors">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold text-football-green">
          {player.name}
        </CardTitle>
        <img
          src={player.photo}
          alt={player.name}
          className="w-10 h-10 rounded-full object-cover border border-gray-600"
        />
      </CardHeader>
      <CardContent className="space-y-2">
        <CardDescription className="text-muted-foreground">
          {player.team} - {player.position}
        </CardDescription>
        <div className="flex items-center gap-2 text-football-gold font-semibold">
          <DollarSign className="w-4 h-4" />
          €{player.value.toLocaleString()}
        </div>
        <div className="flex items-center gap-2 text-white text-sm">
          Punti Stagione: <span className="font-semibold">{player.points}</span>
        </div>
        {player.trend && (
          <Badge className={getTrendBadgeClass(player.trend)}>
            {getTrendIcon(player.trend)}
            {player.trend === 'up' && ' In Crescita'}
            {player.trend === 'down' && ' In Calo'}
            {player.trend === 'stable' && ' Stabile'}
          </Badge>
        )}
      </CardContent>
      {/* *** Modifica QUI: Condiziona la visualizzazione del CardFooter in base a showActions *** */}
      {showActions && (
        <CardFooter className="flex justify-between gap-2 pt-2">
          <Button
            variant="secondary"
            onClick={() => onAction(player.id, 'buy')}
            className="flex-1 bg-green-700 text-white hover:bg-green-800"
          >
            Acquista
          </Button>
          <Button
            variant="outline"
            onClick={() => onAction(player.id, 'sell')}
            className="flex-1 border-red-500 text-red-500 hover:bg-red-500/10"
          >
            Vendi
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onAction(player.id, 'info')}
            className="text-muted-foreground hover:bg-gray-700"
          >
            <Info className="w-4 h-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}