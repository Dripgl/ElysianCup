import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const mockTournaments = [
  { id: '1', name: 'Champions Cup', status: 'Ongoing' },
  { id: '2', name: 'Winter League', status: 'Upcoming' },
  { id: '3', name: 'Summer Tournament', status: 'Completed' },
];

export default function TournamentsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tournaments</Text>
      <FlatList
        data={mockTournaments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardDescription}>Status: {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold' },
  cardDescription: { fontSize: 14, color: '#666' },
});
