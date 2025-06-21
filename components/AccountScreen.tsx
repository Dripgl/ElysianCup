import React, { useEffect, useState } from 'react'; // Aggiunto useState e useEffect
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AccountScreen() {
  // Lo stato 'user' ora rappresenterà i dati dell'utente dal tuo backend
  const [user, setUser] = useState<any | null>(null); // Inizialmente null, o recuperato dal contesto/storage

  useEffect(() => {
    // TODO: Qui dovrai fare una chiamata al tuo backend
    // per ottenere le informazioni dell'utente loggato.
    // Oppure, se le informazioni dell'utente sono salvate localmente dopo il login,
    // le caricherai da lì (es. AsyncStorage o un contesto globale).
    // Esempio (simulando un recupero dati):
    const fetchUserData = async () => {
      // try {
      //   const response = await fetch('/api/user/profile', {
      //     headers: { 'Authorization': `Bearer ${tuoTokenUtente}` }
      //   });
      //   if (response.ok) {
      //     const userData = await response.json();
      //     setUser(userData); // Imposta i dati utente ottenuti dal backend
      //   } else {
      //     console.error("Errore nel recupero dati utente:", response.status);
      //     // Forse l'utente non è autenticato o la sessione è scaduta
      //     setUser(null);
      //   }
      // } catch (error) {
      //   console.error("Errore di rete nel recupero dati utente:", error);
      //   setUser(null);
      // }

      // Dati utente di esempio per la visualizzazione (rimuovi quando integri il backend)
      setUser({
        displayName: 'Nome Utente Esempio',
        email: 'utente.esempio@mail.com',
        photoURL: 'https://via.placeholder.com/100', // URL di un'immagine segnaposto
      });
    };

    fetchUserData();
  }, []); // L'array vuoto assicura che questo effetto si esegua solo al montaggio

  const handleLogout = async () => {
    try {
      // TODO: Sostituire con una chiamata al tuo backend per gestire il logout.
      // Questa logica sarà molto simile a quella che abbiamo messo nella Navbar.
      // Esempio:
      // const response = await fetch('/api/logout', { method: 'POST' });
      // if (response.ok) {
      //   setUser(null); // Pulisce lo stato utente nel frontend
      //   Alert.alert('Logout Effettuato', 'Sei stato disconnesso con successo.');
      //   // Reindirizza alla pagina di login, se necessario, anche se _layout.tsx lo gestisce
      //   // router.replace('/login');
      // } else {
      //   Alert.alert('Errore', 'Non è stato possibile effettuare il logout.');
      // }

      // Simulazione del logout
      console.log('Simulazione logout da AccountScreen...');
      await new Promise(resolve => setTimeout(resolve, 500));
      setUser(null); // Simula la disconnessione
      Alert.alert('Logout Effettuato', 'Sei stato disconnesso con successo (simulato).');

    } catch (error) {
      Alert.alert('Errore', error instanceof Error ? error.message : 'Errore sconosciuto durante il logout');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Il Mio Account</Text>

      {user ? (
        <View style={styles.profile}>
          <Image
            source={{ uri: user.photoURL || 'https://via.placeholder.com/100' }}
            style={styles.avatar}
          />
          <Text style={styles.info}>{user.displayName || 'Nome Utente'}</Text>
          <Text style={styles.info}>{user.email}</Text>
        </View>
      ) : (
        // Questo messaggio verrà visualizzato fino a quando il backend non fornirà i dati utente
        <Text style={styles.info}>Nessun utente loggato (in attesa del backend)</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Funzionalità in arrivo')}>
        <Text style={styles.buttonText}>Modifica Profilo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Funzionalità in arrivo')}>
        <Text style={styles.buttonText}>Cambia Tema</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  profile: { alignItems: 'center', marginBottom: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  info: { fontSize: 16, marginBottom: 5 },
  button: {
    backgroundColor: '#4B0082',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});