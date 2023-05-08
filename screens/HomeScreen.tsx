import { StyleSheet, View, Text, Image } from "react-native"
import React, { useState, useEffect } from "react"
import WelcomeMessage from "../components/WelcomeMessage"
import EmojiMoods from "../components/EmojiMoods"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { useIsFocused } from "@react-navigation/native"
import { getThemeStyles } from "../utilities"
import { colors } from "../constants/colors"
import Tomorrow from "../components/Tomorrow"

const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000

const HomeScreen = () => {
  const [lastEntryDate, setLastEntryDate] = useState<any>(null)

  const theme = useSelector((state: RootState) => state.theme.value)
  const styles = getThemeStyles(theme)

  const isFocused = useIsFocused()

  useEffect(() => {
    if (!isFocused) {
      return
    }
    const loadLastEntryDate = async () => {
      const date = await AsyncStorage.getItem("lastEntryDate")
      if (date) {
        setLastEntryDate(new Date(date))
      }
    }
    loadLastEntryDate()
  }, [isFocused])

  const isEntryAllowed = () => {
    if (!lastEntryDate) {
      return true
    }
    const timeSinceLastEntry = Date.now() - lastEntryDate.getTime()
    return timeSinceLastEntry >= ONE_DAY_IN_MILLISECONDS
  }

  const onMoodPress = (mood: string) => {
    const currentDate = new Date()
    AsyncStorage.setItem("lastEntryDate", currentDate.toISOString())
    setLastEntryDate(currentDate)
    const entry = { date: currentDate, mood: mood }
    AsyncStorage.setItem("dailyData", JSON.stringify(entry))
    console.log(`You selected ${mood}.`)
  }

  useEffect(() => {
    isEntryAllowed()
  }, [onMoodPress])

  return (
    <View style={[styles.container]}>
      {isEntryAllowed() ? (
        <>
          <WelcomeMessage theme={theme} styles={styles} />
          <EmojiMoods onMoodPress={onMoodPress} />
        </>
      ) : (
        <Tomorrow theme={theme} styles={styles} />
      )}
    </View>
  )
}

export default HomeScreen
