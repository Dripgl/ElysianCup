// src/components/MatchesScreen.tsx
import { useEffect, useState } from 'react';
// Importa icone da React Icons
import { FaClock, FaCalendarAlt, FaFootballBall, FaMedal, FaTrophy } from 'react-icons/fa';

// Importazioni Shadcn UI
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// Se hai aggiunto la componente Table di Shadcn UI, decommenta le righe qui sotto:
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// --- Definizione delle interfacce per i tipi di dati ---
interface TopScorer {
  id: string;
  name: string;
  points: number;
}

interface Team {
  id: string;
  name: string; // Aggiunto nome per la classifica
  coach: string;
  points: number;
}

interface MatchCalendarEntry {
  id: string;
  match: string;
  date: string;
}
// ----------------------------------------------------

const mockNextMatch = {
  teamA: { name: 'SSC FOX', logo: 'https://via.placeholder.com/100', lastFive: ['win', 'win', 'draw', 'loss', 'win'] },
  teamB: { name: 'FC WhatsApp', logo: 'https://via.placeholder.com/100', lastFive: ['loss', 'draw', 'win', 'win', 'loss'] },
  date: '2025-07-02T18:00:00', // Imposta una data nel futuro per testare il countdown
};

export default function MatchesScreen() {
  const [countdown, setCountdown] = useState('');
  const [topScorers, setTopScorers] = useState<TopScorer[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [matchCalendar, setMatchCalendar] = useState<MatchCalendarEntry[]>([]);

  // Simulate data fetching
  useEffect(() => {
    const fetchData = async () => {
      // Dati di esempio (rimuovi quando connetti il backend)
      setTopScorers([
        { id: '1', name: 'Marco Rossi', points: 25 },
        { id: '2', name: 'Luca Bianchi', points: 22 },
        { id: '3', name: 'Giulia Verdi', points: 18 },
        { id: '4', name: 'Anna Neri', points: 15 },
        { id: '5', name: 'Paolo Gialli', points: 12 },
      ]);

      setTeams([
        { id: 't1', name: 'I Leoni Verdi', coach: 'Coach Rossi', points: 150 },
        { id: 't2', name: 'Gli Squali Blu', coach: 'Coach Bianchi', points: 140 },
        { id: 't3', name: 'Le Volpi Rosse', coach: 'Coach Neri', points: 135 },
        { id: 't4', name: 'I Lupi Grigi', coach: 'Coach Verdi', points: 120 },
      ]);

      setMatchCalendar([
        { id: 'm1', match: 'SSC FOX vs FC WhatsApp', date: 'Domani, 20:00' },
        { id: 'm2', match: 'I Leoni Verdi vs Gli Squali Blu', date: '05 Lug, 18:00' },
        { id: 'm3', match: 'Le Volpi Rosse vs I Lupi Grigi', date: '06 Lug, 21:00' },
        { id: 'm4', match: 'SSC FOX vs Le Volpi Rosse', date: '10 Lug, 19:30' },
      ]);
    };
    fetchData();
  }, []);

  // Countdown logic
  useEffect(() => {
    const interval = setInterval(() => {
      const matchDate = new Date(mockNextMatch.date);
      const now = new Date();
      const diff = matchDate.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown('Partita in corso o terminata');
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60); // Aggiungi i secondi per maggiore precisione
        setCountdown(`${days}g ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const renderResultBox = (result: string, index: number) => {
    let bgColorClass = 'bg-gray-500'; // draw
    if (result === 'win') bgColorClass = 'bg-green-500';
    else if (result === 'loss') bgColorClass = 'bg-red-500';
    return <div key={index} className={`w-4 h-4 mx-0.5 rounded-sm ${bgColorClass}`} />;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-8 text-green-400
                     [text-shadow:_0_0_10px_rgba(74,222,128,0.5),_0_0_20px_rgba(74,222,128,0.3)]">
        Dashboard Torneo
      </h1>

      {/* Prossima Partita */}
      <Card className="bg-gray-800 border-green-700/60 shadow-xl mb-8 transform hover:scale-[1.01] transition-transform duration-300">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl sm:text-3xl font-bold text-green-300 flex items-center justify-center gap-2">
            <FaFootballBall className="text-green-400" /> Prossima Partita
          </CardTitle>
          <CardDescription className="text-gray-400 text-sm sm:text-base">Non perderti l'azione!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-around items-center gap-6 sm:gap-0 my-4">
            {/* Squadra A */}
            <div className="flex flex-col items-center p-4 bg-gray-700/50 rounded-lg shadow-md w-full sm:w-1/3">
              <img src={mockNextMatch.teamA.logo} alt={mockNextMatch.teamA.name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-green-500 mb-3 object-cover" />
              <p className="text-lg sm:text-xl font-semibold text-white text-center">{mockNextMatch.teamA.name}</p>
              <div className="flex mt-2">
                {mockNextMatch.teamA.lastFive.map((res, idx) => renderResultBox(res, idx))}
              </div>
            </div>

            <p className="text-3xl sm:text-4xl font-extrabold text-green-400 mx-4">VS</p>

            {/* Squadra B */}
            <div className="flex flex-col items-center p-4 bg-gray-700/50 rounded-lg shadow-md w-full sm:w-1/3">
              <img src={mockNextMatch.teamB.logo} alt={mockNextMatch.teamB.name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-green-500 mb-3 object-cover" />
              <p className="text-lg sm:text-xl font-semibold text-white text-center">{mockNextMatch.teamB.name}</p>
              <div className="flex mt-2">
                {mockNextMatch.teamB.lastFive.map((res, idx) => renderResultBox(res, idx))}
              </div>
            </div>
          </div>
          <div className="text-center mt-6 text-xl sm:text-2xl font-bold text-yellow-300">
            <FaClock className="inline-block mr-2 text-yellow-400" />
            {countdown}
          </div>
        </CardContent>
      </Card>

      {/* Sezioni Dati */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Migliori Marcatori */}
        <Card className="bg-gray-800 border-green-700/60 shadow-xl transform hover:scale-[1.01] transition-transform duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl sm:text-2xl font-bold text-green-300 flex items-center gap-2">
              <FaMedal className="text-yellow-400" /> Migliori Marcatori
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Usa la componente Table di Shadcn UI se l'hai installata */}
            {typeof Table !== 'undefined' ? (
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-700 hover:bg-gray-600">
                    <TableHead className="text-gray-300">Nome</TableHead>
                    <TableHead className="text-right text-gray-300">Punti</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topScorers.map((scorer) => (
                    <TableRow key={scorer.id} className="hover:bg-gray-700 border-gray-700">
                      <TableCell className="font-medium text-white">{scorer.name}</TableCell>
                      <TableCell className="text-right text-green-300 font-semibold">{scorer.points}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              // Fallback se Table non è disponibile
              <div className="space-y-2">
                {topScorers.map((item) => (
                  <div key={item.id} className="flex justify-between items-center bg-gray-700/50 p-3 rounded-md text-white">
                    <p>{item.name}</p>
                    <p className="font-semibold text-green-300">{item.points} pts</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Classifica Squadre */}
        <Card className="bg-gray-800 border-green-700/60 shadow-xl transform hover:scale-[1.01] transition-transform duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl sm:text-2xl font-bold text-green-300 flex items-center gap-2">
              <FaTrophy className="text-yellow-400" /> Classifica Squadre
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Usa la componente Table di Shadcn UI se l'hai installata */}
            {typeof Table !== 'undefined' ? (
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-700 hover:bg-gray-600">
                    <TableHead className="text-gray-300">Squadra</TableHead>
                    <TableHead className="text-gray-300">Allenatore</TableHead>
                    <TableHead className="text-right text-gray-300">Punti</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teams.map((team) => (
                    <TableRow key={team.id} className="hover:bg-gray-700 border-gray-700">
                      <TableCell className="font-medium text-white">{team.name}</TableCell>
                      <TableCell className="text-gray-300">{team.coach}</TableCell>
                      <TableCell className="text-right text-green-300 font-semibold">{team.points}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              // Fallback se Table non è disponibile
              <div className="space-y-2">
                {teams.map((item) => (
                  <div key={item.id} className="flex justify-between items-center bg-gray-700/50 p-3 rounded-md text-white">
                    <p>{item.name} ({item.coach})</p>
                    <p className="font-semibold text-green-300">{item.points} punti</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Calendario Partite */}
      <Card className="bg-gray-800 border-green-700/60 shadow-xl mt-6 transform hover:scale-[1.01] transition-transform duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl sm:text-2xl font-bold text-green-300 flex items-center gap-2">
            <FaCalendarAlt className="text-green-400" /> Calendario Partite
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Usa la componente Table di Shadcn UI se l'hai installata */}
          {typeof Table !== 'undefined' ? (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-700 hover:bg-gray-600">
                  <TableHead className="text-gray-300">Partita</TableHead>
                  <TableHead className="text-right text-gray-300">Data e Ora</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {matchCalendar.map((match) => (
                  <TableRow key={match.id} className="hover:bg-gray-700 border-gray-700">
                    <TableCell className="font-medium text-white">{match.match}</TableCell>
                    <TableCell className="text-right text-gray-300">{match.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            // Fallback se Table non è disponibile
            <div className="space-y-2">
              {matchCalendar.map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-gray-700/50 p-3 rounded-md text-white">
                  <p>{item.match}</p>
                  <p>{item.date}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}