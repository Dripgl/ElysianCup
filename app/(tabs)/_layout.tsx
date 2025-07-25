import Navbar from '@/components/ui/Navbar';
import TabNavigation from '@/components/ui/TabNavigation';
import { View } from 'react-native';

export default function TabsLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Navbar />
      <View style={{ flex: 1 }}>
        <TabNavigation />
      </View>
    </View>
  );
}
