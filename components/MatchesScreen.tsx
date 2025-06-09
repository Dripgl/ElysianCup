import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { getFirestore, collection, getDocs, onSnapshot } from 'firebase/firestore';
import { app } from '../FirebaseConfig';

const mockNextMatch = {
  teamA: { name: 'SSC FOX', logo: 'https://via.placeholder.com/100', lastFive: ['win', 'win', 'draw', 'loss', 'win'] },
  teamB: { name: 'FC WhatsApp', logo: 'https://via.placeholder.com/100', lastFive: ['loss', 'draw', 'win', 'win', 'loss'] },
  date: '2025-06-01T18:00:00',
};

const db = getFirestore(app);

export default function MatchesScreen() {
  const [countdown, setCountdown] = useState('');
  const [topScorers, setTopScorers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [matchCalendar, setMatchCalendar] = useState([]);

  // 🔥 Fetch dati da Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const scorersSnap = await getDocs(collection(db, 'topScorers'));
        setTopScorers(scorersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const calendarSnap = await getDocs(collection(db, 'matchCalendar'));
        setMatchCalendar(calendarSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error('Errore nel caricamento dati:', err);
      }
    };
    fetchData();
  }, []);

  // 🔥 Listener per la classifica in tempo reale
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'fantateams'), (snapshot) => {
      setTeams(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // 🔥 Countdown aggiornato ogni secondo
  useEffect(() => {
    const interval = setInterval(() => {
      const matchDate = new Date(mockNextMatch.date);
      const now = new Date();
      const diff = matchDate.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown('Match ongoing or finished');
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        setCountdown(`${days}d ${hours}h ${minutes}m`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 🔥 Box per risultati recenti
  const renderResultBox = (result, index) => {
    let bgColor = '#ccc'; // draw
    if (result === 'win') bgColor = 'green';
    else if (result === 'loss') bgColor = 'red';
    return <View key={index} style={[styles.resultBox, { backgroundColor: bgColor }]} />;
  };

  return (
    <View style={styles.container}>
      {/* Prossima Partita */}
      <View style={styles.nextMatchContainer}>
        <Text style={styles.title}>Next Match</Text>
        <View style={styles.teamsRow}>
          <View style={styles.team}>
            <Image source={{ uri: mockNextMatch.teamA.logo }} style={styles.logo} />
            <View style={styles.resultsRow}>
              {mockNextMatch.teamA.lastFive.map((res, idx) => renderResultBox(res, idx))}
            </View>
          </View>
          <Text style={styles.vs}>VS</Text>
          <View style={styles.team}>
            <Image source={{ uri: mockNextMatch.teamB.logo }} style={styles.logo} />
            <View style={styles.resultsRow}>
              {mockNextMatch.teamB.lastFive.map((res, idx) => renderResultBox(res, idx))}
            </View>
          </View>
        </View>
        <Text style={styles.countdown}>{countdown}</Text>
      </View>

      {/* Top Scores */}
      <Text style={styles.sectionTitle}>Top Scores</Text>
      <FlatList
        data={topScorers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.listItem}>{item.name} - {item.points} pts</Text>
        )}
      />

      {/* Classifica */}
      <Text style={styles.sectionTitle}>Classifica in tempo reale</Text>
      <FlatList
        data={teams}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.listItem}>{item.coach}: {item.points} punti</Text>
        )}
      />

      {/* Calendario Partite */}
      <Text style={styles.sectionTitle}>Calendario Partite</Text>
      <FlatList
        data={matchCalendar}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.listItem}>{item.match} - {item.date}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  nextMatchContainer: { backgroundColor: '#222', padding: 20, borderRadius: 10, marginBottom: 20 },
  title: { color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  teamsRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginVertical: 15 },
  team: { alignItems: 'center' },
  logo: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  vs: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  resultsRow: { flexDirection: 'row', marginTop: 5 },
  resultBox: { width: 15, height: 15, marginHorizontal: 2, borderRadius: 3 },
  countdown: { color: 'white', textAlign: 'center', marginTop: 10 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 15 },
  listItem: { fontSize: 16, marginVertical: 5 },
});
