// src/components/TournamentScreen.tsx
import { useEffect, useState } from 'react';
import { IoPeopleOutline, IoTrashOutline } from 'react-icons/io5'; // Icone da React Icons

// --- Definizione delle interfacce per i tipi di dati ---
interface Tournament {
  id: string;
  name: string;
  maxTeams: string;
  type: 'Pubblico' | 'Privato';
  password?: string;
  field: string;
  date?: string;
}

interface Team {
  id: string;
  name: string;
}
// ----------------------------------------------------

const mockPublicTournaments: Tournament[] = [
  { id: 'public-1', name: 'Torneo Estivo Padel', date: '01/07/2025', maxTeams: '16', type: 'Pubblico', field: 'Campo Centrale' },
  { id: 'public-2', name: 'Campionato Invernale Calcio', date: '15/11/2025', maxTeams: '32', type: 'Pubblico', field: 'Stadio Principale' },
];

export default function TournamentsScreen() {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [teamModalVisible, setTeamModalVisible] = useState(false);
  const [joinModalVisible, setJoinModalVisible] = useState(false);
  const [privateTournaments, setPrivateTournaments] = useState<Tournament[]>([]);
  const [newTournament, setNewTournament] = useState<Omit<Tournament, 'id' | 'date'>>({
    name: '', maxTeams: '', type: 'Privato', password: '', field: '',
  });
  const [joinPassword, setJoinPassword] = useState('');
  const [selectedTournamentId, setSelectedTournamentId] = useState<string | null>(null);
  const [newTeamName, setNewTeamName] = useState('');
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const mockPrivateTournaments: Tournament[] = [
          { id: 'priv-1', name: 'Torneo Amici di Stefania', maxTeams: '8', type: 'Privato', password: 'password123', field: 'Campo 1', date: '10/08/2025' },
          { id: 'priv-2', name: 'Campionato Ufficio', maxTeams: '4', type: 'Privato', password: 'securepass', field: 'Campo B', date: '20/09/2025' },
        ];
        setPrivateTournaments(mockPrivateTournaments);
      } catch (error) {
        console.error('Errore nel caricamento dei tornei privati (simulato):', error);
      }
    };
    fetchTournaments();
  }, []);

  const handleCreateTournament = async () => {
    if (!newTournament.name || !newTournament.maxTeams || (newTournament.type === 'Privato' && !newTournament.password) || !newTournament.field) {
      alert("Errore: Compila tutti i campi obbligatori.");
      return;
    }

    try {
      const tempId = Date.now().toString();
      const createdTournament: Tournament = { ...newTournament, id: tempId, date: new Date().toLocaleDateString('it-IT') };
      setPrivateTournaments(prev => [...prev, createdTournament]);
      setNewTournament({ name: '', maxTeams: '', type: 'Privato', password: '', field: '' });
      setCreateModalVisible(false);
      alert("Successo: Campionato creato con successo!");
    } catch (error) {
      console.error('Errore nella creazione del torneo (simulato):', error);
      alert("Errore: Si è verificato un problema nella creazione del campionato.");
    }
  };

  const handleDeleteTournament = async (id: string) => {
    if (window.confirm('Sei sicuro di voler eliminare questo campionato?')) {
      try {
        setPrivateTournaments(prev => prev.filter(item => item.id !== id));
        alert("Successo: Campionato eliminato.");
      } catch (error) {
        console.error('Errore nell\'eliminazione del torneo (simulato):', error);
        alert("Errore: Si è verificato un problema nell'eliminazione del campionato.");
      }
    }
  };

  const openTeamModal = async (tournamentId: string) => {
    setSelectedTournamentId(tournamentId);
    try {
      const mockTeams: Team[] = [
        { id: 'team-a', name: 'Squadra Alpha' },
        { id: 'team-b', name: 'Squadra Beta' },
      ];
      setTeams(mockTeams);
      setTeamModalVisible(true);
    } catch (error) {
      console.error('Errore nel caricamento delle squadre (simulato):', error);
      alert("Errore: Non è stato possibile caricare le squadre.");
    }
  };

  const handleJoinTournament = async () => {
    console.log(`Simulazione partecipazione con parola chiave: ${joinPassword}`);
    alert("Successo: Hai partecipato al campionato!");
    setJoinModalVisible(false);
    setJoinPassword('');
  };

  const addTeam = async () => {
    if (!newTeamName || !selectedTournamentId) {
      alert("Errore: Inserisci il nome della squadra.");
      return;
    }
    try {
      const tempTeamId = Date.now().toString();
      const createdTeam: Team = { id: tempTeamId, name: newTeamName };
      setTeams(prev => [...prev, createdTeam]);
      setNewTeamName('');
      alert("Successo: Squadra aggiunta!");
    } catch (error) {
      console.error('Errore nell\'aggiunta della squadra (simulato):', error);
      alert("Errore: Si è verificato un problema nell'aggiunta della squadra.");
    }
  };

  const deleteTeam = async (teamId: string) => {
    if (!selectedTournamentId) return;

    if (window.confirm('Sei sicuro di voler eliminare questa squadra?')) {
      try {
        setTeams(prev => prev.filter(team => team.id !== teamId));
        alert("Successo: Squadra eliminata.");
      } catch (error) {
        console.error('Errore nell\'eliminazione della squadra (simulato):', error);
        alert("Errore: Si è verificato un problema nell'eliminazione della squadra.");
      }
    }
  };

  return (
    <div className="min-h-screen p-5 bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-5 text-gray-800">Campionati</h1>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-purple-800">Privati</h2>
        <div className="flex space-x-2">
          <button
            className="bg-purple-800 text-white py-2 px-4 rounded-lg text-sm font-bold shadow-md hover:bg-purple-700 transition-colors"
            onClick={() => setCreateModalVisible(true)}
          >
            Crea
          </button>
          <button
            className="bg-purple-800 text-white py-2 px-4 rounded-lg text-sm font-bold shadow-md hover:bg-purple-700 transition-colors"
            onClick={() => setJoinModalVisible(true)}
          >
            Partecipa
          </button>
        </div>
      </div>
      <div className="h-5" /> {/* Spazio fisso */}

      {privateTournaments.length > 0 ? (
        <div className="space-y-3">
          {privateTournaments.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md">
              <span className="text-base font-bold text-gray-800">{item.name}</span>
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">{`${item.maxTeams} squadre - ${item.field}`}</span>
                <button onClick={() => openTeamModal(item.id)} className="ml-2 p-1 rounded-full hover:bg-gray-100 transition-colors">
                  <IoPeopleOutline size={24} color="#4B0082" />
                </button>
                <button onClick={() => handleDeleteTournament(item.id)} className="ml-2 p-1 rounded-full hover:bg-gray-100 transition-colors">
                  <IoTrashOutline size={24} color="#D32F2F" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <span className="block text-base text-gray-600 text-center mt-5">Nessun campionato privato trovato. Creane uno!</span>
      )}

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-purple-800">Pubblici</h2>
          <button className="bg-purple-800 text-white rounded-full w-9 h-9 flex items-center justify-center text-2xl font-bold shadow-md hover:bg-purple-700 transition-colors">
            +
          </button>
        </div>
        <div className="space-y-3">
          {mockPublicTournaments.map((item) => (
            <div key={item.id} className="flex justify-between p-4 bg-white rounded-xl shadow-md">
              <span className="text-base font-bold text-gray-800">{item.name}</span>
              <span className="text-sm text-gray-600">{item.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Modale Creazione Campionato */}
      {createModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setCreateModalVisible(false)}>
          <div className="bg-white p-6 rounded-xl shadow-lg w-11/12 max-w-lg relative z-50" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-5 text-center text-gray-800">Crea Campionato</h3>
            <input
              type="text"
              placeholder="Nome campionato"
              className="w-full border border-gray-300 p-3 rounded-lg mb-4 text-base text-gray-700 bg-gray-50 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none"
              value={newTournament.name}
              onChange={(e) => setNewTournament({ ...newTournament, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Numero massimo squadre"
              className="w-full border border-gray-300 p-3 rounded-lg mb-4 text-base text-gray-700 bg-gray-50 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none"
              value={newTournament.maxTeams}
              onChange={(e) => setNewTournament({ ...newTournament, maxTeams: e.target.value.replace(/[^0-9]/g, '') })}
            />
            <div className="relative w-full mb-4">
              <select
                className="w-full border border-gray-300 p-3 rounded-lg text-base text-gray-700 bg-gray-50 appearance-none pr-10 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none"
                value={newTournament.type}
                onChange={(e) => setNewTournament({ ...newTournament, type: e.target.value as 'Pubblico' | 'Privato' })}
              >
                <option value="Privato">Privato</option>
                <option value="Pubblico">Pubblico</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/></svg>
              </div>
            </div>
            {newTournament.type === 'Privato' && (
              <input
                type="password"
                placeholder="Parola chiave"
                className="w-full border border-gray-300 p-3 rounded-lg mb-4 text-base text-gray-700 bg-gray-50 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none"
                value={newTournament.password}
                onChange={(e) => setNewTournament({ ...newTournament, password: e.target.value })}
              />
            )}
            <input
              type="text"
              placeholder="Campo di gioco"
              className="w-full border border-gray-300 p-3 rounded-lg mb-4 text-base text-gray-700 bg-gray-50 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none"
              value={newTournament.field}
              onChange={(e) => setNewTournament({ ...newTournament, field: e.target.value })}
            />
            <button
              className="bg-purple-800 text-white py-3 rounded-lg w-full font-bold shadow-md hover:bg-purple-700 transition-colors mt-2"
              onClick={handleCreateTournament}
            >
              Crea
            </button>
            <button
              className="bg-gray-600 text-white py-3 rounded-lg w-full font-bold shadow-md hover:bg-gray-500 transition-colors mt-2"
              onClick={() => setCreateModalVisible(false)}
            >
              Annulla
            </button>
          </div>
        </div>
      )}

      {/* Modale Partecipa al Campionato */}
      {joinModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setJoinModalVisible(false)}>
          <div className="bg-white p-6 rounded-xl shadow-lg w-11/12 max-w-lg relative z-50" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-5 text-center text-gray-800">Partecipa al Campionato</h3>
            <input
              type="password"
              placeholder="Inserisci parola chiave"
              className="w-full border border-gray-300 p-3 rounded-lg mb-4 text-base text-gray-700 bg-gray-50 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none"
              value={joinPassword}
              onChange={(e) => setJoinPassword(e.target.value)}
            />
            <button
              className="bg-purple-800 text-white py-3 rounded-lg w-full font-bold shadow-md hover:bg-purple-700 transition-colors mt-2"
              onClick={handleJoinTournament}
            >
              Partecipa
            </button>
            <button
              className="bg-gray-600 text-white py-3 rounded-lg w-full font-bold shadow-md hover:bg-gray-500 transition-colors mt-2"
              onClick={() => setJoinModalVisible(false)}
            >
              Annulla
            </button>
          </div>
        </div>
      )}

      {/* Modale Gestione Squadre del Torneo */}
      {teamModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setTeamModalVisible(false)}>
          <div className="bg-white p-6 rounded-xl shadow-lg w-11/12 max-w-lg relative z-50" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-5 text-center text-gray-800">Squadre del Campionato</h3>
            <input
              type="text"
              placeholder="Nome nuova squadra"
              className="w-full border border-gray-300 p-3 rounded-lg mb-4 text-base text-gray-700 bg-gray-50 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
            />
            <button
              className="bg-purple-800 text-white py-3 rounded-lg w-full font-bold shadow-md hover:bg-purple-700 transition-colors mb-4"
              onClick={addTeam}
            >
              Aggiungi Squadra
            </button>
            <div className="max-h-52 overflow-y-auto pr-1 mb-4"> {/* max-h-52 = 208px */}
              {teams.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                  <span className="text-base text-gray-700">{item.name}</span>
                  <button onClick={() => deleteTeam(item.id)} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                    <IoTrashOutline size={20} color="#D32F2F" />
                  </button>
                </div>
              ))}
            </div>
            <button
              className="bg-gray-600 text-white py-3 rounded-lg w-full font-bold shadow-md hover:bg-gray-500 transition-colors mt-2"
              onClick={() => setTeamModalVisible(false)}
            >
              Chiudi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}