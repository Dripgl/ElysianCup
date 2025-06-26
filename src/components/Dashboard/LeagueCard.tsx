// src/components/Dashboard/LeagueCard.tsx
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; 
import { Users, Lock } from "lucide-react"; // Importa Users per i partecipanti, Lock per lega privata

// Definisci i tipi per la League
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

// Definisci i tipi delle props per LeagueCard
interface LeagueCardProps {
  league: League;
}

export const LeagueCard: React.FC<LeagueCardProps> = ({ league }) => {
  const statusColor = league.status === 'active' ? 'bg-green-600' : league.status === 'pending' ? 'bg-yellow-600' : 'bg-gray-600';
  const statusText = league.status === 'active' ? 'Attiva' : league.status === 'pending' ? 'In Attesa' : 'Completata';

  return (
    <Card className="bg-gray-800 text-white border-green-700/40 hover:border-green-600/60 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="font-semibold text-lg text-green-300">{league.name}</div>
          <Badge className={`${statusColor} text-white`}>{statusText}</Badge>
        </div>
        <div className="flex items-center text-sm text-gray-400 mb-2">
          <Users className="h-4 w-4 mr-1" />
          {league.participants}/{league.maxParticipants} Partecipanti
          {/* Rimuoviamo la prop 'title' che causava l'errore */}
          {league.isPrivate && <Lock className="h-4 w-4 ml-2 text-gray-500" />}
        </div>
        <div className="flex items-center justify-between text-sm mt-3">
          <div className="text-gray-300">La tua posizione: <span className="font-bold text-green-400">{league.position}°</span></div>
          <div className="text-gray-300">Punti totali: <span className="font-bold text-green-400">{league.totalPoints}</span></div>
        </div>
      </CardContent>
    </Card>
  );
};