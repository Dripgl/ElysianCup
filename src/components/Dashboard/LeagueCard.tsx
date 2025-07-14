// src/components/Dashboard/LeagueCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Interfaccia League
interface League {
  id: string;
  name: string;
  participants: number;
  maxParticipants: number;
  status: 'active' | 'pending' | 'completed';
  isPrivate: boolean;
  position: number;
  totalPoints: number;
}

// Interfaccia per le props di LeagueCard
interface LeagueCardProps {
  league: League;
  className?: string;
  style?: React.CSSProperties;
}

export function LeagueCard({ league, className, style }: LeagueCardProps) {
  const getStatusBadgeVariant = (status: League['status']) => {
    if (status === 'active') return 'default';
    if (status === 'pending') return 'secondary';
    return 'outline';
  };

  return (
    <Card className={cn("bg-gray-900 text-white border border-gray-700 hover:shadow-xl transition-shadow duration-200", className)} style={style}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold text-football-green">
          {league.name}
        </CardTitle>
        <Badge variant={getStatusBadgeVariant(league.status)}>
          {league.status.charAt(0).toUpperCase() + league.status.slice(1)}
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-300">
          Partecipanti: {league.participants}/{league.maxParticipants} {league.isPrivate && "(Privata)"}
        </p>
        <div className="mt-2 text-sm">
          <p>La tua Posizione: <span className="font-bold text-football-gold">{league.position}°</span></p>
          <p>Punti Totali: <span className="font-bold text-football-gold">{league.totalPoints}</span></p>
        </div>
      </CardContent>
    </Card>
  );
}