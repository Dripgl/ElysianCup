import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { db } from '../../FirebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';


import HomeScreen from '../HomeScreen';
import MatchesScreen from '../MatchesScreen';
import TournamentsScreen from '../TournamentScreen';
import MarketScreen from '../MarketScreen';
import AccountScreen from '../AccountScreen';
import TeamScreen from '../TeamScreen';
import AdminScreen from '@/app/(tabs)/admin';


const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  const [tournamentCount, setTournamentCount] = useState(0);
  const [matchCount, setMatchCount] = useState(0);

  useEffect(() => {
    const unsubscribeTournaments = onSnapshot(collection(db, 'tournaments'), (snapshot) => {
      setTournamentCount(snapshot.size);
    });

    const unsubscribeMatches = onSnapshot(collection(db, 'matches'), (snapshot) => {
      setMatchCount(snapshot.size);
    });

    // Cleanup listener al dismount del componente
    return () => {
      unsubscribeTournaments();
      unsubscribeMatches();
    };
  }, []);

  const renderIconWithBadge = (iconName: keyof typeof FontAwesome.glyphMap, badgeCount: number, color: string, size: number) => (
    <View>
      <FontAwesome name={iconName} size={size} color={color} />
      {badgeCount > 0 && (
        <View style={{
          position: 'absolute',
          right: -6,
          top: -3,
          backgroundColor: 'red',
          borderRadius: 8,
          width: 16,
          height: 16,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{ color: 'white', fontSize: 10 }}>{badgeCount}</Text>
        </View>
      )}
    </View>
  );

  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#fff',
        borderTopColor: '#eee',
        borderTopWidth: 1,
        height: 70,
        paddingBottom: 10,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: 'bold',
      },
      tabBarActiveTintColor: '#4B0082',   // Viola acceso per colore attivo
      tabBarInactiveTintColor: '#999',
    }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <FontAwesome name="home" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Matches"
        component={MatchesScreen}
        options={{
          tabBarIcon: ({ color, size }) => renderIconWithBadge('futbol-o', matchCount, color, size),
        }}
      />
      <Tab.Screen
        name="Team"
        component={TeamScreen}
        options={{
          tabBarIcon: ({ color, size }) => renderIconWithBadge('shield', matchCount, color, size),
        }}
      />
      <Tab.Screen
        name="Tournaments"
        component={TournamentsScreen}
        options={{
          tabBarIcon: ({ color, size }) => renderIconWithBadge('trophy', tournamentCount, color, size),
        }}
      />
      {/* <Tab.Screen
        name="Market"
        component={MarketScreen}
        options={{
          tabBarIcon: ({ color, size }) => <FontAwesome name="shopping-cart" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color, size }) => <FontAwesome name="user" size={size} color={color} />,
        }}
      /> */}
      <Tab.Screen
        name="Account"
        component={AdminScreen}
        options={{
          tabBarIcon: ({ color, size }) => <FontAwesome name="user" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
