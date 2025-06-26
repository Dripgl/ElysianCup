import React, { useEffect, useState } from 'react'; // Aggiunto useEffect
import { FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native';

// --- Definizione dell'interfaccia per il tipo di dato di un giocatore ---
interface Player {
  id: string;
  name: string;
  surname: string;
  team: string;
  photo: string;
}
// ----------------------------------------------------

export default function MarketScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [players, setPlayers] = useState<Player[]>([]); // Stato per i giocatori, tipizzato

  // Carica i giocatori dal backend all'inizio
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        // TODO: Fai una chiamata al tuo backend per ottenere l'elenco dei giocatori disponibili.
        // Esempio:
        // const response = await fetch('/api/players');
        // if (response.ok) {
        //   const data: Player[] = await response.json();
        //   setPlayers(data);
        // } else {
        //   console.error('Errore nel recupero dei giocatori:', response.status);
        // }

        // Dati di esempio (mock data) per testare l'interfaccia senza backend
        const mockPlayers: Player[] = [
          { id: '1', name: 'Leo', surname: 'Messi', team: 'Inter Miami', photo: 'https://via.placeholder.com/50' },
          { id: '2', name: 'Cristiano', surname: 'Ronaldo', team: 'Al Nassr', photo: 'https://via.placeholder.com/50' },
          { id: '3', name: 'Kylian', surname: 'Mbappé', team: 'PSG', photo: 'https://via.placeholder.com/50' },
          { id: '4', name: 'Erling', surname: 'Haaland', team: 'Man City', photo: 'https://via.placeholder.com/50' },
          { id: '5', name: 'Neymar', surname: 'Jr', team: 'Al-Hilal', photo: 'https://via.placeholder.com/50' },
          { id: '6', name: 'Kevin', surname: 'De Bruyne', team: 'Man City', photo: 'https://via.placeholder.com/50' },
        ];
        setPlayers(mockPlayers);

      } catch (error) {
        console.error('Errore nel caricamento dei giocatori (simulato):', error);
      }
    };

    fetchPlayers(); // Esegui la funzione al montaggio del componente
  }, []); // L'array vuoto assicura che l'effetto si esegua una sola volta al montaggio

  const filteredPlayers = players.filter((player) =>
    `${player.name} ${player.surname}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Cerca giocatori..." // Tradotto
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchBar}
        placeholderTextColor="#999" // Colore per il placeholder
      />

      <FlatList
        data={filteredPlayers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.photo }} style={styles.photo} />
            <View style={styles.playerInfo}>
              <Text style={styles.playerName}>{item.name} {item.surname}</Text> {/* Nome completo */}
              <Text style={styles.teamName}>{item.team}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f0f0' }, // Sfondo più chiaro
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff', // Sfondo bianco per la barra di ricerca
    color: '#333', // Colore del testo
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff', // Sfondo bianco per le card
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000', // Ombra per dare profondità
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  photo: { width: 50, height: 50, borderRadius: 25, marginRight: 10, borderWidth: 1, borderColor: '#ddd' }, // Bordo sottile
  playerInfo: {
    flex: 1, // Permette al testo di occupare lo spazio rimanente
  },
  playerName: { fontSize: 18, fontWeight: 'bold', color: '#333' }, // Nome più grande e in grassetto
  teamName: { fontSize: 14, color: '#666', marginTop: 2 },
});