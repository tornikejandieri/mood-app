import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native'
import React, { useRef } from 'react'
import { colors } from '../constants/colors'
import AnimatedButton from './AnimatedButton'
import { moodList } from '../constants/data'

const EmojiMoods = () => {

  return (
    <View style={styles.container}>
      {moodList.map(i => (
        <View key={i.id}>
           <AnimatedButton onPress={() => console.log(i.mood)}>
              <Text style={{fontSize: 40}}>{i.emoji}</Text>
              <Text style={{fontSize: 16}}>{i.mood}</Text>
           </AnimatedButton>
        </View>
      ))}
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

})
