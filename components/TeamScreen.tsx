import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Modal, Pressable } from 'react-native';

const mockPlayers = [
    { id: '1', name: 'Leo', surname: 'Messi', position: 'Forward', photo: 'https://via.placeholder.com/50' },
    { id: '2', name: 'Cristiano', surname: 'Ronaldo', position: 'Forward', photo: 'https://via.placeholder.com/50' },
    { id: '3', name: 'Luka', surname: 'Modric', position: 'Midfielder', photo: 'https://via.placeholder.com/50' },
    { id: '4', name: 'Virgil', surname: 'Van Dijk', position: 'Defender', photo: 'https://via.placeholder.com/50' },
    { id: '5', name: 'Manuel', surname: 'Neuer', position: 'Goalkeeper', photo: 'https://via.placeholder.com/50' },
    { id: '6', name: 'Kylian', surname: 'Mbappé', position: 'Forward', photo: 'https://via.placeholder.com/50' },
    { id: '7', name: 'Neymar', surname: 'Jr', position: 'Midfielder', photo: 'https://via.placeholder.com/50' },
];

const mockSubstitutes = [
    { id: '8', name: 'Weah', surname: '', role: 'C', photo: 'https://via.placeholder.com/50' },
    { id: '9', name: 'Lucca', surname: '', role: 'A', photo: 'https://via.placeholder.com/50' },
    { id: '10', name: 'Caprari', surname: '', role: 'A', photo: 'https://via.placeholder.com/50' },
];

export default function FormationScreen() {
    const [formation, setFormation] = useState('1-4-1');
    const [modalVisible, setModalVisible] = useState(false);

    const getFormationLayout = () => {
        switch (formation) {
            case '1-4-1':
                return [
                    [{ position: 'Goalkeeper', count: 1 }],
                    [{ position: 'Defender', count: 4 }],
                    [{ position: 'Midfielder', count: 1 }],
                    [{ position: 'Forward', count: 1 }],
                ];
            case '2-3-1':
                return [
                    [{ position: 'Goalkeeper', count: 1 }],
                    [{ position: 'Defender', count: 2 }],
                    [{ position: 'Midfielder', count: 3 }],
                    [{ position: 'Forward', count: 1 }],
                ];
            case '3-1-2':
                return [
                    [{ position: 'Goalkeeper', count: 1 }],
                    [{ position: 'Defender', count: 3 }],
                    [{ position: 'Midfielder', count: 1 }],
                    [{ position: 'Forward', count: 2 }],
                ];
            default:
                return [];
        }
    };

    let playerIndex = 0;

    return (
        <View style={styles.container}>

            <Text style={styles.title}>My Formation</Text>
            <Text style={styles.formation}>Current Formation: {formation}</Text>
            {/* Modulo attuale e menu a tendina */}
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

            {/* Campo con layout dinamico */}
            <View style={styles.field}>
                {getFormationLayout().map((line, lineIndex) => (
                    <View key={lineIndex} style={styles.line}>
                        {Array.from({ length: line[0].count }).map((_, i) => {
                            const player = mockPlayers[playerIndex % mockPlayers.length];
                            playerIndex++;
                            return (
                                <View key={i} style={styles.playerContainer}>
                                    <Image source={{ uri: player.photo }} style={styles.photo} />
                                    <Text style={styles.playerName}>{player.name}</Text>
                                </View>
                            );
                        })}
                    </View>
                ))}
            </View>

            {/* Lista giocatori disponibili */}
            <Text style={styles.substitutesTitle}>Substitutes</Text>
            <FlatList
                horizontal
                data={mockSubstitutes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.subCard}>
                        <Image source={{ uri: item.photo }} style={styles.subPhoto} />
                        <View style={styles.roleCircle}>
                            <Text style={styles.roleText}>{item.role}</Text>
                        </View>
                        <Text style={styles.subName}>{item.name}</Text>
                    </View>
                )}
                showsHorizontalScrollIndicator={false}
            />

            {/* Pulsanti */}
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Confirm Formation</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
    formation: { fontSize: 16, textAlign: 'center', marginBottom: 10 },
    header: { flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 10 },
    dropdownButton: { backgroundColor: '#4B0082', padding: 10, borderRadius: 8 },
    dropdownButtonText: { color: '#fff', fontWeight: 'bold' },
    modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10 },
    modalItem: { padding: 10, fontSize: 16 },
    field: { backgroundColor: '#e0e0e0', borderRadius: 20, padding: 10, marginBottom: 20 },
    line: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
    playerContainer: { alignItems: 'center' },
    photo: { width: 50, height: 50, borderRadius: 25 },
    playerName: { fontSize: 12 },
    substitutesTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    button: { backgroundColor: '#4B0082', padding: 12, borderRadius: 8, marginTop: 10, alignItems: 'center' },
    buttonText: { color: '#fff', fontWeight: 'bold' },
    subCard: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginRight: 10,
        width: 80,
    },
    subPhoto: { width: 50, height: 50, borderRadius: 25, marginBottom: 5 },
    roleCircle: {
        backgroundColor: '#4B0082',
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 2,
        marginBottom: 3,
    },
    roleText: { color: '#fff', fontSize: 12 },
    subName: { fontSize: 14, fontWeight: '500', textAlign: 'center' },

});

