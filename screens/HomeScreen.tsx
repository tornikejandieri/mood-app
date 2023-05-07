import { StyleSheet, View, Text, Image } from "react-native"
import React, { useState, useEffect } from "react"
import WelcomeMessage from "../components/WelcomeMessage"
import EmojiMoods from "../components/EmojiMoods"
import AsyncStorage from "@react-native-async-storage/async-storage"

const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000

const HomeScreen = (props: any) => {
  const [lastEntryDate, setLastEntryDate] = useState<any>(null)

  useEffect(() => {
    const loadLastEntryDate = async () => {
      const date = await AsyncStorage.getItem("lastEntryDate")
      if (date) {
        setLastEntryDate(new Date(date))
      }
    }
    loadLastEntryDate()
  }, [lastEntryDate])

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

  return (
    <View style={styles.container}>
      {isEntryAllowed() ? (
        <>
          <WelcomeMessage />
          <EmojiMoods onMoodPress={onMoodPress} />
        </>
      ) : (
        <>
          <Text style={{ fontSize: 16 }}>
            Come back tomorrow to enter your mood again
          </Text>
          <Image
            style={{ position: "absolute", bottom: "0%" }}
            source={require("../assets/megumin.gif")}
          />
        </>
      )}
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
