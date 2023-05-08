import { StyleSheet, View, TouchableOpacity, Animated } from "react-native"
import React, { useEffect, useRef } from "react"
import { colors } from "../constants/colors"

interface Props {
  theme: string
  onPress: () => void
}

const SlideButton: React.FC<Props> = ({ theme, onPress }) => {
  const translateValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (theme === "dark") {
      translateValue.setValue(1)
    }
  }, [theme])

  const handlePress = () => {
    Animated.timing(translateValue, {
      toValue: theme === "dark" ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }

  const switchButtonStyle = {
    transform: [
      {
        translateX: translateValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 30],
        }),
      },
    ],
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePress}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.switchContainer,
          theme === "dark" && styles.switchContainerEnabled,
        ]}
      >
        <Animated.View style={[styles.switchButton, switchButtonStyle]} />
      </View>
    </TouchableOpacity>
  )
}

export default SlideButton

const styles = StyleSheet.create({
  switchContainer: {
    backgroundColor: colors.disabled,
    borderRadius: 15,
    height: 30,
    width: 60,
  },
  switchContainerEnabled: {
    backgroundColor: colors.green,
  },
  switchButton: {
    backgroundColor: colors.white,
    borderRadius: 15,
    height: 30,
    position: "absolute",
    width: 30,
  },
})
