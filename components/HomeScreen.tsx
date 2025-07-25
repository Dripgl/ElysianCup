import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, ImageBackground } from 'react-native';

const mockNews = {
  matches: [
    { id: '1', title: 'Team A vs Team B ' },
    { id: '2', title: 'Team C vs Team D' },
  ],
 
}; const mockScorers = [
    { id: '1', name: 'Player A', goals: 5, team: 'Team A' },
    { id: '2', name: 'Player B', goals: 4, team: 'Team B' },
    { id: '3', name: 'Player C', goals: 3, team: 'Team C' },
  ];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <ImageBackground
        source={require('../assets/images/Background.jpg') }
        style={styles.header}
        imageStyle={{ borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}
      >
        <Text style={styles.headerTitle}>Welcome to Elysian Cup</Text>
        <Text style={styles.headerSubtitle}>Dominate the game. Rule the league.</Text>
      </ImageBackground>

      {/* Sezione Notizie */}
      <Text style={styles.sectionTitle}>Etna Padel</Text>
      <FlatList
        data={mockNews.matches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
          </View>
        )}
      />
      <Text style={styles.sectionTitle}>Top Scorers</Text>
      <FlatList
        data={mockScorers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.name} - {item.team} - Goals: {item.goals}</Text>
          </View>
        )}
      />
      <Text style={styles.sectionTitle}>Devil Soccer</Text>
      <FlatList
        data={mockNews.matches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
          </View>
        )}
      />
      <Text style={styles.sectionTitle}>Top Scorers</Text>
      <FlatList
        data={mockScorers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.name} - {item.team} - Goals: {item.goals}</Text>
          </View>
        )}
      />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    fontSize: 28,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginTop: 8,
  },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10, paddingHorizontal: 20 },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#4B0082' },
});
