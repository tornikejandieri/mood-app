import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AnimatedButton from './AnimatedButton'
import { moodList } from '../constants/data'


interface Props {
  onMoodPress: (mood: string) => void
}

const EmojiMoods: React.FC<Props> = ({onMoodPress}) => {

  return (
    <View style={styles.container}>
      {moodList.map(i => (
        <View key={i.id}>
           <AnimatedButton onPress={() => onMoodPress(i.mood)}>
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
