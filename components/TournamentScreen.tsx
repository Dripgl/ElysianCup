// TournamentsScreen.js
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList,
  Modal, TextInput, TouchableWithoutFeedback, Keyboard,
  KeyboardAvoidingView, Platform, Alert, Picker
} from 'react-native';

const publicTournaments = [
  { id: '1', name: 'Torneo 1', date: '6/12' },
  { id: '2', name: 'Torneo 2', date: '10/16' },
];

export default function TournamentsScreen() {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [joinModalVisible, setJoinModalVisible] = useState(false);
  const [privateTournaments, setPrivateTournaments] = useState([]);
  const [newTournament, setNewTournament] = useState({
    name: '', maxTeams: '', type: 'Privato', password: '', field: '',
  });
  const [joinPassword, setJoinPassword] = useState('');

  const handleCreateTournament = () => {
    if (!newTournament.name || !newTournament.maxTeams || (newTournament.type === 'Privato' && !newTournament.password) || !newTournament.field) {
      Alert.alert("Errore", "Compila tutti i campi obbligatori.");
      return;
    }
    setPrivateTournaments([...privateTournaments, { ...newTournament, id: Date.now().toString() }]);
    setNewTournament({ name: '', maxTeams: '', type: 'Privato', password: '', field: '' });
    setCreateModalVisible(false);
    Alert.alert("Successo", "Campionato creato con successo!");
  };

  const handleJoinTournament = () => {
    console.log('Joining with password:', joinPassword);
    setJoinModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Campionati</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.smallButton} onPress={() => setCreateModalVisible(true)}>
          <Text style={styles.buttonText}>Crea</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.smallButton} onPress={() => setJoinModalVisible(true)}>
          <Text style={styles.buttonText}>Partecipa</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.privateSection}>
        <Text style={styles.sectionTitle}>Privati</Text>
        {privateTournaments.length > 0 && (
          <FlatList
            data={privateTournaments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.publicItem}>
                <Text style={styles.publicName}>{item.name}</Text>
                <Text style={styles.publicDate}>{`${item.maxTeams} squadre`}</Text>
              </View>
            )}
          />
        )}
      </View>

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
              <Picker
                selectedValue={newTournament.type}
                style={styles.input}
                onValueChange={(itemValue) => setNewTournament({ ...newTournament, type: itemValue, password: itemValue === 'Pubblico' ? '' : newTournament.password })}
              >
                <Picker.Item label="Privato" value="Privato" />
                <Picker.Item label="Pubblico" value="Pubblico" />
              </Picker>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  pageTitle: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  buttonContainer: { position: 'absolute', top: 10, right: 10, flexDirection: 'row' },
  smallButton: { backgroundColor: '#4B0082', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 8, marginLeft: 5 },
  buttonText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  privateSection: { paddingVertical: 20, marginTop: 50 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around' },
  publicSection: { flex: 1, justifyContent: 'flex-start', marginTop: 40 },
  publicHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  plusButton: { backgroundColor: '#4B0082', borderRadius: 20, width: 30, height: 30, alignItems: 'center', justifyContent: 'center' },
  plusText: { color: '#fff', fontSize: 20 },
  publicItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: '#f0f0f0', borderRadius: 8, marginBottom: 5 },
  publicName: { fontSize: 16, fontWeight: '500' },
  publicDate: { fontSize: 16, color: '#666' },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  modalBackground: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '80%' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  input: { borderColor: '#ccc', borderWidth: 1, padding: 10, borderRadius: 8, marginBottom: 10 },
  modalButton: { backgroundColor: '#4B0082', padding: 10, borderRadius: 8, alignItems: 'center' },
  modalButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
