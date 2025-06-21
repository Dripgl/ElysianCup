import React, { useEffect, useState } from 'react'; // Aggiunto useEffect e useState
import { FlatList, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';

// --- Definizione delle interfacce per i tipi di dati ---
interface MatchNews {
  id: string;
  title: string;
}

interface TopScorer {
  id: string;
  name: string;
  goals: number;
  team: string;
}
// ----------------------------------------------------

export default function HomeScreen() {
  const [etnaPadelMatches, setEtnaPadelMatches] = useState<MatchNews[]>([]);
  const [etnaPadelScorers, setEtnaPadelScorers] = useState<TopScorer[]>([]);
  const [devilSoccerMatches, setDevilSoccerMatches] = useState<MatchNews[]>([]);
  const [devilSoccerScorers, setDevilSoccerScorers] = useState<TopScorer[]>([]);

  // Carica i dati dal backend all'inizio
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        // TODO: Fai chiamate al tuo backend per ottenere i dati per ciascuna sezione.
        // Ad esempio:
        // const etnaPadelMatchesResponse = await fetch('/api/etnapadel/matches');
        // if (etnaPadelMatchesResponse.ok) {
        //   const data: MatchNews[] = await etnaPadelMatchesResponse.json();
        //   setEtnaPadelMatches(data);
        // }

        // const etnaPadelScorersResponse = await fetch('/api/etnapadel/topscorers');
        // if (etnaPadelScorersResponse.ok) {
        //   const data: TopScorer[] = await etnaPadelScorersResponse.json();
        //   setEtnaPadelScorers(data);
        // }

        // E così via per Devil Soccer...

        // Dati di esempio (mock data) per testare l'interfaccia senza backend
        setEtnaPadelMatches([
          { id: '1', title: 'Partita Padel 1 vs Partita Padel 2' },
          { id: '2', title: 'Partita Padel 3 vs Partita Padel 4' },
        ]);
        setEtnaPadelScorers([
          { id: 'EP1', name: 'Marco Rossi', goals: 8, team: 'Padel Power' },
          { id: 'EP2', name: 'Luca Verdi', goals: 7, team: 'Smash Masters' },
        ]);

        setDevilSoccerMatches([
          { id: 'DS1', title: 'Partita Calcio 1 vs Partita Calcio 2' },
          { id: 'DS2', title: 'Partita Calcio 3 vs Partita Calcio 4' },
        ]);
        setDevilSoccerScorers([
          { id: 'DSG1', name: 'Andrea Bianchi', goals: 12, team: 'Goal Getters' },
          { id: 'DSG2', name: 'Simone Neri', goals: 10, team: 'Net Busters' },
        ]);

      } catch (error) {
        console.error('Errore nel caricamento dei dati della Home (simulato):', error);
      }
    };

    fetchHomeData(); // Esegui la funzione al montaggio del componente
  }, []); // L'array vuoto assicura che l'effetto si esegua una sola volta al montaggio

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
        style={styles.header}
        imageStyle={{ borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}
      >
        <Text style={styles.headerTitle}>Benvenuto in Elysian Cup</Text> {/* Tradotto */}
        <Text style={styles.headerSubtitle}>Domina il gioco. Regna nel campionato.</Text> {/* Tradotto */}
      </ImageBackground>

      {/* Sezione Notizie Etna Padel */}
      <Text style={styles.sectionTitle}>Etna Padel - Ultime Partite</Text> {/* Titolo più specifico */}
      <FlatList
        data={etnaPadelMatches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
          </View>
        )}
        scrollEnabled={false} // Disabilita lo scroll della FlatList all'interno della ScrollView
      />

      {/* Sezione Top Scorers Etna Padel */}
      <Text style={styles.sectionTitle}>Etna Padel - Migliori Marcatori</Text> {/* Titolo più specifico */}
      <FlatList
        data={etnaPadelScorers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>{item.name} - {item.team} - Goals: {item.goals}</Text> {/* Nuovo stile */}
          </View>
        )}
        scrollEnabled={false}
      />

      {/* Sezione Notizie Devil Soccer */}
      <Text style={styles.sectionTitle}>Devil Soccer - Ultime Partite</Text> {/* Titolo più specifico */}
      <FlatList
        data={devilSoccerMatches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
          </View>
        )}
        scrollEnabled={false}
      />

      {/* Sezione Top Scorers Devil Soccer */}
      <Text style={styles.sectionTitle}>Devil Soccer - Migliori Marcatori</Text> {/* Titolo più specifico */}
      <FlatList
        data={devilSoccerScorers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>{item.name} - {item.team} - Goals: {item.goals}</Text> {/* Nuovo stile */}
          </View>
        )}
        scrollEnabled={false}
      />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0' }, // Sfondo più chiaro
  header: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    fontSize: 28,
    color: '#fff', // Colore bianco per il testo sull'immagine
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Ombra per migliore leggibilità
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff', // Colore bianco
    textAlign: 'center',
    marginTop: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Ombra
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10, paddingHorizontal: 20, color: '#333' }, // Colore testo scuro
  card: {
    backgroundColor: '#fff', // Sfondo bianco per le card
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
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#4B0082' }, // Viola scuro
  cardText: { fontSize: 16, color: '#555' }, // Nuovo stile per il testo dei marcatori
});