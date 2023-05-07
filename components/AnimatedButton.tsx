import { StyleSheet, TouchableOpacity, Animated } from "react-native"
import React, { useRef } from "react"
import { colors } from "../constants/colors"

interface Props {
  children: React.ReactNode
  onPress: () => void
}

const AnimatedButton: React.FC<Props> = ({ children, onPress }) => {
  const scaleRef = useRef(new Animated.Value(1)).current
  const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity)

  const handlePressIn = () => {
    Animated.spring(scaleRef, {
      toValue: 0.8,
      useNativeDriver: true,
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(scaleRef, {
      toValue: 1,
      useNativeDriver: true,
    }).start()
  }

  return (
    <AnimatedTouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.buttonStyle, { transform: [{ scale: scaleRef }] }]}
    >
      {children}
    </AnimatedTouchableOpacity>
  )
}

export default AnimatedButton

const styles = StyleSheet.create({
  buttonStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    border: "none",
    borderRadius: 50,
    marginHorizontal: 5,
    marginVertical: 2,
    backgroundColor: colors.cyan,
  },
})
