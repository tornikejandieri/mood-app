import React, { useState, useEffect } from "react"
import { Animated, Text, View } from "react-native"
import { colors } from "../constants/colors"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

const Notification = ({ message, duration = 3000, setShowTimeModal }) => {
  const [slideAnim] = useState(new Animated.Value(-100))

  const theme = useSelector((state: RootState) => state.theme.value)

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start()

    const timer = setTimeout(() => {
      handleClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: -100,
      duration: 500,
      useNativeDriver: true,
    }).start(() => setShowTimeModal(false))
  }

  return (
    <Animated.View
      style={{
        position: "absolute",
        alignSelf: "center",
        width: "70%",
        transform: [{ translateY: slideAnim }],
      }}
    >
      <View
        style={{
          backgroundColor: theme === "dark" ? colors.disabled : colors.white,
          padding: 16,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 30,
          shadowColor: colors.darkGray,
          shadowOpacity: 0.5,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 5 },
          elevation: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: theme === "dark" ? colors.gray : colors.black,
          }}
        >
          {message}
        </Text>
      </View>
    </Animated.View>
  )
}

export default Notification
