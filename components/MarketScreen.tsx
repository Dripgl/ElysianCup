import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Image } from 'react-native';

const mockPlayers = [
  { id: '1', name: 'Leo', surname: 'Messi', team: 'Inter Miami', photo: 'https://via.placeholder.com/50' },
  { id: '2', name: 'Cristiano', surname: 'Ronaldo', team: 'Al Nassr', photo: 'https://via.placeholder.com/50' },
  { id: '3', name: 'Kylian', surname: 'Mbappé', team: 'PSG', photo: 'https://via.placeholder.com/50' },
  { id: '4', name: 'Erling', surname: 'Haaland', team: 'Man City', photo: 'https://via.placeholder.com/50' },
];

export default function MarketScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlayers = mockPlayers.filter((player) =>
    `${player.name} ${player.surname}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search players..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchBar}
      />

      <FlatList
        data={filteredPlayers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.photo }} style={styles.photo} />
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>{item.surname}</Text>
            <Text style={styles.team}>{item.team}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  photo: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  text: { fontSize: 16, fontWeight: '500', marginRight: 10 },
  team: { fontSize: 14, color: '#666' },
});
