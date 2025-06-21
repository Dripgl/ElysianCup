import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'; // Aggiunto Alert


export default function Navbar() {
    const [menuVisible, setMenuVisible] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        try {
            // TODO: Sostituire con una chiamata al tuo backend per gestire il logout.
            // Il backend dovrà invalidare la sessione dell'utente o il token JWT.
            // Esempio (con fetch):
            // const response = await fetch('/api/logout', {
            //   method: 'POST',
            //   headers: {
            //     'Content-Type': 'application/json',
            //     // Se usi token JWT, potresti doverlo inviare nell'header:
            //     // 'Authorization': `Bearer ${tuoTokenUtente}`
            //   },
            // });

            // if (response.ok) {
            //   // Logout riuscito sul backend
            //   console.log('Logout dal backend riuscito!');
            // } else {
            //   // Gestisci l'errore del backend
            //   console.error('Errore durante il logout dal backend:', response.status);
            //   Alert.alert('Errore', 'Non è stato possibile effettuare il logout.');
            // }

            // Simulazione del logout (rimuovi quando implementerai il backend)
            console.log('Simulazione logout...');
            await new Promise(resolve => setTimeout(resolve, 500)); // Simula un'operazione asincrona

            setMenuVisible(false);
            router.replace('/login'); // Reindirizza alla pagina di login
        } catch (error) {
            console.error("Errore durante il logout:", error);
            Alert.alert('Errore', 'Si è verificato un problema durante il logout.');
        }
    };

    return (
        <View style={styles.navbar}>
            {/* Logo a sinistra */}
            <Image source={require('../../assets/images/Logo.png')} style={styles.logo} />

            {/* Icona menu a destra */}
            <TouchableOpacity onPress={() => setMenuVisible(true)}>
                <FontAwesome name="bars" size={28} color="#fff" />
            </TouchableOpacity>

            {/* Modal Menu */}
            <Modal visible={menuVisible} transparent animationType="fade">
                <Pressable style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.menuItem} onPress={() => { router.push('/account'); setMenuVisible(false); }}>
                            <FontAwesome name="user" size={20} /> <Text style={styles.menuText}>Profilo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => { router.push('/'); setMenuVisible(false); }}>
                            <FontAwesome name="cog" size={20} /> <Text style={styles.menuText}>Settings</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => { router.push('/market'); setMenuVisible(false); }}>
                            <FontAwesome name="shopping-cart" size={20} /> <Text style={styles.menuText}>Market</Text>
                        </TouchableOpacity>
                        {/* Modificata la funzione di logout per usare handleLogout */}
                        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                            <FontAwesome name="sign-out" size={20} /> <Text style={styles.menuText}>Logout</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => { router.push('/'); setMenuVisible(false); }}>
                            <FontAwesome name="book" size={20} /> <Text style={styles.menuText}>Regolamento</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    navbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, backgroundColor: '#081a26' },
    logo: { width: 40, height: 40, resizeMode: 'contain' },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    modalContent: { backgroundColor: '#fff', padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
    menuItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
    menuText: { marginLeft: 10, fontSize: 16 },
});