import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker'; // Questa importazione ora dovrebbe funzionare
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

// --- Definizione delle interfacce per i tipi di dati ---
interface Tournament {
  id: string;
  name: string;
  maxTeams: string; // O number, se lo gestisci come numero intero
  type: 'Pubblico' | 'Privato'; // Ho specificato i tipi possibili
  password?: string; // Opzionale per tornei pubblici
  field: string;
  date?: string; // <--- AGGIUNTO: Proprietà 'date' per risolvere l'errore TypeScript
  // Aggiungi qui altri campi che potrebbero venire dal backend (es. status, adminId, ecc.)
}

interface Team {
  id: string;
  name: string;
  // Aggiungi qui altri campi per una squadra (es. members, points, ecc.)
}
// ----------------------------------------------------

// Dati mock per i tornei pubblici (anche questi andranno nel backend)
const mockPublicTournaments: Tournament[] = [
  // Assicurati che i dati mock abbiano la proprietà 'date' se la usi
  { id: 'public-1', name: 'Torneo Estivo Padel', date: '01/07/2025', maxTeams: '16', type: 'Pubblico', field: 'Campo Centrale' },
  { id: 'public-2', name: 'Campionato Invernale Calcio', date: '15/11/2025', maxTeams: '32', type: 'Pubblico', field: 'Stadio Principale' },
];

export default function TournamentsScreen() {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [teamModalVisible, setTeamModalVisible] = useState(false);
  const [joinModalVisible, setJoinModalVisible] = useState(false);
  const [privateTournaments, setPrivateTournaments] = useState<Tournament[]>([]); // Tipizzato
  const [newTournament, setNewTournament] = useState<Omit<Tournament, 'id' | 'date'>>({ // Tipizzato, escludendo 'id' e 'date' iniziali
    name: '', maxTeams: '', type: 'Privato', password: '', field: '',
  });
  const [joinPassword, setJoinPassword] = useState('');
  const [selectedTournamentId, setSelectedTournamentId] = useState<string | null>(null);
  const [newTeamName, setNewTeamName] = useState('');
  const [teams, setTeams] = useState<Team[]>([]); // Tipizzato

  // useEffect per caricare i tornei privati dal backend
  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        // TODO: Chiamata al backend per ottenere i tornei privati
        // Esempio:
        // const response = await fetch('/api/tournaments/private');
        // if (response.ok) {
        //   const data: Tournament[] = await response.json();
        //   setPrivateTournaments(data);
        // } else {
        //   console.error('Errore nel recupero dei tornei privati:', response.status);
        // }

        // Dati mock per i tornei privati
        const mockPrivateTournaments: Tournament[] = [
          { id: 'priv-1', name: 'Torneo Amici di Stefania', maxTeams: '8', type: 'Privato', password: 'password123', field: 'Campo 1' },
          { id: 'priv-2', name: 'Campionato Ufficio', maxTeams: '4', type: 'Privato', password: 'securepass', field: 'Campo B' },
        ];
        setPrivateTournaments(mockPrivateTournaments);

      } catch (error) {
        console.error('Errore nel caricamento dei tornei privati (simulato):', error);
      }
    };
    fetchTournaments();
  }, []);

  const handleCreateTournament = async () => {
    // Validazione input
    if (!newTournament.name || !newTournament.maxTeams || (newTournament.type === 'Privato' && !newTournament.password) || !newTournament.field) {
      Alert.alert("Errore", "Compila tutti i campi obbligatori.");
      return;
    }

    try {
      // TODO: Chiamata POST al backend per creare un nuovo torneo
      // Esempio:
      // const response = await fetch('/api/tournaments', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(newTournament),
      // });
      // if (response.ok) {
      //   const createdTournament: Tournament = await response.json(); // Il backend dovrebbe restituire il torneo creato con l'ID
      //   setPrivateTournaments(prev => [...prev, createdTournament]);
      //   setNewTournament({ name: '', maxTeams: '', type: 'Privato', password: '', field: '' });
      //   setCreateModalVisible(false);
      //   Alert.alert("Successo", "Campionato creato con successo!");
      // } else {
      //   const errorData = await response.json();
      //   Alert.alert("Errore", errorData.message || "Errore nella creazione del campionato.");
      // }

      // Simulazione di successo con ID generato client-side
      const tempId = Date.now().toString(); // ID temporaneo
      // AGGIUNTO: Aggiungi una data ai tornei appena creati per coerenza se necessario
      const createdTournament: Tournament = { ...newTournament, id: tempId, date: new Date().toLocaleDateString('it-IT') };
      setPrivateTournaments(prev => [...prev, createdTournament]);
      setNewTournament({ name: '', maxTeams: '', type: 'Privato', password: '', field: '' });
      setCreateModalVisible(false);
      Alert.alert("Successo", "Campionato creato con successo!");

    } catch (error) {
      console.error('Errore nella creazione del torneo (simulato):', error);
      Alert.alert("Errore", "Si è verificato un problema nella creazione del campionato.");
    }
  };

  const handleDeleteTournament = async (id: string) => {
    Alert.alert(
      'Conferma eliminazione',
      'Sei sicuro di voler eliminare questo campionato?',
      [
        { text: 'Annulla', style: 'cancel' },
        {
          text: 'Elimina',
          style: 'destructive',
          onPress: async () => {
            try {
              // TODO: Chiamata DELETE al backend per eliminare il torneo
              // Esempio:
              // const response = await fetch(`/api/tournaments/${id}`, { method: 'DELETE' });
              // if (response.ok) {
              //   setPrivateTournaments(prev => prev.filter(item => item.id !== id));
              //   Alert.alert("Successo", "Campionato eliminato.");
              // } else {
              //   const errorData = await response.json();
              //   Alert.alert("Errore", errorData.message || "Errore nell'eliminazione del campionato.");
              // }

              // Simulazione di successo
              setPrivateTournaments(prev => prev.filter(item => item.id !== id));
              Alert.alert("Successo", "Campionato eliminato.");

            } catch (error) {
              console.error('Errore nell\'eliminazione del torneo (simulato):', error);
              Alert.alert("Errore", "Si è verificato un problema nell'eliminazione del campionato.");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const openTeamModal = async (tournamentId: string) => {
    setSelectedTournamentId(tournamentId);
    try {
      // TODO: Chiamata al backend per ottenere le squadre di un torneo specifico
      // Esempio:
      // const response = await fetch(`/api/tournaments/${tournamentId}/teams`);
      // if (response.ok) {
      //   const data: Team[] = await response.json();
      //   setTeams(data);
      // } else {
      //   console.error('Errore nel recupero delle squadre:', response.status);
      // }

      // Dati mock per le squadre di un torneo
      const mockTeams: Team[] = [
        { id: 'team-a', name: 'Squadra Alpha' },
        { id: 'team-b', name: 'Squadra Beta' },
      ];
      setTeams(mockTeams);

      setTeamModalVisible(true);
    } catch (error) {
      console.error('Errore nel caricamento delle squadre (simulato):', error);
      Alert.alert("Errore", "Non è stato possibile caricare le squadre.");
    }
  };

  const handleJoinTournament = async () => {
    // TODO: Chiamata POST al backend per partecipare a un torneo (es. inviando password e ID torneo)
    // Esempio:
    // try {
    //   const response = await fetch('/api/tournaments/join', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ password: joinPassword, tournamentId: selectedTournamentId }), // Potrebbe servire un tournamentId qui
    //   });
    //   if (response.ok) {
    //     Alert.alert("Successo", "Hai partecipato al campionato!");
    //     setJoinModalVisible(false);
    //     setJoinPassword('');
    //   } else {
    //     const errorData = await response.json();
    //     Alert.alert("Errore", errorData.message || "Impossibile partecipare al campionato.");
    //   }
    // } catch (error) {
    //   console.error('Errore nella partecipazione al torneo:', error);
    //   Alert.alert("Errore", "Si è verificato un problema nella partecipazione.");
    // }

    // Simulazione di successo
    console.log(`Simulazione partecipazione con parola chiave: ${joinPassword}`);
    Alert.alert("Successo", "Hai partecipato al campionato!");
    setJoinModalVisible(false);
    setJoinPassword('');
  };

  const addTeam = async () => {
    if (!newTeamName || !selectedTournamentId) {
      Alert.alert("Errore", "Inserisci il nome della squadra.");
      return;
    }
    try {
      // TODO: Chiamata POST al backend per aggiungere una squadra a un torneo
      // Esempio:
      // const response = await fetch(`/api/tournaments/${selectedTournamentId}/teams`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name: newTeamName }),
      // });
      // if (response.ok) {
      //   const createdTeam: Team = await response.json(); // Backend dovrebbe restituire la squadra creata con ID
      //   setTeams(prev => [...prev, createdTeam]);
      //   setNewTeamName('');
      // } else {
      //   const errorData = await response.json();
      //   Alert.alert("Errore", errorData.message || "Errore nell'aggiunta della squadra.");
      // }

      // Simulazione di successo
      const tempTeamId = Date.now().toString();
      const createdTeam: Team = { id: tempTeamId, name: newTeamName };
      setTeams(prev => [...prev, createdTeam]);
      setNewTeamName('');
      Alert.alert("Successo", "Squadra aggiunta!");
    } catch (error) {
      console.error('Errore nell\'aggiunta della squadra (simulato):', error);
      Alert.alert("Errore", "Si è verificato un problema nell'aggiunta della squadra.");
    }
  };

  const deleteTeam = async (teamId: string) => {
    if (!selectedTournamentId) return;

    Alert.alert(
      'Conferma eliminazione squadra', // Titolo più specifico
      'Sei sicuro di voler eliminare questa squadra?',
      [
        { text: 'Annulla', style: 'cancel' },
        {
          text: 'Elimina',
          style: 'destructive',
          onPress: async () => {
            try {
              // TODO: Chiamata DELETE al backend per eliminare una squadra
              // Esempio:
              // const response = await fetch(`/api/tournaments/${selectedTournamentId}/teams/${teamId}`, { method: 'DELETE' });
              // if (response.ok) {
              //   setTeams(prev => prev.filter(team => team.id !== teamId));
              //   Alert.alert("Successo", "Squadra eliminata.");
              // } else {
              //   const errorData = await response.json();
              //   Alert.alert("Errore", errorData.message || "Errore nell'eliminazione della squadra.");
              // }

              // Simulazione di successo
              setTeams(prev => prev.filter(team => team.id !== teamId));
              Alert.alert("Successo", "Squadra eliminata.");

            } catch (error) {
              console.error('Errore nell\'eliminazione della squadra (simulato):', error);
              Alert.alert("Errore", "Si è verificato un problema nell'eliminazione della squadra.");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>Campionati</Text>
      <View style={styles.privateHeader}>
        <Text style={styles.sectionTitle}>Privati</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.smallButton} onPress={() => setCreateModalVisible(true)}>
            <Text style={styles.buttonText}>Crea</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallButton} onPress={() => setJoinModalVisible(true)}>
            <Text style={styles.buttonText}>Partecipa</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.fixedSpace} />
      {privateTournaments.length > 0 ? ( // Condizione per mostrare la lista
        <FlatList
          data={privateTournaments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.privateItem}>
              <Text style={styles.tournamentName}>{item.name}</Text> {/* Stile più specifico */}
              <View style={styles.rightSection}>
                <Text style={styles.tournamentDetails}>{`${item.maxTeams} squadre - ${item.field}`}</Text> {/* Dettagli completi */}
                <TouchableOpacity onPress={() => openTeamModal(item.id)} style={styles.actionIcon}>
                  <Ionicons name="people" size={24} color="#4B0082" /> {/* Colore icona */}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteTournament(item.id)} style={styles.actionIcon}>
                  <Ionicons name="trash" size={24} color="#D32F2F" /> {/* Colore rosso per l'eliminazione */}
                </TouchableOpacity>
              </View>
            </View>
          )}
          scrollEnabled={false} // Disabilita lo scroll della FlatList
        />
      ) : (
        <Text style={styles.noTournamentsText}>Nessun campionato privato trovato. Creane uno!</Text>
      )}

      <View style={styles.publicSection}>
        <View style={styles.publicHeader}>
          <Text style={styles.sectionTitle}>Pubblici</Text>
          <TouchableOpacity style={styles.plusButton}>
            <Text style={styles.plusText}>+</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={mockPublicTournaments} // Ora usa i dati mock per i pubblici
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.publicItem}>
              {/* Assicurati che 'item.date' esista se lo stai mostrando qui */}
              <Text style={styles.tournamentName}>{item.name}</Text>
              <Text style={styles.tournamentDetails}>{item.date}</Text> {/* Mostra la data */}
              {/* TODO: Aggiungi un pulsante "Partecipa" per i tornei pubblici se necessario */}
            </View>
          )}
          scrollEnabled={false}
        />
      </View>

      {/* Modale Creazione Campionato */}
      <Modal visible={createModalVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.modalOverlay}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboardAvoidingView}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Crea Campionato</Text>
                <TextInput placeholder="Nome campionato" style={styles.input} value={newTournament.name}
                  onChangeText={(text) => setNewTournament({ ...newTournament, name: text })} />
                <TextInput placeholder="Numero massimo squadre" style={styles.input} keyboardType="numeric" value={newTournament.maxTeams}
                  onChangeText={(text) => setNewTournament({ ...newTournament, maxTeams: text.replace(/[^0-9]/g, '') })} />
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={newTournament.type}
                    onValueChange={(itemValue: 'Pubblico' | 'Privato') => setNewTournament({ ...newTournament, type: itemValue })}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                  >
                    <Picker.Item label="Privato" value="Privato" />
                    <Picker.Item label="Pubblico" value="Pubblico" />
                  </Picker>
                </View>
                {newTournament.type === 'Privato' && (
                  <TextInput placeholder="Parola chiave" style={styles.input} secureTextEntry={true} // Per nascondere la password
                    value={newTournament.password}
                    onChangeText={(text) => setNewTournament({ ...newTournament, password: text })} />
                )}
                <TextInput placeholder="Campo di gioco" style={styles.input} value={newTournament.field}
                  onChangeText={(text) => setNewTournament({ ...newTournament, field: text })} />
                <TouchableOpacity style={styles.modalButton} onPress={handleCreateTournament}>
                  <Text style={styles.modalButtonText}>Crea</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButton, styles.modalCloseButton]} onPress={() => setCreateModalVisible(false)}>
                  <Text style={styles.modalButtonText}>Annulla</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Modale Partecipa al Campionato */}
      <Modal visible={joinModalVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.modalOverlay}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboardAvoidingView}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Partecipa al Campionato</Text>
                <TextInput placeholder="Inserisci parola chiave" style={styles.input} value={joinPassword}
                  onChangeText={setJoinPassword} secureTextEntry={true} /> {/* Per nascondere la password */}
                <TouchableOpacity style={styles.modalButton} onPress={handleJoinTournament}>
                  <Text style={styles.modalButtonText}>Partecipa</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButton, styles.modalCloseButton]} onPress={() => setJoinModalVisible(false)}>
                  <Text style={styles.modalButtonText}>Annulla</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Modale Gestione Squadre del Torneo */}
      <Modal visible={teamModalVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.modalOverlay}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboardAvoidingView}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Squadre del Campionato</Text>
                <TextInput
                  placeholder="Nome nuova squadra"
                  style={styles.input}
                  value={newTeamName}
                  onChangeText={setNewTeamName}
                />
                <TouchableOpacity style={styles.modalButton} onPress={addTeam}>
                  <Text style={styles.modalButtonText}>Aggiungi Squadra</Text>
                </TouchableOpacity>
                <FlatList
                  data={teams}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <View style={styles.teamListItem}>
                      <Text style={styles.teamListName}>{item.name}</Text>
                      <TouchableOpacity onPress={() => deleteTeam(item.id)}>
                        <Ionicons name="trash" size={20} color="#D32F2F" />
                      </TouchableOpacity>
                    </View>
                  )}
                  style={styles.teamList}
                  scrollEnabled={false} // Disabilita lo scroll della FlatList
                />
                <TouchableOpacity style={[styles.modalButton, styles.modalCloseButton]} onPress={() => setTeamModalVisible(false)}>
                  <Text style={styles.modalButtonText}>Chiudi</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f0f0' }, // Sfondo più chiaro
  pageTitle: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#333' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#4B0082' }, // Viola scuro
  privateHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  buttonRow: { flexDirection: 'row' },
  smallButton: { backgroundColor: '#4B0082', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 8, marginLeft: 10 }, // Aumentato padding
  buttonText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  fixedSpace: { height: 20 }, // Spazio ridotto
  privateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff', // Sfondo bianco
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  rightSection: { flexDirection: 'row', alignItems: 'center' },
  actionIcon: { marginLeft: 10 }, // Spazio tra le icone
  publicSection: { marginTop: 30 }, // Spazio leggermente ridotto
  publicHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  plusButton: { backgroundColor: '#4B0082', borderRadius: 20, width: 35, height: 35, alignItems: 'center', justifyContent: 'center' }, // Dimensioni leggermente aumentate
  plusText: { color: '#fff', fontSize: 24, lineHeight: 28 }, // Adattato il line-height
  publicItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  tournamentName: { fontSize: 16, fontWeight: 'bold', color: '#333' }, // Stile più leggibile
  tournamentDetails: { fontSize: 14, color: '#666', marginRight: 10 },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  keyboardAvoidingView: { width: '100%', alignItems: 'center' }, // Centra il contenuto del modale
  modalContent: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 15,
    width: '90%', // Larghezza leggermente maggiore per modali
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  modalTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
  input: {
    borderColor: '#ddd', // Colore bordo più tenue
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f9f9f9', // Sfondo leggermente grigio
  },
  pickerContainer: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden', // Per contenere il picker
  },
  picker: {
    height: 50,
    width: '100%',
  },
  pickerItem: {
    height: 50,
    fontSize: 16,
    color: '#333'
  },
  modalButton: { backgroundColor: '#4B0082', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 10 }, // Padding e margine top
  modalCloseButton: { backgroundColor: '#777', marginTop: 10 }, // Nuovo pulsante per chiudere i modali
  modalButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  teamListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  teamListName: { fontSize: 16, color: '#333' },
  teamList: { maxHeight: 200, marginBottom: 10 }, // Limita l'altezza della lista delle squadre nel modale
  noTournamentsText: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 20 },
});