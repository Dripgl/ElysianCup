import { Slot, SplashScreen, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import Navbar from '@/components/ui/Navbar';

// Previene che la splash screen si nasconda automaticamente.
// Ci darà il tempo di caricare e verificare lo stato di autenticazione.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [user, setUser] = useState<any | null>(null);
  const [loadingInitialAuth, setLoadingInitialAuth] = useState(true); // Stato per il caricamento iniziale dell'autenticazione
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Effetto per la verifica iniziale dell'autenticazione
  useEffect(() => {
    async function checkAuthentication() {
      try {
        // Simula un controllo asincrono dell'autenticazione con il tuo backend.
        // In un'app reale, qui faresti una fetch al tuo /api/check-auth
        // o controlleresti un token in AsyncStorage.
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simula un ritardo di 2 secondi
        
        const isUserAuthenticated = false; // TODO: Cambia questo con la tua logica VERA
                                          // Esempio: const response = await fetch('/api/check-auth');
                                          // const isUserAuthenticated = response.ok;

        if (isUserAuthenticated) {
          // TODO: Se l'utente è autenticato, potresti voler impostare i suoi dati
          // const userData = await response.json();
          // setUser(userData);
          setUser({ id: 'mock-user', name: 'Mock User' }); // Simula utente loggato
        } else {
          setUser(null); // Nessun utente autenticato
        }
      } catch (err) {
        console.error("Authentication check failed:", err);
        setError("Errore durante la verifica dell'autenticazione.");
        setUser(null);
      } finally {
        setLoadingInitialAuth(false); // Il controllo iniziale è terminato
        SplashScreen.hideAsync(); // Nascondi la splash screen
      }
    }

    checkAuthentication();
  }, []); // Esegui solo una volta all'avvio

  // Effetto per la navigazione condizionale DOPO che lo stato di autenticazione è stato determinato
  useEffect(() => {
    if (!loadingInitialAuth) { // Solo se il controllo iniziale è terminato
      if (user) {
        // Utente autenticato, naviga alla schermata principale (tabs)
        router.replace('/(tabs)');
      } else {
        // Utente non autenticato, naviga alla schermata di login
        router.replace('/login');
      }
    }
  }, [user, loadingInitialAuth, router]); // Dipende dallo stato dell'utente e dal caricamento iniziale

  // Mostra un indicatore di caricamento mentre la verifica dell'autenticazione è in corso
  if (loadingInitialAuth) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4B0082" />
        <Text style={{ marginTop: 10, color: '#333' }}>Caricamento applicazione...</Text>
      </View>
    );
  }

  // Se c'è un errore grave durante il controllo iniziale, mostralo.
  // In un'app reale, potresti offrire un pulsante "Riprova".
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Errore: {error}</Text>
        <Text style={{ marginTop: 5, color: '#666' }}>Per favore riprova o contatta il supporto.</Text>
      </View>
    );
  }

  // Questo è il render principale del RootLayout.
  // È FONDAMENTALE che Slot o un Navigator sia sempre reso qui,
  // anche se la logica interna reindirizza altrove.
  // La Navbar verrà mostrata se l'utente è loggato (in base allo stato 'user').
  return (
    <View style={{ flex: 1 }}>
      {user && <Navbar />} {/* La Navbar appare solo se l'utente è autenticato */}
      <View style={{ flex: 1 }}>
        <Slot /> {/* Slot di Expo Router che renderizzerà il contenuto della rotta corrente */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Sfondo leggero
  },
  errorText: {
    color: '#D32F2F', // Rosso scuro per gli errori
    fontSize: 18,
    margin: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});