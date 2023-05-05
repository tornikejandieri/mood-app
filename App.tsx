import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeMessage from './components/WelcomeMessage';
import EmojiMoods from './components/EmojiMoods';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <WelcomeMessage />
      <EmojiMoods />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
