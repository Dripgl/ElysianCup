import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput, Pressable, ScrollView } from 'react-native';

const publicTournaments = [
  { id: '1', name: 'Torneo 1', date: '6/12' },
  { id: '2', name: 'Torneo 2', date: '10/16' },
];

export default function TournamentsScreen() {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [joinModalVisible, setJoinModalVisible] = useState(false);

  const [newTournament, setNewTournament] = useState({
    name: '',
    maxTeams: '',
    type: 'Privato',
    password: '',
    field: '',
  });

  const [joinPassword, setJoinPassword] = useState('');

  const handleCreateTournament = () => {
    console.log('Creating tournament:', newTournament);
    setCreateModalVisible(false);
    // In futuro: invia dati a Firestore
  };

  const handleJoinTournament = () => {
    console.log('Joining with password:', joinPassword);
    setJoinModalVisible(false);
    // In futuro: controlla Firestore
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Campionati</Text>

      {/* Sezione Privati in alto */}
      <View style={styles.privateSection}>
        <Text style={styles.sectionTitle}>Privati</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={() => setCreateModalVisible(true)}>
            <Text style={styles.buttonText}>Crea</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setJoinModalVisible(true)}>
            <Text style={styles.buttonText}>Partecipa</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Sezione Pubblici a metà pagina */}
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

      {/* Modal Crea */}
      <Modal visible={createModalVisible} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setCreateModalVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Crea Campionato</Text>
            <TextInput
              placeholder="Nome campionato"
              style={styles.input}
              value={newTournament.name}
              onChangeText={(text) => setNewTournament({ ...newTournament, name: text })}
            />
            <TextInput
              placeholder="Numero massimo squadre"
              style={styles.input}
              keyboardType="numeric"
              value={newTournament.maxTeams}
              onChangeText={(text) => setNewTournament({ ...newTournament, maxTeams: text })}
            />
            <TextInput
              placeholder="Privato o Pubblico"
              style={styles.input}
              value={newTournament.type}
              onChangeText={(text) => setNewTournament({ ...newTournament, type: text })}
            />
            <TextInput
              placeholder="Parola chiave"
              style={styles.input}
              value={newTournament.password}
              onChangeText={(text) => setNewTournament({ ...newTournament, password: text })}
            />
            <TextInput
              placeholder="Campo di gioco"
              style={styles.input}
              value={newTournament.field}
              onChangeText={(text) => setNewTournament({ ...newTournament, field: text })}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleCreateTournament}>
              <Text style={styles.modalButtonText}>Crea</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      {/* Modal Partecipa */}
      <Modal visible={joinModalVisible} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setJoinModalVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Partecipa al Campionato</Text>
            <TextInput
              placeholder="Inserisci parola chiave"
              style={styles.input}
              value={joinPassword}
              onChangeText={setJoinPassword}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleJoinTournament}>
              <Text style={styles.modalButtonText}>Partecipa</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  pageTitle: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  privateSection: { paddingVertical: 20 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around' },
  button: { backgroundColor: '#4B0082', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  publicSection: { flex: 1, justifyContent: 'flex-start', marginTop: 40 },
  publicHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  plusButton: { backgroundColor: '#4B0082', borderRadius: 20, width: 30, height: 30, alignItems: 'center', justifyContent: 'center' },
  plusText: { color: '#fff', fontSize: 20 },
  publicItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: '#f0f0f0', borderRadius: 8, marginBottom: 5 },
  publicName: { fontSize: 16, fontWeight: '500' },
  publicDate: { fontSize: 16, color: '#666' },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '80%' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  input: { borderColor: '#ccc', borderWidth: 1, padding: 10, borderRadius: 8, marginBottom: 10 },
  modalButton: { backgroundColor: '#4B0082', padding: 10, borderRadius: 8, alignItems: 'center' },
  modalButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
