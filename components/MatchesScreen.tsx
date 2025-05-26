import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import TopScores from './ui/TopScores';
import TournamentRanking from './ui/TournamentRanking';
import MatchSchedule from './ui/MatchSchedule';

const mockNextMatch = {
  teamA: { name: 'SSC FOX', logo: 'https://via.placeholder.com/100', lastFive: ['win', 'win', 'draw', 'loss', 'win'] },
  teamB: { name: 'FC WhatsApp', logo: 'https://via.placeholder.com/100', lastFive: ['loss', 'draw', 'win', 'win', 'loss'] },
  date: '2025-06-01T18:00:00',
};

const mockScorers = [
  { id: '1', name: 'Player A', goals: 5, team: 'Team A' },
  { id: '2', name: 'Player B', goals: 4, team: 'Team B' },
  { id: '3', name: 'Player C', goals: 3, team: 'Team C' },
];

const mockPodium = [
  { id: '1', name: 'Player X', points: 50 },
  { id: '2', name: 'Player Y', points: 45 },
  { id: '3', name: 'Player Z', points: 42 },
];

export default function MatchesScreen() {
  const [filter, setFilter] = useState<'all' | 'my'>('all');
  const [countdown, setCountdown] = useState('');

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

  const renderResultBox = (result: string, index: number) => {
    let bgColor = '#ccc'; // draw
    if (result === 'win') bgColor = 'green';
    else if (result === 'loss') bgColor = 'red';
    return <View key={index} style={[styles.resultBox, { backgroundColor: bgColor }]} />;
  };

  return (
    <View style={styles.container}>
      {/* Next Match */}
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

      {/* Top Scorers */}
      <section>
        <TopScores />
      </section>

      {/* Weekly Top 3 */}
      {/* <section>
        <WeeklyTop3 />
      </section> */}

      {/* Classifica del Torneo */}
      <section>
        <h2>Classifica del Torneo</h2>
        <TournamentRanking />
      </section>

      {/* Calendario delle Partite */}
      <section>
        <h2>Calendario delle Partite</h2>
        <MatchSchedule />
      </section>

      {/* Lista Marcatori */}
      {/* <Text style={styles.sectionTitle}>Top Scorers</Text>
      <FlatList
        data={mockScorers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.name} - {item.team} - Goals: {item.goals}</Text>
          </View>
        )}
      /> */}

      {/* Podio */}
      <Text style={styles.sectionTitle}>Weekly Top 3</Text>
      <View style={styles.podium}>
        {mockPodium.map((player, index) => (
          <View key={player.id} style={styles.podiumItem}>
            <Text style={styles.podiumPosition}>{['🥇', '🥈', '🥉'][index]}</Text>
            <Text>{player.name}</Text>
            <Text>{player.points} pts</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  nextMatchContainer: { backgroundColor: '#222', padding: 20, borderRadius: 10, marginBottom: 20 },
  title: { color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  teamsRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginVertical: 15 },
  team: { alignItems: 'center' },
  logo: { width: 80, height: 80, borderRadius: 40, marginBottom: 10, color: 'white' },
  vs: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  resultsRow: { flexDirection: 'row', marginTop: 5 },
  resultBox: { width: 15, height: 15, marginHorizontal: 2, borderRadius: 3 },
  countdown: { color: 'white', textAlign: 'center', marginTop: 10 },
  filter: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 15 },
  card: { backgroundColor: '#f0f0f0', padding: 10, marginVertical: 5, borderRadius: 8 },
  podium: { flexDirection: 'column', justifyContent: 'space-around', marginTop: 10 },
  podiumItem: { alignItems: 'center' },
  podiumPosition: { fontSize: 24 },
});
