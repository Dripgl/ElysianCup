import { Slot, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './lib/firebase';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import TabNavigation from '@/components/ui/TabNavigation';
import Navbar from '@/components/ui/Navbar';

export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     console.log('Auth state changed:', user);
  //     setUser(user);
  //     setLoading(true);
  //     if (user) {
  //       router.replace('/(tabs)');
  //     } else {
  //       router.replace('/login');
  //     }
  //   });
  //   return unsubscribe;
  // }, []);


  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Loading authentication...</Text>
      </View>
    );
  }
   return (
  <View style={{ flex: 1 }}>
    <Navbar /> 
    <View style={{ flex: 1 }}>
      <TabNavigation />  {/* O Slot se vuoi usare router dinamico */}
    </View>
  </View>
);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>Error: {error}</Text>
        <Text>Check your Firebase configuration or network connection.</Text>
      </View>
    );
  }

  return <Slot />;
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  error: { color: 'red', fontSize: 16, margin: 10 },
});
