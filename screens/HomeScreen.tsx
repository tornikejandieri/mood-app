import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WelcomeMessage from '../components/WelcomeMessage'
import EmojiMoods from '../components/EmojiMoods'

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <WelcomeMessage />
      <EmojiMoods />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});