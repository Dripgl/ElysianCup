import React, { useEffect, useState } from 'react'; // Aggiunto useEffect
import { Animated, Dimensions, FlatList, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

const backgroundImage = require('../assets/images/BkCamp.png');

// --- Definizione delle interfacce per i tipi di dati ---
interface Player {
  id: string;
  name: string;
  x: number; // Posizione percentuale X sul campo
  y: number; // Posizione percentuale Y sul campo
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
    { id: '1', name: 'Manuel', x: 50, y: 10, role: 'POR', photo: 'https://via.placeholder.com/50' },
    { id: '2', name: 'Virgil', x: 50, y: 25, role: 'DC', photo: 'https://via.placeholder.com/50' },
    { id: '3', name: 'Luka', x: 30, y: 41, role: 'CC', photo: 'https://via.placeholder.com/50' },
    { id: '4', name: 'Kylian', x: 42, y: 41, role: 'CC', photo: 'https://via.placeholder.com/50' },
    { id: '5', name: 'Cristiano', x: 55, y: 41, role: 'CC', photo: 'https://via.placeholder.com/50' },
    { id: '6', name: 'Leo', x: 68, y: 41, role: 'CC', photo: 'https://via.placeholder.com/50' },
    { id: '7', name: 'Neymar', x: 50, y: 58, role: 'ATT', photo: 'https://via.placeholder.com/50' },
  ],
  '2-3-1': [
    { id: '1', name: 'Manuel', x: 50, y: 10, role: 'POR', photo: 'https://via.placeholder.com/50' },
    { id: '2', name: 'Virgil', x: 35, y: 25, role: 'DC', photo: 'https://via.placeholder.com/50' },
    { id: '3', name: 'Luka', x: 65, y: 25, role: 'DC', photo: 'https://via.placeholder.com/50' },
    { id: '4', name: 'Cristiano', x: 33, y: 41, role: 'CC', photo: 'https://via.placeholder.com/50' },
    { id: '5', name: 'Kylian', x: 50, y: 41, role: 'CC', photo: 'https://via.placeholder.com/50' },
    { id: '6', name: 'Neymar', x: 67, y: 41, role: 'CC', photo: 'https://via.placeholder.com/50' },
    { id: '7', name: 'Leo', x: 50, y: 58, role: 'ATT', photo: 'https://via.placeholder.com/50' },
  ],
  '3-1-2': [
    { id: '1', name: 'Manuel', x: 50, y: 10, role: 'POR', photo: 'https://via.placeholder.com/50' },
    { id: '2', name: 'Virgil', x: 25, y: 30, role: 'DC', photo: 'https://via.placeholder.com/50' },
    { id: '3', name: 'Luka', x: 50, y: 30, role: 'DC', photo: 'https://via.placeholder.com/50' },
    { id: '4', name: 'Cristiano', x: 75, y: 30, role: 'DC', photo: 'https://via.placeholder.com/50' },
    { id: '5', name: 'Neymar', x: 50, y: 60, role: 'CC', photo: 'https://via.placeholder.com/50' },
    { id: '6', name: 'Leo', x: 35, y: 85, role: 'ATT', photo: 'https://via.placeholder.com/50' },
    { id: '7', name: 'Kylian', x: 65, y: 85, role: 'ATT', photo: 'https://via.placeholder.com/50' },
  ]
};

export default function TeamScreen() { // Rinominato da FormationScreen a TeamScreen per coerenza col nome del file
  const [formation, setFormation] = useState<keyof typeof initialPlayersByFormation>('1-4-1'); // Tipizzato formation
  const [modalVisible, setModalVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1));
  const dynamicSize = Math.min(width, height) * 0.1;
  const [availableFormations, setAvailableFormations] = useState<string[]>(Object.keys(initialPlayersByFormation)); // Stato per le formazioni disponibili
  const [teamPlayers, setTeamPlayers] = useState<FormationData>(initialPlayersByFormation); // Stato per i dati dei giocatori

  // Carica le formazioni e i giocatori dal backend all'inizio
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        // TODO: Fai una chiamata al tuo backend per ottenere le formazioni disponibili
        // e i dettagli dei giocatori per ogni formazione.
        // Esempio:
        // const formationsResponse = await fetch('/api/formations');
        // if (formationsResponse.ok) {
        //   const data: FormationData = await formationsResponse.json();
        //   setTeamPlayers(data);
        //   setAvailableFormations(Object.keys(data));
        //   // Assicurati che la formazione iniziale esista nei dati caricati
        //   if (data['1-4-1']) {
        //     setFormation('1-4-1');
        //   } else if (Object.keys(data).length > 0) {
        //     setFormation(Object.keys(data)[0] as keyof typeof data);
        //   }
        // } else {
        //   console.error('Errore nel recupero delle formazioni:', formationsResponse.status);
        // }

        // Per ora, useremo i dati mockati iniziali
        setTeamPlayers(initialPlayersByFormation);
        setAvailableFormations(Object.keys(initialPlayersByFormation));

      } catch (error) {
        console.error('Errore nel caricamento dei dati del team (simulato):', error);
      }
    };

    fetchTeamData();
  }, []);

  const currentPlayers = teamPlayers[formation] || [];

  const animatePlayers = (newFormationKey: keyof typeof initialPlayersByFormation) => { // Tipizzato l'argomento
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setFormation(newFormationKey);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleConfirmFormation = async () => {
    // TODO: Fai una chiamata POST al tuo backend per salvare la formazione attuale.
    // Invierai la `formation` selezionata e, se necessario, l'ID della squadra o dell'utente.
    // Esempio:
    // try {
    //   const response = await fetch('/api/saveFormation', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       // 'Authorization': `Bearer ${tuoTokenUtente}` // Se usi autenticazione
    //     },
    //     body: JSON.stringify({ formation: formation, players: currentPlayers }),
    //   });
    //   if (response.ok) {
    //     Alert.alert('Successo', 'Formazione salvata con successo!');
    //   } else {
    //     const errorData = await response.json();
    //     Alert.alert('Errore', errorData.message || 'Errore nel salvare la formazione.');
    //   }
    // } catch (error) {
    //   console.error('Errore nel salvataggio formazione:', error);
    //   Alert.alert('Errore', 'Si è verificato un problema nel salvare la formazione.');
    // }
    console.log(`Simulazione salvataggio formazione: ${formation}`);
    alert(`Formazione "${formation}" confermata (simulato)!`);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>I Tuoi Gladiatori</Text>
        <Text style={styles.currentFormationDisplay}>Formazione attuale: {formation}</Text>
        <View style={styles.header}>
          <TouchableOpacity style={styles.dropdownButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.dropdownButtonText}>Scegli Formazione: {formation}</Text>
          </TouchableOpacity>
        </View>

        <Modal visible={modalVisible} transparent={true} animationType="fade">
          <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
            <View style={styles.modalContent}>
              {availableFormations.filter(f => f !== formation).map(f => (
                <TouchableOpacity key={f} onPress={() => { setModalVisible(false); animatePlayers(f as keyof typeof initialPlayersByFormation); }}>
                  <Text style={styles.modalItem}>{f}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Pressable>
        </Modal>

        <View style={styles.fieldBackgroundContainer}>
          <Image source={backgroundImage} style={styles.fieldBackgroundImage} resizeMode='contain' />
          <Animated.View style={[styles.fieldOverlay, { opacity: fadeAnim }]}>
            {currentPlayers.map(player => (
              <View
                key={player.id}
                style={[
                  styles.playerContainer,
                  {
                    position: 'absolute',
                    left: `${player.x}%`,
                    top: `${player.y}%`,
                    transform: [{ translateX: -dynamicSize / 2 }, { translateY: -dynamicSize / 2 }],
                    width: dynamicSize,
                    height: dynamicSize,
                  }
                ]}
              >
                <Image source={{ uri: player.photo }} style={styles.photo} />
                <Text style={styles.playerName}>{player.name}</Text>
                <Text style={styles.roleAcronym}>{player.role}</Text>
              </View>
            ))}
          </Animated.View>
        </View>

        <Text style={styles.substitutesTitle}>Sostituti</Text>
        {/* Assumiamo che i sostituti siano gli altri giocatori non in campo,
            o un elenco separato dal backend. Qui usiamo un esempio di slice. */}
        <FlatList
          horizontal
          data={Object.values(teamPlayers).flat().filter(p => !currentPlayers.some(cp => cp.id === p.id))} // Mostra tutti i giocatori non nella formazione attuale
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.subCard}>
              <Image source={{ uri: item.photo }} style={styles.subPhoto} />
              <Text style={styles.subName}>{item.name}</Text>
              <Text style={styles.roleAcronym}>{item.role}</Text>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
        />

        <TouchableOpacity style={styles.button} onPress={handleConfirmFormation}>
          <Text style={styles.buttonText}>Conferma Formazione</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, backgroundColor: '#f0f0f0' }, // Aggiunto colore di sfondo
  container: { flex: 1, padding: 20, backgroundColor: '#f0f0f0' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, color: '#333' },
  currentFormationDisplay: { fontSize: 18, textAlign: 'center', marginBottom: 10, color: '#555' }, // Nuovo stile per la formazione attuale
  header: { flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 10 },
  dropdownButton: { backgroundColor: '#4B0082', padding: 10, borderRadius: 8 },
  dropdownButtonText: { color: '#fff', fontWeight: 'bold' },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10 },
  modalItem: { padding: 10, fontSize: 16, color: '#333' },
  fieldBackgroundContainer: {
    width: '100%',
    aspectRatio: 4 / 5,
    marginBottom: 20,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    overflow: 'hidden'
  },
  fieldBackgroundImage: { position: 'absolute', width: '100%', height: '100%', borderRadius: 20 },
  fieldOverlay: { flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' },
  playerContainer: { alignItems: 'center', justifyContent: 'center' }, // Centra il contenuto del giocatore
  photo: { width: '100%', height: '100%', borderRadius: 25, borderWidth: 2, borderColor: '#4B0082' }, // Aggiunto bordo
  playerName: { fontSize: 12, textAlign: 'center', color: '#fff', marginTop: 2, textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 5 }, // Colore testo per leggibilità
  roleAcronym: { fontSize: 10, textAlign: 'center', fontWeight: 'bold', color: '#eee', textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 5 }, // Colore testo per leggibilità
  substitutesTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, marginTop: 20, color: '#333' },
  button: { backgroundColor: '#4B0082', padding: 12, borderRadius: 8, marginTop: 20, alignItems: 'center' }, // Aumentato marginTop
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  subCard: { backgroundColor: '#fff', padding: 10, borderRadius: 8, alignItems: 'center', marginRight: 10, width: 90, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 3 }, // Migliorata estetica della card
  subPhoto: { width: 60, height: 60, borderRadius: 30, marginBottom: 5, borderWidth: 1, borderColor: '#ddd' },
  subName: { fontSize: 14, fontWeight: '500', textAlign: 'center', color: '#333' },
});