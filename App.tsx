import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeMessage from './components/WelcomeMessage';
import EmojiMoods from './components/EmojiMoods';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  return (
    <View style={{flex: 1}}>
      <StatusBar style="auto" />
      <HomeScreen />
    </View>
  );
}


