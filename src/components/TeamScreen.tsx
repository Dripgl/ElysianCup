// src/components/TeamScreen.tsx
import { useEffect, useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils"; // Per unire le classi Tailwind in modo condizionale

// Importa l'immagine del campo
import backgroundImage from '../assets/images/BkCamp.png'; // Assicurati che il percorso sia corretto

// --- Definizione delle interfacce per i tipi di dati ---
interface Player {
  id: string;
  name: string;
  x: number; // Posizione percentuale X sul campo (0-100)
  y: number; // Posizione percentuale Y sul campo (0-100)
  role: string; // Ruolo del giocatore (es. POR, DC, CC, ATT)
  photo: string; // URL della foto del giocatore
}

interface FormationData {
  [key: string]: Player[]; // Una chiave (es. '1-4-1') mappa a un array di giocatori
}
// ----------------------------------------------------

// Dati dei giocatori hardcodati - Questi dovrebbero venire dal tuo backend!
const initialPlayersByFormation: FormationData = {
  '1-4-1': [
    { id: '1', name: 'Manuel', x: 50, y: 10, role: 'POR', photo: 'https://via.placeholder.com/60/FFD700/000000?text=P' },
    { id: '2', name: 'Virgil', x: 50, y: 25, role: 'DC', photo: 'https://via.placeholder.com/60/4CAF50/FFFFFF?text=D' },
    { id: '3', name: 'Luka', x: 30, y: 41, role: 'CC', photo: 'https://via.placeholder.com/60/007bff/FFFFFF?text=C' },
    { id: '4', name: 'Kylian', x: 42, y: 41, role: 'CC', photo: 'https://via.placeholder.com/60/007bff/FFFFFF?text=C' },
    { id: '5', name: 'Cristiano', x: 55, y: 41, role: 'CC', photo: 'https://via.placeholder.com/60/007bff/FFFFFF?text=C' },
    { id: '6', name: 'Leo', x: 68, y: 41, role: 'CC', photo: 'https://via.placeholder.com/60/007bff/FFFFFF?text=C' },
    { id: '7', name: 'Neymar', x: 50, y: 58, role: 'ATT', photo: 'https://via.placeholder.com/60/FFA500/FFFFFF?text=A' },
  ],
  '2-3-1': [
    { id: '1', name: 'Manuel', x: 50, y: 10, role: 'POR', photo: 'https://via.placeholder.com/60/FFD700/000000?text=P' },
    { id: '2', name: 'Virgil', x: 35, y: 25, role: 'DC', photo: 'https://via.placeholder.com/60/4CAF50/FFFFFF?text=D' },
    { id: '3', name: 'Luka', x: 65, y: 25, role: 'DC', photo: 'https://via.placeholder.com/60/4CAF50/FFFFFF?text=D' },
    { id: '4', name: 'Cristiano', x: 33, y: 41, role: 'CC', photo: 'https://via.placeholder.com/60/007bff/FFFFFF?text=C' },
    { id: '5', name: 'Kylian', x: 50, y: 41, role: 'CC', photo: 'https://via.placeholder.com/60/007bff/FFFFFF?text=C' },
    { id: '6', name: 'Neymar', x: 67, y: 41, role: 'CC', photo: 'https://via.placeholder.com/60/007bff/FFFFFF?text=C' },
    { id: '7', name: 'Leo', x: 50, y: 58, role: 'ATT', photo: 'https://via.placeholder.com/60/FFA500/FFFFFF?text=A' },
  ],
  '3-1-2': [
    { id: '1', name: 'Manuel', x: 50, y: 10, role: 'POR', photo: 'https://via.placeholder.com/60/FFD700/000000?text=P' },
    { id: '2', name: 'Virgil', x: 25, y: 30, role: 'DC', photo: 'https://via.placeholder.com/60/4CAF50/FFFFFF?text=D' },
    { id: '3', name: 'Luka', x: 50, y: 30, role: 'DC', photo: 'https://via.placeholder.com/60/4CAF50/FFFFFF?text=D' },
    { id: '4', name: 'Cristiano', x: 75, y: 30, role: 'DC', photo: 'https://via.placeholder.com/60/4CAF50/FFFFFF?text=D' },
    { id: '5', name: 'Neymar', x: 50, y: 60, role: 'CC', photo: 'https://via.placeholder.com/60/007bff/FFFFFF?text=C' },
    { id: '6', name: 'Leo', x: 35, y: 85, role: 'ATT', photo: 'https://via.placeholder.com/60/FFA500/FFFFFF?text=A' },
    { id: '7', name: 'Kylian', x: 65, y: 85, role: 'ATT', photo: 'https://via.placeholder.com/60/FFA500/FFFFFF?text=A' },
  ]
};

export default function TeamScreen() {
  const [formation, setFormation] = useState<keyof typeof initialPlayersByFormation>('1-4-1');
  const [isModalOpen, setIsModalOpen] = useState(false); // Stato per il Dialog di Shadcn UI
  const [availableFormations, setAvailableFormations] = useState<string[]>(Object.keys(initialPlayersByFormation));
  const [teamPlayers, setTeamPlayers] = useState<FormationData>(initialPlayersByFormation);
  const [isAnimating, setIsAnimating] = useState(false); // Per l'animazione di fade
  const fieldRef = useRef<HTMLDivElement>(null); // Riferimento al campo per ottenere le dimensioni
  const [playerSize, setPlayerSize] = useState(60); // Dimensione base dei giocatori in px

  // Calcola la dimensione dinamica dei giocatori in base alla larghezza del campo
  useEffect(() => {
    const handleResize = () => {
      if (fieldRef.current) {
        // La dimensione dei giocatori sarà una percentuale della larghezza del campo
        // Ho scelto 8vw (8% della larghezza del viewport) come dimensione base reattiva.
        // Puoi aggiustare 8 in base a quanto grandi vuoi i giocatori.
        const newPlayerSize = Math.min(fieldRef.current.offsetWidth * 0.1, 70); // Max 70px per evitare giocatori troppo grandi
        setPlayerSize(newPlayerSize);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Esegui al mount iniziale

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  // Carica le formazioni e i giocatori dal backend all'inizio
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        // TODO: Fai una chiamata al tuo backend per ottenere le formazioni disponibili
        // e i dettagli dei giocatori per ogni formazione.
        // Simulazione di un ritardo per il caricamento dei dati
        await new Promise(resolve => setTimeout(resolve, 500)); 

        setTeamPlayers(initialPlayersByFormation);
        setAvailableFormations(Object.keys(initialPlayersByFormation));

      } catch (error) {
        console.error('Errore nel caricamento dei dati del team (simulato):', error);
      }
    };

    fetchTeamData();
  }, []);

  const currentPlayers = teamPlayers[formation] || [];

  const animatePlayers = (newFormationKey: keyof typeof initialPlayersByFormation) => {
    setIsAnimating(true); // Inizia l'animazione di fade-out
    setTimeout(() => {
      setFormation(newFormationKey);
      setIsAnimating(false); // Finisce l'animazione di fade-in
    }, 300); // Durata della transizione CSS (300ms)
  };

  const handleConfirmFormation = async () => {
    // TODO: Fai una chiamata POST al tuo backend per salvare la formazione attuale.
    console.log(`Simulazione salvataggio formazione: ${formation}`);
    alert(`Formazione "${formation}" confermata (simulato)!`);
  };

  // Funzione per filtrare i sostituti
  const substitutes = Object.values(teamPlayers)
    .flat()
    .filter(p => !currentPlayers.some(cp => cp.id === p.id))
    .filter((value, index, self) => // Rimuove duplicati per id
        index === self.findIndex((t) => (
            t.id === value.id
        ))
    );


  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6 lg:p-8 flex flex-col items-center font-sans">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-6 text-green-400
                     [text-shadow:_0_0_10px_rgba(74,222,128,0.5),_0_0_20px_rgba(74,222,128,0.3)]">
        I Tuoi Gladiatori
      </h1>
      <p className="text-lg sm:text-xl text-center mb-6 text-gray-300">
        Formazione attuale: <span className="font-semibold text-green-300">{formation}</span>
      </p>

      <div className="w-full max-w-lg mb-8">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-colors duration-200 text-lg">
              Scegli Formazione: {formation}
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 border-green-700/60 text-white rounded-xl shadow-lg max-w-sm">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-center text-green-300">Seleziona Formazione</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              {availableFormations.filter(f => f !== formation).map(f => (
                <Button
                  key={f}
                  variant="ghost"
                  className="w-full justify-center text-lg py-3 hover:bg-gray-700 text-gray-200 hover:text-green-300 transition-colors duration-200"
                  onClick={() => {
                    setIsModalOpen(false);
                    animatePlayers(f as keyof typeof initialPlayersByFormation);
                  }}
                >
                  {f}
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div
        ref={fieldRef}
        className="w-full max-w-2xl aspect-[4/5] bg-cover bg-center rounded-2xl shadow-2xl overflow-hidden relative border-4 border-green-700/60 mb-8"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className={cn(
          "absolute inset-0 transition-opacity duration-300",
          isAnimating ? "opacity-0" : "opacity-100"
        )}>
          {currentPlayers.map(player => (
            <div
              key={player.id}
              className="absolute flex flex-col items-center justify-center p-0.5"
              style={{
                left: `${player.x}%`,
                top: `${player.y}%`,
                transform: `translate(-50%, -50%)`, // Centra l'elemento sul punto (x,y)
                width: playerSize, // Usa la dimensione dinamica
                height: playerSize,
              }}
            >
              <img
                src={player.photo}
                alt={player.name}
                className="w-full h-full rounded-full border-2 border-purple-500 object-cover shadow-lg"
              />
              <p className="text-xs sm:text-sm text-white font-semibold text-center mt-0.5 leading-none">
                {player.name}
              </p>
              <span className="text-xxs sm:text-xs font-bold text-yellow-300 text-center uppercase leading-none">
                {player.role}
              </span>
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 mt-4 text-green-300">Sostituti</h2>
      
      {/* Scroll orizzontale per i sostituti */}
      <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
        <div className="flex space-x-4 px-2"> {/* Aggiunto padding orizzontale per ScrollView */}
          {substitutes.map(player => (
            <div
              key={player.id}
              className="flex-shrink-0 w-28 h-auto bg-gray-800 rounded-lg shadow-lg p-3 flex flex-col items-center justify-center border border-green-700/30 transform hover:scale-105 transition-transform duration-200"
            >
              <img
                src={player.photo}
                alt={player.name}
                className="w-16 h-16 rounded-full mb-2 object-cover border-2 border-purple-500"
              />
              <p className="text-sm font-semibold text-center text-white leading-tight">{player.name}</p>
              <span className="text-xs font-bold text-yellow-300 text-center uppercase leading-tight">{player.role}</span>
            </div>
          ))}
          {substitutes.length === 0 && (
            <p className="text-gray-400 text-center w-full">Nessun sostituto disponibile.</p>
          )}
        </div>
      </div>

      <Button
        onClick={handleConfirmFormation}
        className="w-full max-w-sm bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-xl mt-8 mb-4 text-xl transition-colors duration-200"
      >
        Conferma Formazione
      </Button>
    </div>
  );
}

// Stili per la custom scrollbar (da aggiungere a src/app.css o global.css)
/*
.custom-scrollbar::-webkit-scrollbar {
  height: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #374151; // gray-700
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #4CAF50; // football-green o un verde simile
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #22c55e; // green-500
}
*/