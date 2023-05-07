import React, { useEffect, useRef } from 'react';
import { View, Animated, Text, StyleSheet, Image  } from 'react-native'

const LoadingScreen = () => {
  const opacityValue = useRef(new Animated.Value(0)).current
  const scaleValue = useRef(new Animated.Value(0)).current
  const bgOpacityValue = useRef(new Animated.Value(0)).current

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