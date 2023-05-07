import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import LoadingScreen from './screens/LoadingScreen';

export default function App() {
  return (
    <View style={{flex: 1}}>
      <StatusBar style="auto" />
      <LoadingScreen />
      {/* <HomeScreen /> */}
    </View>
  );
}


