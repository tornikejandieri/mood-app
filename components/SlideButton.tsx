import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import React from "react"
import { colors } from "../constants/colors"

interface Props {
  theme: string
  onPress: () => void
}

const SlideButton: React.FC<Props> = ({ theme, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View
        style={[
          styles.switchContainer,
          theme === "dark" && styles.switchContainerEnabled,
        ]}
      >
        <View
          style={[
            styles.switchButton,
            theme === "dark" && styles.switchButtonEnabled,
          ]}
        />
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
  switchButtonEnabled: {
    left: 30,
  },
})
