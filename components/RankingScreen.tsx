import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
// Rimosse le importazioni di Firebase Firestore
// import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
// import { app } from '../FirebaseConfig'; 

// Non è più necessaria la riga const db = getFirestore(app);

// Definizione dell'interfaccia per il tipo di dato di una squadra in classifica
interface TeamRanking {
  id: string;
  team: string;
  goals: number;
  lastMatches: ('W' | 'L' | 'D')[]; // Assumendo 'D' per draw
}

const MatchSquare = ({ result }: { result: 'W' | 'L' | 'D' }) => { // Aggiunto tipo per 'result'
  let backgroundColor: string; // Aggiunto tipo per backgroundColor
  if (result === 'W') backgroundColor = 'green';
  else if (result === 'L') backgroundColor = 'red';
  else backgroundColor = 'gray'; // 'D' per draw, o qualsiasi altro valore non specificato
  return <View style={[styles.square, { backgroundColor }]} />;
};

const RankingScreen = () => {
  const [teams, setTeams] = useState<TeamRanking[]>([]); // Tipizzato lo stato

  useEffect(() => {
    // TODO: Sostituisci questo listener Firebase con una chiamata al tuo backend.
    // Puoi fare una chiamata `fetch` per recuperare i dati della classifica.
    // Considera:
    // 1. Chiamata singola all'avvio.
    // 2. Un meccanismo di "pull-to-refresh" se vuoi aggiornamenti su richiesta.
    // 3. WebSockets se il tuo backend supporta aggiornamenti in tempo reale.

    const fetchRanking = async () => {
      try {
        // Esempio di chiamata fetch:
        // const response = await fetch('/api/ranking');
        // if (response.ok) {
        //   const data: TeamRanking[] = await response.json();
        //   data.sort((a, b) => b.goals - a.goals); // Ordina per goals decrescente
        //   setTeams(data);
        // } else {
        //   console.error('Errore nel recupero della classifica:', response.status);
        // }

        // Dati di esempio (mock data) per testare l'interfaccia senza backend
        const mockData: TeamRanking[] = [
          { id: '1', team: 'Dragons FC', goals: 55, lastMatches: ['W', 'L', 'W', 'D', 'W'] },
          { id: '2', team: 'Phoenix United', goals: 52, lastMatches: ['W', 'W', 'L', 'L', 'W'] },
          { id: '3', team: 'Thunderbirds', goals: 48, lastMatches: ['D', 'W', 'W', 'D', 'L'] },
          { id: '4', team: 'Night Hawks', goals: 45, lastMatches: ['L', 'L', 'W', 'W', 'D'] },
        ];
        mockData.sort((a, b) => b.goals - a.goals); // Ordina anche i dati mock
        setTeams(mockData);

      } catch (error) {
        console.error('Errore durante il recupero della classifica (simulato):', error);
        // Puoi mostrare un messaggio di errore all'utente qui
      }
    };

    fetchRanking(); // Esegui la funzione al montaggio del componente

    // La funzione di unsubscribe del listener di Firebase non è più necessaria.
    // return unsubscribe;
  }, []); // L'array vuoto fa sì che l'effetto si esegua una sola volta al montaggio

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Classifica Squadre</Text>
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>Pos</Text> {/* Cambiato da Rank a Pos per brevità */}
        <Text style={styles.headerCell}>Squadra</Text> {/* Cambiato da Team a Squadra */}
        <Text style={styles.headerCell}>Goals</Text>
        <Text style={styles.headerCell}>Ultime 5</Text> {/* Cambiato da Last 5 a Ultime 5 */}
      </View>
      <FlatList
        data={teams}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{index + 1}</Text>
            <Text style={styles.cell}>{item.team}</Text>
            <Text style={styles.cell}>{item.goals}</Text>
            <View style={styles.last5}>
              {item.lastMatches.map((res, i) => (
                <MatchSquare key={i} result={res} />
              ))}
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: 'white', textAlign: 'center', marginVertical: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  headerCell: { flex: 1, color: 'white', fontWeight: 'bold' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#444' },
  cell: { flex: 1, color: 'white' },
  last5: { flexDirection: 'row' },
  square: { width: 12, height: 12, marginHorizontal: 2, borderRadius: 2 },
});

export default RankingScreen;