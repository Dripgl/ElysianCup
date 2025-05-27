import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { app, auth } from '../lib/firebase';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

const db = getFirestore(app);

export default function AdminScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [tournamentData, setTournamentData] = useState({ name: '', maxTeams: '', type: 'Privato', password: '', field: '' });
  const router = useRouter();

  const handleCreateTournament = async () => {
    await addDoc(collection(db, 'tournaments'), tournamentData);
    alert('Torneo creato!');
    setModalVisible(false);
    setTournamentData({ name: '', maxTeams: '', type: 'Privato', password: '', field: '' });
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Admin Panel</Text>

      {/* Button per creare campionato */}
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>➕ Crea Campionato</Text>
      </TouchableOpacity>

      {/* Modal Creazione Campionato */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Crea Campionato</Text>
            <TextInput placeholder="Nome" style={styles.input} value={tournamentData.name} onChangeText={text => setTournamentData({ ...tournamentData, name: text })} />
            <TextInput placeholder="Max Squadre" style={styles.input} value={tournamentData.maxTeams} onChangeText={text => setTournamentData({ ...tournamentData, maxTeams: text })} />
            <TextInput placeholder="Privato o Pubblico" style={styles.input} value={tournamentData.type} onChangeText={text => setTournamentData({ ...tournamentData, type: text })} />
            <TextInput placeholder="Parola Chiave" style={styles.input} value={tournamentData.password} onChangeText={text => setTournamentData({ ...tournamentData, password: text })} />
            <TextInput placeholder="Campo di gioco" style={styles.input} value={tournamentData.field} onChangeText={text => setTournamentData({ ...tournamentData, field: text })} />
            <TouchableOpacity style={styles.modalButton} onPress={handleCreateTournament}>
              <Text style={styles.modalButtonText}>Crea</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      {/* Button per gestione iscrizioni utenti */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/manageUsers')}>
        <Text style={styles.buttonText}>👥 Gestione Iscrizioni Utenti</Text>
      </TouchableOpacity>

      {/* Button per gestione tornei e giocatori */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/manageTournaments')}>
        <Text style={styles.buttonText}>🏆 Gestione Tornei e Giocatori</Text>
      </TouchableOpacity>

      {/* Button per visualizzare partite di oggi */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/matchesToday')}>
        <Text style={styles.buttonText}>📅 Partite di Oggi</Text>
      </TouchableOpacity>

      {/* Button Logout */}
      <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={handleLogout}>
        <Text style={styles.buttonText}>🚪 Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f0f0', justifyContent: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#4B0082' },
  button: { backgroundColor: '#4B0082', padding: 15, borderRadius: 8, marginVertical: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '80%' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  input: { borderColor: '#ccc', borderWidth: 1, padding: 10, borderRadius: 8, marginBottom: 10 },
  modalButton: { backgroundColor: '#4B0082', padding: 10, borderRadius: 8, alignItems: 'center' },
  modalButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
