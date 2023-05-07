import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, Text, StyleSheet, Image  } from 'react-native'
import { emoji } from '../constants/data';

const getRandomEmojis = () => {
  const randomIndices: any = []
  while (randomIndices.length < 3) {
    const randomIndex = Math.floor(Math.random() * emoji.length)
    if (!randomIndices.includes(randomIndex)) {
      randomIndices.push(randomIndex)
    }
  }
  return randomIndices.map((index: string | number) => emoji[index as any] )
}


const LoadingScreen = () => {
  const opacityValue = useRef(new Animated.Value(0)).current
  const scaleValue = useRef(new Animated.Value(0)).current
  const bgOpacityValue = useRef(new Animated.Value(0)).current
  const [emojis, setEmojis] = useState(getRandomEmojis())

  useEffect(() => {
   const interval = setInterval(() => setEmojis(getRandomEmojis()), 500)

    return () => clearInterval(interval)
  }, [])


  useEffect(() => {
    Animated.sequence([
      Animated.timing(bgOpacityValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scaleValue, {
        toValue: .3,
        friction: 2,
        useNativeDriver: true
      }),
    ]).start()
  }, [])

  return (
    <View style={styles.container}>
      <Animated.Image source={require('../assets/khasiati-app-logo.png')} style={[styles.logoContainer, { opacity: opacityValue, transform: [{ scale: scaleValue }] }]} />
      <Animated.Image source={require('../assets/rainbow.png')} style={[styles.backgroundImage, { opacity: bgOpacityValue }]} />
      <View style={{display: 'flex', flexDirection: 'row', position: 'absolute', bottom: '20%'}}>
        <Text style={{fontSize: 50}}>{emojis}</Text>
      </View>
    </View>
  );
}

export default LoadingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    position: 'absolute',
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 60,
    fontWeight: 'bold',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});