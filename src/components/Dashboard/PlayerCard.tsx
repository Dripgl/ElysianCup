// src/components/Dashboard/PlayerCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Interfaccia Player
interface Player {
  id: string;
  name: string;
  team: string;
  position: string;
  value: number;
  points: number;
  trend: 'up' | 'down' | 'stable';
  photo?: string;
}

// Interfaccia per le props di PlayerCard
interface PlayerCardProps {
  player: Player;
  onAction: (playerId: string, action: 'buy' | 'sell' | 'info') => void;
  showActions?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function PlayerCard({ player, onAction, showActions = true, className, style }: PlayerCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(value / 1000000) + 'M';
  };

  const TrendBadge = () => {
    let text = '';
    let variant: "default" | "secondary" | "destructive" | "outline" | null | undefined = 'outline';

    if (player.trend === 'up') {
      text = 'In Crescita';
      variant = 'default';
    } else if (player.trend === 'down') {
      text = 'In Calo';
      variant = 'destructive';
    } else { // 'stable'
      text = 'Stabile';
      variant = 'secondary';
    }

    return <Badge variant={variant} className="text-xs font-semibold">{text}</Badge>;
  };

  return (
    <Card className={cn("bg-gray-900 text-white border border-gray-700 hover:shadow-xl transition-shadow duration-200", className)} style={style}>
      <CardContent className="flex items-center p-4 gap-4">
        <img
          src={player.photo}
          alt={player.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-football-green"
        />
        <div className="flex-1">
          <h3 className="text-lg font-bold text-football-green">{player.name}</h3>
          <p className="text-sm text-gray-300">{player.team} - {player.position}</p>
          <div className="flex items-center text-sm mt-1 gap-2">
            <span className="font-semibold">Valore: {formatCurrency(player.value)}</span>
            <TrendBadge />
          </div>
          <div className="text-sm">Punti: <span className="font-bold text-football-gold">{player.points}</span></div>
        </div>
        {showActions && (
          <div className="flex flex-col gap-2">
            <Button variant="outline" size="sm" onClick={() => onAction(player.id, 'buy')}>Compra</Button>
            <Button variant="destructive" size="sm" onClick={() => onAction(player.id, 'sell')}>Vendi</Button>
            <Button variant="ghost" size="sm" onClick={() => onAction(player.id, 'info')}>Info</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}