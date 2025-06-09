import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { auth } from '../../FirebaseConfig';
import { signOut } from 'firebase/auth';


export default function Navbar() {
    const [menuVisible, setMenuVisible] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setMenuVisible(false);
            router.replace('/login');
        } catch (error) {
            console.error(error);
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
                        <TouchableOpacity style={styles.menuItem} onPress={async () => { await signOut(auth); setMenuVisible(false); router.replace('/login'); }}>
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
