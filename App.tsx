import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  return (
    <View style={{flex: 1}}>
      <StatusBar style="auto" />
      <HomeScreen />
    </View>
  );
}


