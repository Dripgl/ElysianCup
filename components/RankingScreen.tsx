import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { app } from '../FirebaseConfig'; 

const db = getFirestore(app);

const MatchSquare = ({ result }) => {
  let backgroundColor;
  if (result === 'W') backgroundColor = 'green';
  else if (result === 'L') backgroundColor = 'red';
  else backgroundColor = 'gray';
  return <View style={[styles.square, { backgroundColor }]} />;
};

const RankingScreen = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'classifica'), snapshot => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Ordina per goals decrescente
      data.sort((a, b) => b.goals - a.goals);
      setTeams(data);
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Classifica in Tempo Reale</Text>
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>Rank</Text>
        <Text style={styles.headerCell}>Team</Text>
        <Text style={styles.headerCell}>Goals</Text>
        <Text style={styles.headerCell}>Last 5</Text>
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
