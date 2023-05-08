import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { getThemeStyles } from "../utilities"

const StatisticsScreen = () => {
  const theme = useSelector((state: RootState) => state.theme.value)
  const styles = getThemeStyles(theme)

  return (
    <View style={[styles.container]}>
      <Text>StatisticsScreen</Text>
    </View>
  )
}

export default StatisticsScreen

const styles = StyleSheet.create({})
