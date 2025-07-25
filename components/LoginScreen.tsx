// app/components/LoginScreen.tsx
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from '../FirebaseConfig';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'fantallenatore' | 'admin' | 'giocatore'>('fantallenatore');
    const router = useRouter();

    const handleRegister = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            Alert.alert('Success', 'User registered successfully!');
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert('Registration Error', error.message);
            } else {
                Alert.alert('Error', 'An unknow error occured');
            }

        }
    };

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            Alert.alert('Success', 'Logged in successfully!');
            if (role === 'admin') {
                router.replace('/admin');
            } else if (role === 'giocatore') {
                router.replace('/playerHome');
            } else {
                router.replace('/');
            }
        } catch (error) {
            if (error instanceof Error) {
              Alert.alert('Login Error', error.message);  
            } else {
                Alert.alert('Error', 'An unknow error occured');
            }
            
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Elysian Cup Login - {role === 'admin' ? 'Admin' : role === 'giocatore' ? 'Giocatore' : 'Fantallenatore'}</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
            <Button title="Register" onPress={handleRegister} />
            {role === 'fantallenatore' ? (
                <View style={styles.linksContainer}>
                    <TouchableOpacity onPress={() => setRole('admin')}>
                        <Text style={styles.link}>Entra come admin</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setRole('giocatore')}>
                        <Text style={styles.link}>Entra come Giocatore</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity onPress={() => setRole('fantallenatore')}>
                    <Text style={styles.link}>Entra come Fantallenatore</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: 'black' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
    linksContainer: { marginTop: 15 },
    link: { color: 'white', textAlign: 'center', marginTop: 10, textDecorationLine: 'underline' },
});
