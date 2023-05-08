import { StyleSheet, Text, View, TouchableOpacity, Switch } from "react-native"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { toggleTheme } from "../models/themereducer/themeReducer"
import { getThemeStyles } from "../utilities"
import { Entypo } from "@expo/vector-icons"
import SlideButton from "../components/SlideButton"

const SettingsScreen = () => {
  const dispatch = useDispatch()

  const theme = useSelector((state: RootState) => state.theme.value)
  const styles = getThemeStyles(theme)

  const slash = "/"

  return (
    <View style={[styles.container]}>
      <View style={{ flexDirection: "row", gap: 20 }}>
        <Entypo name="light-up" color="gray" size={30} />
        <SlideButton theme={theme} onPress={() => dispatch(toggleTheme())} />
        <Entypo name="moon" color="gray" size={30} />
      </View>
    </View>
  )
}

export default SettingsScreen

const style = StyleSheet.create({
  button: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "lightgray",
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 10,
  },
})
