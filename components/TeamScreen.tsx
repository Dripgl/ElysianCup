import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Modal, Pressable, ImageBackground, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const backgroundImage = require('../assets/images/BkCamp.png');

const mockPlayers = [
    { id: '1', name: 'Leo', x: 50, y: 5, photo: 'https://via.placeholder.com/50' },
    { id: '2', name: 'Cristiano', x: 10, y: 20, photo: 'https://via.placeholder.com/50' },
    { id: '3', name: 'Luka', x: 40, y: 20, photo: 'https://via.placeholder.com/50' },
    { id: '4', name: 'Virgil', x: 60, y: 20, photo: 'https://via.placeholder.com/50' },
    { id: '5', name: 'Manuel', x: 90, y: 20, photo: 'https://via.placeholder.com/50' },
    { id: '6', name: 'Kylian', x: 50, y: 60, photo: 'https://via.placeholder.com/50' },
    { id: '7', name: 'Neymar', x: 50, y: 85, photo: 'https://via.placeholder.com/50' },
];

export default function FormationScreen() {
    const [formation, setFormation] = useState('1-4-1');
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>My Formation</Text>
                <Text style={styles.formation}>Current Formation: {formation}</Text>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.dropdownButton} onPress={() => setModalVisible(true)}>
                        <Text style={styles.dropdownButtonText}>Formation: {formation}</Text>
                    </TouchableOpacity>
                </View>

                <Modal visible={modalVisible} transparent={true} animationType="fade">
                    <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
                        <View style={styles.modalContent}>
                            {['1-4-1', '2-3-1', '3-1-2'].filter(f => f !== formation).map(f => (
                                <TouchableOpacity key={f} onPress={() => { setFormation(f); setModalVisible(false); }}>
                                    <Text style={styles.modalItem}>{f}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </Pressable>
                </Modal>

                <View style={styles.fieldBackgroundContainer}>
                    <Image source={backgroundImage} style={styles.fieldBackgroundImage} resizeMode='contain' />
                    <View style={styles.fieldOverlay}>
                        {mockPlayers.map(player => (
                            <View
                                key={player.id}
                                style={[
                                    styles.playerContainer,
                                    {
                                        position: 'absolute',
                                        left: `${player.x}%`,
                                        top: `${player.y}%`
                                    }
                                ]}
                            >
                                <Image source={{ uri: player.photo }} style={styles.photo} />
                                <Text style={styles.playerName}>{player.name}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <Text style={styles.substitutesTitle}>Substitutes</Text>
                <FlatList
                    horizontal
                    data={mockPlayers.slice(3)}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.subCard}>
                            <Image source={{ uri: item.photo }} style={styles.subPhoto} />
                            <Text style={styles.subName}>{item.name}</Text>
                        </View>
                    )}
                    showsHorizontalScrollIndicator={false}
                />

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Confirm Formation</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: { flexGrow: 1 },
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
    formation: { fontSize: 16, textAlign: 'center', marginBottom: 10 },
    header: { flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 10 },
    dropdownButton: { backgroundColor: '#4B0082', padding: 10, borderRadius: 8 },
    dropdownButtonText: { color: '#fff', fontWeight: 'bold' },
    modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10 },
    modalItem: { padding: 10, fontSize: 16 },
    fieldBackgroundContainer: { width: '100%', aspectRatio: 4 / 5, marginBottom: 20, position: 'relative', justifyContent: 'center', alignItems: 'center' },
    fieldBackgroundImage: { position: 'absolute', width: '100%', height: '100%', borderRadius: 20 },
    fieldOverlay: { flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' },
    playerContainer: { alignItems: 'center' },
    photo: { width: 50, height: 50, borderRadius: 25 },
    playerName: { fontSize: 12 },
    substitutesTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    button: { backgroundColor: '#4B0082', padding: 12, borderRadius: 8, marginTop: 10, alignItems: 'center' },
    buttonText: { color: '#fff', fontWeight: 'bold' },
    subCard: { backgroundColor: '#f0f0f0', padding: 10, borderRadius: 8, alignItems: 'center', marginRight: 10, width: 80 },
    subPhoto: { width: 50, height: 50, borderRadius: 25, marginBottom: 5 },
    subName: { fontSize: 14, fontWeight: '500', textAlign: 'center' },
});