// src/components/RankingScreen.tsx
import { useEffect, useState } from 'react';
// Importa icone da React Icons
import { FaTrophy, FaMedal } from 'react-icons/fa'; // FaTrophy per il titolo, FaMedal per i goals
import { ImSpinner2 } from 'react-icons/im'; // Per il caricamento

// Importazioni Shadcn UI
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// --- Definizione delle interfacce per i tipi di dati ---
interface TeamRanking {
  id: string;
  team: string;
  goals: number;
  lastMatches: ('W' | 'L' | 'D')[]; // 'W'in, 'L'oss, 'D'raw
}

// Componente per i quadratini dei risultati delle ultime partite
const MatchSquare = ({ result }: { result: 'W' | 'L' | 'D' }) => {
  let bgColorClass: string;
  if (result === 'W') bgColorClass = 'bg-green-500'; // Vittoria
  else if (result === 'L') bgColorClass = 'bg-red-500';   // Sconfitta // <-- Corretto qui: da 'bgColor' a 'bgColorClass'
  else bgColorClass = 'bg-gray-500'; // Pareggio o altro
  
  return <div className={`w-4 h-4 sm:w-5 sm:h-5 mx-0.5 rounded-sm shadow-sm ${bgColorClass}`} />;
};

const RankingScreen = () => {
  const [teams, setTeams] = useState<TeamRanking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRanking = async () => {
      setIsLoading(true);
      try {
        // Simula un ritardo di rete per i dati di esempio
        await new Promise(resolve => setTimeout(resolve, 1000)); 

        const mockData: TeamRanking[] = [
          { id: '1', team: 'Dragons FC', goals: 55, lastMatches: ['W', 'L', 'W', 'D', 'W'] },
          { id: '2', team: 'Phoenix United', goals: 52, lastMatches: ['W', 'W', 'L', 'L', 'W'] },
          { id: '3', team: 'Thunderbirds', goals: 48, lastMatches: ['D', 'W', 'W', 'D', 'L'] },
          { id: '4', team: 'Night Hawks', goals: 45, lastMatches: ['L', 'L', 'W', 'W', 'D'] },
          { id: '5', team: 'Golden Eagles', goals: 40, lastMatches: ['W', 'D', 'L', 'W', 'D'] },
          { id: '6', team: 'Steel Wolves', goals: 38, lastMatches: ['L', 'W', 'D', 'L', 'L'] },
        ];
        
        // Ordina per goals decrescente
        mockData.sort((a, b) => b.goals - a.goals); 
        setTeams(mockData);

      } catch (error) {
        console.error('Errore durante il recupero della classifica (simulato):', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRanking();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-8 text-green-400
                     [text-shadow:_0_0_10px_rgba(74,222,128,0.5),_0_0_20px_rgba(74,222,128,0.3)]">
        <FaTrophy className="inline-block mr-3 text-yellow-400" /> Classifica Torneo
      </h1>

      <Card className="bg-gray-800 border-green-700/60 shadow-xl mb-8 transform hover:scale-[1.01] transition-transform duration-300">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl sm:text-3xl font-bold text-green-300 flex items-center justify-center gap-2">
            <FaMedal className="text-yellow-400" /> Posizioni Attuali
          </CardTitle>
          <CardDescription className="text-gray-400 text-sm sm:text-base">
            Aggiornato in tempo reale.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <ImSpinner2 className="h-8 w-8 animate-spin text-green-400" />
              <p className="ml-3 text-lg text-gray-300">Caricamento classifica...</p>
            </div>
          ) : (
            typeof Table !== 'undefined' ? (
              <div className="overflow-x-auto">
                <Table className="min-w-full">
                  <TableHeader>
                    <TableRow className="bg-gray-700 hover:bg-gray-600">
                      <TableHead className="w-[60px] text-gray-300">Pos</TableHead>
                      <TableHead className="text-gray-300">Squadra</TableHead>
                      <TableHead className="text-right text-gray-300">Goals</TableHead>
                      <TableHead className="text-center text-gray-300">Ultime 5</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teams.map((item, index) => (
                      <TableRow key={item.id} className="hover:bg-gray-700 border-gray-700">
                        <TableCell className="font-bold text-green-300">{index + 1}</TableCell>
                        <TableCell className="font-medium text-white">{item.team}</TableCell>
                        <TableCell className="text-right text-yellow-300 font-semibold">{item.goals}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center">
                            {item.lastMatches.map((res, i) => (
                              <MatchSquare key={i} result={res} />
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              // Fallback se la componente Table non è installata
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-700 rounded-md font-bold text-gray-300">
                  <span className="w-1/12">Pos</span>
                  <span className="w-5/12">Squadra</span>
                  <span className="w-2/12 text-right">Goals</span>
                  <span className="w-4/12 text-center">Ultime 5</span>
                </div>
                {teams.map((item, index) => (
                  <div key={item.id} className="flex justify-between items-center p-3 bg-gray-700/50 rounded-md text-white">
                    <span className="w-1/12 font-bold text-green-300">{index + 1}</span>
                    <span className="w-5/12">{item.team}</span>
                    <span className="w-2/12 text-right font-semibold text-yellow-300">{item.goals}</span>
                    <span className="w-4/12 flex justify-center">
                      {item.lastMatches.map((res, i) => (
                        <MatchSquare key={i} result={res} />
                      ))}
                    </span>
                  </div>
                ))}
              </div>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RankingScreen;