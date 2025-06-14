// TournamentsScreen.js
import React, { useEffect, useState } from 'react';
import {
  ScrollView, View, Text, StyleSheet, TouchableOpacity, FlatList,
  Modal, TextInput, TouchableWithoutFeedback, Keyboard,
  KeyboardAvoidingView, Platform, Alert,
  Animated,
  SafeAreaView,
  Button
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../FirebaseConfig';

// const publicTournaments = [
//   { id: '1', name: 'Torneo 1', date: '6/12' },
//   { id: '2', name: 'Torneo 2', date: '10/16' },
// ];

export default function TournamentsScreen() {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [teamModalVisible, setTeamModalVisible] = useState(false);
  const [joinModalVisible, setJoinModalVisible] = useState(false);
  const [privateTournaments, setPrivateTournaments] = useState([]);
  const [newTournament, setNewTournament] = useState({
    name: '', maxTeams: '', type: 'Privato', password: '', field: '',
  });
  const [joinPassword, setJoinPassword] = useState('');
  const [selectedTournamentId, setSelectedTournamentId] = useState<string | null>(null);
  const [newTeamName, setNewTeamName] = useState('');
  const [teams, setTeams] = useState<any[]>([]);

  useEffect(() => {
    const fetchTournaments = async () => {
      const snapshot = await getDocs(collection(db, 'tournaments'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPrivateTournaments(data);
    };
    fetchTournaments();
  }, []);

  const handleCreateTournament = async () => {
    if (!newTournament.name || !newTournament.maxTeams || (newTournament.type === 'Privato' && !newTournament.password) || !newTournament.field) {
      Alert.alert("Errore", "Compila tutti i campi obbligatori.");
      return;
    }
    const docRef = await addDoc(collection(db, 'tournaments'), newTournament);
    setPrivateTournaments([...privateTournaments, { ...newTournament, id: Date.now().toString() }]);
    setNewTournament({ name: '', maxTeams: '', type: 'Privato', password: '', field: '' });
    setCreateModalVisible(false);
    Alert.alert("Successo", "Campionato creato con successo!");
  };

  const handleDeleteTournament = async (id: string) => {
    await deleteDoc(doc(db, 'tournaments', id));
    setPrivateTournaments(privateTournaments.filter(item => item.id !== id));
  };

  const openTeamModal = async (tournamentId: string) => {
    setSelectedTournamentId(tournamentId);
    const teamsRef = collection(db, 'tournaments', tournamentId, 'teams');
    const snapshot = await getDocs(teamsRef);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTeams(data);
    setTeamModalVisible(true);
  };

  const handleJoinTournament = () => {
    console.log('Inserisci Parola Chiave:', joinPassword);
    setJoinModalVisible(false);
  };

  const addTeam = async () => {
    if (!newTeamName || !selectedTournamentId) return;
    const teamsRef = collection(db, 'tournaments', selectedTournamentId, 'teams');
    const docRef = await addDoc(teamsRef, { name: newTeamName });
    setTeams([...teams, { id: docRef.id, name: newTeamName }]);
    setNewTeamName('');
  };

  const deleteTeam = async (teamId: string) => {
    if (!selectedTournamentId) return;
    await deleteDoc(doc(db, 'tournaments', selectedTournamentId, 'teams', teamId));
    setTeams(teams.filter(team => team.id !== teamId));
    Alert.alert(
      'Conferma eliminazione',
      'Sei sicuro di voler eliminare questo campionato?',
      [
        {
          text: 'Annulla',
          style: 'cancel',
        },
        {
          text: 'Elimina',
          style: 'destructive',
          onPress: () => {
            setPrivateTournaments(privateTournaments.filter(item => item.id !== id));
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
      {privateTournaments.length > 0 && (
        <FlatList
          data={privateTournaments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.privateItem}>
              <Text style={styles.publicName}>{item.name}</Text>
              <View style={styles.rightSection}>
                <Text style={styles.publicDate}>{`${item.maxTeams} squadre`}</Text>
                <View style={styles.rightSection}>
                  <TouchableOpacity onPress={() => openTeamModal(item.id)}>
                    <Ionicons name="people" size={24} color="blue" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeleteTournament(item.id)}>
                    <Ionicons name="trash" size={24} color="gray" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      )}
      <View style={styles.publicSection}>
        <View style={styles.publicHeader}>
          <Text style={styles.sectionTitle}>Pubblici</Text>
          <TouchableOpacity style={styles.plusButton}>
            <Text style={styles.plusText}>+</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={publicTournaments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.publicItem}>
              <Text style={styles.publicName}>{item.name}</Text>
              <Text style={styles.publicDate}>{item.date}</Text>
            </View>
          )}
        />
      </View>
      <Modal visible={createModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => setCreateModalVisible(false)}>
            <View style={styles.modalBackground} />
          </TouchableWithoutFeedback>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Crea Campionato</Text>
              <TextInput placeholder="Nome campionato" style={styles.input} value={newTournament.name}
                onChangeText={(text) => setNewTournament({ ...newTournament, name: text })} />
              <TextInput placeholder="Numero massimo squadre" style={styles.input} keyboardType="numeric" value={newTournament.maxTeams}
                onChangeText={(text) => setNewTournament({ ...newTournament, maxTeams: text.replace(/[^0-9]/g, '') })} />
              <TextInput placeholder="Parola chiave" style={styles.input} editable={newTournament.type === 'Privato'}
                value={newTournament.password}
                onChangeText={(text) => setNewTournament({ ...newTournament, password: text })} />
              <TextInput placeholder="Campo di gioco" style={styles.input} value={newTournament.field}
                onChangeText={(text) => setNewTournament({ ...newTournament, field: text })} />
              <TouchableOpacity style={styles.modalButton} onPress={handleCreateTournament}>
                <Text style={styles.modalButtonText}>Crea</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
      <Modal visible={joinModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => setJoinModalVisible(false)}>
            <View style={styles.modalBackground} />
          </TouchableWithoutFeedback>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Partecipa al Campionato</Text>
              <TextInput placeholder="Inserisci parola chiave" style={styles.input} value={joinPassword}
                onChangeText={setJoinPassword} />
              <TouchableOpacity style={styles.modalButton} onPress={handleJoinTournament}>
                <Text style={styles.modalButtonText}>Partecipa</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  pageTitle: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  privateHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  buttonRow: { flexDirection: 'row' },
  smallButton: { backgroundColor: '#4B0082', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 8, marginLeft: 5 },
  buttonText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  privateSection: { paddingVertical: 20 },
  fixedSpace: { height: 40 },
  privateItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, backgroundColor: '#f0f0f0', borderRadius: 8, marginBottom: 5 },
  rightSection: { flexDirection: 'row', alignItems: 'center' },
  publicSection: { marginTop: 40 },
  publicHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  plusButton: { backgroundColor: '#4B0082', borderRadius: 20, width: 30, height: 30, alignItems: 'center', justifyContent: 'center' },
  plusText: { color: '#fff', fontSize: 20 },
  publicItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: '#f0f0f0', borderRadius: 8, marginBottom: 5 },
  publicName: { fontSize: 16, fontWeight: '500' },
  publicDate: { fontSize: 16, color: '#666', marginRight: 10 },
  trashIcon: { marginLeft: 5 },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  modalBackground: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '80%' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  input: { borderColor: '#ccc', borderWidth: 1, padding: 10, borderRadius: 8, marginBottom: 10 },
  modalButton: { backgroundColor: '#4B0082', padding: 10, borderRadius: 8, alignItems: 'center' },
  modalButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
