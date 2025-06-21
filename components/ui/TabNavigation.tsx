import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import AdminScreen from '@/app/(tabs)/admin';
import HomeScreen from '../HomeScreen';
import MatchesScreen from '../MatchesScreen';
import TeamScreen from '../TeamScreen';
import TournamentsScreen from '../TournamentScreen';


const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  // Questi stati ora dipenderanno dai dati forniti dal tuo backend
  const [tournamentCount, setTournamentCount] = useState(0);
  const [matchCount, setMatchCount] = useState(0);

  useEffect(() => {
    // TODO: Qui dovrai fare le chiamate al tuo backend per ottenere il conteggio
    // di tornei e partite. Non più listener in tempo reale di Firebase.
    // Ad esempio:
    // const fetchCounts = async () => {
    //   try {
    //     const tournamentsResponse = await fetch('/api/tournaments/count');
    //     const tournamentsData = await tournamentsResponse.json();
    //     setTournamentCount(tournamentsData.count);

    //     const matchesResponse = await fetch('/api/matches/count');
    //     const matchesData = await matchesResponse.json();
    //     setMatchCount(matchesData.count);
    //   } catch (error) {
    //     console.error("Errore nel recupero dei conteggi:", error);
    //     // Puoi anche impostare un messaggio di errore o lasciare i conteggi a 0
    //   }
    // };

    // fetchCounts(); // Chiamata al backend al montaggio del componente

    // Le funzioni di unsubscribe di Firebase non sono più necessarie.
    // const unsubscribeTournaments = onSnapshot(collection(db, 'tournaments'), (snapshot) => {
    //   setTournamentCount(snapshot.size);
    // });

    // const unsubscribeMatches = onSnapshot(collection(db, 'matches'), (snapshot) => {
    //   setMatchCount(snapshot.size);
    // });

    // return () => {
    //   unsubscribeTournaments();
    //   unsubscribeMatches();
    // };
  }, []); // L'array vuoto assicura che questo effetto si esegua solo al montaggio

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
      tabBarActiveTintColor: '#4B0082',    // Viola acceso per colore attivo
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
          // Il badgeCount per ora sarà 0 finché non collegherai il backend
          tabBarIcon: ({ color, size }) => renderIconWithBadge('futbol-o', matchCount, color, size),
        }}
      />
      <Tab.Screen
        name="Team"
        component={TeamScreen}
        options={{
          // Il badgeCount per ora sarà 0 finché non collegherai il backend
          tabBarIcon: ({ color, size }) => renderIconWithBadge('shield', matchCount, color, size),
        }}
      />
      <Tab.Screen
        name="Tournaments"
        component={TournamentsScreen}
        options={{
          // Il badgeCount per ora sarà 0 finché non collegherai il backend
          tabBarIcon: ({ color, size }) => renderIconWithBadge('trophy', tournamentCount, color, size),
        }}
      />
      {/* Questi erano commentati, li lascio così. Se servono, andranno decommentati. */}
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
      {/* Hai un Tab.Screen "Account" che punta ad AdminScreen. Assicurati che sia quello che vuoi. */}
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