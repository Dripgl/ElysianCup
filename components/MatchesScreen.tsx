import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

// --- Definizione delle interfacce per i tipi di dati ---
interface TopScorer {
  id: string;
  name: string;
  points: number;
}

interface Team {
  id: string;
  coach: string;
  points: number;
}

interface MatchCalendarEntry {
  id: string;
  match: string;
  date: string;
}
// ----------------------------------------------------

const mockNextMatch = {
  teamA: { name: 'SSC FOX', logo: 'https://via.placeholder.com/100', lastFive: ['win', 'win', 'draw', 'loss', 'win'] },
  teamB: { name: 'FC WhatsApp', logo: 'https://via.placeholder.com/100', lastFive: ['loss', 'draw', 'win', 'win', 'loss'] },
  date: '2025-06-01T18:00:00', // Assicurati che questa data sia nel futuro per vedere il countdown
};

export default function MatchesScreen() {
  const [countdown, setCountdown] = useState('');
  // Ora specifichiamo il tipo per gli stati
  const [topScorers, setTopScorers] = useState<TopScorer[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [matchCalendar, setMatchCalendar] = useState<MatchCalendarEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Dati di esempio (rimuovi quando connetti il backend)
        setTopScorers([
          { id: '1', name: 'Giocatore A', points: 25 },
          { id: '2', name: 'Giocatore B', points: 22 },
        ]);

        // Dati di esempio (rimuovi quando connetti il backend)
        setMatchCalendar([
          { id: 'm1', match: 'Squadra X vs Squadra Y', date: '2025-06-25 20:00' },
          { id: 'm2', match: 'Squadra Z vs Squadra W', date: '2025-06-26 18:00' },
        ]);

      } catch (err) {
        console.error('Errore nel caricamento dati dal backend (simulato):', err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Dati di esempio (rimuovi quando connetti il backend)
    setTeams([
      { id: 't1', coach: 'Coach Rossi', points: 150 },
      { id: 't2', coach: 'Coach Bianchi', points: 140 },
    ]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const matchDate = new Date(mockNextMatch.date);
      const now = new Date();
      const diff = matchDate.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown('Partita in corso o terminata');
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        setCountdown(`${days}g ${hours}h ${minutes}m`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const renderResultBox = (result: string, index: number) => {
    let bgColor = '#ccc'; // draw
    if (result === 'win') bgColor = 'green';
    else if (result === 'loss') bgColor = 'red';
    return <View key={index} style={[styles.resultBox, { backgroundColor: bgColor }]} />;
  };

  return (
    <View style={styles.container}>
      {/* Prossima Partita */}
      <View style={styles.nextMatchContainer}>
        <Text style={styles.title}>Prossima Partita</Text>
        <View style={styles.teamsRow}>
          <View style={styles.team}>
            <Image source={{ uri: mockNextMatch.teamA.logo }} style={styles.logo} />
            <Text style={styles.teamName}>{mockNextMatch.teamA.name}</Text>
            <View style={styles.resultsRow}>
              {mockNextMatch.teamA.lastFive.map((res, idx) => renderResultBox(res, idx))}
            </View>
          </View>
          <Text style={styles.vs}>VS</Text>
          <View style={styles.team}>
            <Image source={{ uri: mockNextMatch.teamB.logo }} style={styles.logo} />
            <Text style={styles.teamName}>{mockNextMatch.teamB.name}</Text>
            <View style={styles.resultsRow}>
              {mockNextMatch.teamB.lastFive.map((res, idx) => renderResultBox(res, idx))}
            </View>
          </View>
        </View>
        <Text style={styles.countdown}>{countdown}</Text>
      </View>

      {/* Top Scores */}
      <Text style={styles.sectionTitle}>Migliori Marcatori</Text>
      <FlatList
        data={topScorers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.listItem}>{item.name} - {item.points} pts</Text>
        )}
      />

      {/* Classifica */}
      <Text style={styles.sectionTitle}>Classifica Squadre</Text>
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
  container: { flex: 1, padding: 20, backgroundColor: '#f0f0f0' },
  nextMatchContainer: { backgroundColor: '#222', padding: 20, borderRadius: 10, marginBottom: 20 },
  title: { color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  teamsRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginVertical: 15 },
  team: { alignItems: 'center' },
  teamName: { color: 'white', fontSize: 16, marginTop: 5 },
  logo: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  vs: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  resultsRow: { flexDirection: 'row', marginTop: 5 },
  resultBox: { width: 15, height: 15, marginHorizontal: 2, borderRadius: 3 },
  countdown: { color: 'white', textAlign: 'center', marginTop: 10, fontSize: 16 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 15, marginBottom: 10, color: '#333' },
  listItem: { fontSize: 16, marginVertical: 5, color: '#555' },
});