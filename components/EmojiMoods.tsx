import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'

const EmojiMoods = () => {
  const moodList = [
    { id: 1, mood: 'Happy', emoji: '😊' },
    { id: 2, mood: 'Sad', emoji: '😢' },
    { id: 3, mood: 'Angry', emoji: '🤬' },
    { id: 4, mood: 'Anxious', emoji: '😨' },
    { id: 5, mood: 'Excited', emoji: '🤩' },
    { id: 6, mood: 'Calm', emoji: '😌' },
    { id: 7, mood: 'Stressed', emoji: '😖' },
    { id: 8, mood: 'Neutral', emoji: '😐' },
    { id: 9, mood: 'Bored', emoji: '😑' },
  ]
  
  
  return (
    <View style={styles.container}>
      {
        moodList.map(i => (
          <View key={i.id}>
            <TouchableOpacity style={styles.buttonStyle}>
              <Text style={{fontSize: 40}}>{i.emoji}</Text>
              <Text>{i.mood}</Text>
            </TouchableOpacity>
          </View>
        ))
      }
    </View>
  )
}

export default EmojiMoods

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  buttonStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderWidth: 5,
    borderColor: colors.cyan,
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 2
  }
})