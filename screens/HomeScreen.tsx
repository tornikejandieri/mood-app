import { View } from "react-native"
import React, { useState, useEffect } from "react"
import WelcomeMessage from "../components/WelcomeMessage"
import EmojiMoods from "../components/EmojiMoods"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { useIsFocused } from "@react-navigation/native"
import { getThemeStyles } from "../utilities"
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
      const item = await AsyncStorage.getItem("mData")
      if (item !== null) {
        const parsedItem = JSON.parse(item)
        setLastEntryDate(new Date(parsedItem.date.at(-1)))
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

  const onMoodPress = async (mood: string) => {
    try {
      const currentDate = new Date()
      const storedData = await AsyncStorage.getItem("mData")
      let data = {
        date: [] as any,
        mood: [] as any,
      }

      if (storedData) {
        data = JSON.parse(storedData)
      }

      data.date.push(currentDate)
      data.mood.push(mood)

      await AsyncStorage.setItem("mData", JSON.stringify(data))
    } catch (error) {
      console.error(error)
    }
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
