// app/components/LoginScreen.tsx
// Rimossi gli import di Firebase:
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
// Rimossa l'importazione di auth da Firebase:
// import { auth } from '../FirebaseConfig';
import { useRouter } from 'expo-router'; // Aggiungi l'import per useRouter, utile per la navigazione dopo il login

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter(); // Inizializza useRouter

    const handleRegister = async () => {
        try {
            // TODO: Sostituisci con una chiamata POST al tuo backend per la registrazione.
            // Il tuo backend riceverà email e password, creerà l'utente nel suo database
            // e, se successo, restituirà una risposta che indicherà il successo (es. un token).
            // Esempio con fetch:
            // const response = await fetch('/api/register', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ email, password }),
            // });

            // if (response.ok) {
            //   Alert.alert('Successo', 'Utente registrato con successo!');
            //   // Potresti anche reindirizzare l'utente direttamente dopo la registrazione
            //   // router.replace('/(tabs)');
            // } else {
            //   const errorData = await response.json(); // Assumendo che il backend restituisca errori JSON
            //   Alert.alert('Errore Registrazione', errorData.message || 'Errore sconosciuto');
            // }

            // Simulazione della registrazione (rimuovi quando implementerai il backend)
            console.log('Tentativo di registrazione (simulato):', email);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simula un'operazione asincrona
            Alert.alert('Successo', 'Registrazione completata (simulato)!');

        } catch (error) {
            console.error('Errore durante la registrazione (simulato):', error);
            if (error instanceof Error) {
                Alert.alert('Errore Registrazione', error.message);
            } else {
                Alert.alert('Errore', 'Si è verificato un errore sconosciuto durante la registrazione.');
            }
        }
    };

    const handleLogin = async () => {
        try {
            // TODO: Sostituisci con una chiamata POST al tuo backend per il login.
            // Il tuo backend riceverà email e password, verificherà le credenziali
            // e, se successo, restituirà un token di autenticazione (es. JWT) o imposterà una sessione.
            // Questo token/informazione dovrà essere salvato nel frontend (es. AsyncStorage)
            // e usato per le future richieste al backend.
            // Esempio con fetch:
            // const response = await fetch('/api/login', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ email, password }),
            // });

            // if (response.ok) {
            //   const data = await response.json();
            //   // Salva il token/sessione di autenticazione qui (es. await AsyncStorage.setItem('userToken', data.token);)
            //   Alert.alert('Successo', 'Accesso effettuato con successo!');
            //   router.replace('/(tabs)'); // Reindirizza l'utente alle pagine principali
            // } else {
            //   const errorData = await response.json();
            //   Alert.alert('Errore Login', errorData.message || 'Credenziali non valide');
            // }

            // Simulazione del login (rimuovi quando implementerai il backend)
            console.log('Tentativo di login (simulato):', email);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simula un'operazione asincrona

            // Se la simulazione ha successo, reindirizza
            Alert.alert('Successo', 'Accesso effettuato (simulato)!');
            router.replace('/(tabs)'); // Reindirizza l'utente dopo il login simulato

        } catch (error) {
            console.error('Errore durante il login (simulato):', error);
            if (error instanceof Error) {
                Alert.alert('Errore Login', error.message);
            } else {
                Alert.alert('Errore', 'Si è verificato un errore sconosciuto durante il login.');
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Elysian Cup Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#999" // Aggiunto per Tailwind in futuro
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#999" // Aggiunto per Tailwind in futuro
            />
            <Button title="Login" onPress={handleLogin} />
            <Button title="Register" onPress={handleRegister} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: 'black' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#fff' }, // Aggiunto colore testo
    input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5, borderColor: '#ccc', color: '#fff' }, // Aggiunti colore bordo e testo
});