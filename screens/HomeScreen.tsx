import { View } from "react-native"
import React, { useState, useEffect } from "react"
import WelcomeMessage from "../components/WelcomeMessage"
import EmojiMoods from "../components/EmojiMoods"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { useIsFocused } from "@react-navigation/native"
import { getThemeStyles } from "../utilities"
import Tomorrow from "../components/Tomorrow"
import useRenderRef from "../custom hooks/useRenderRef"
import HalfScreenModal from "../components/HalfScreenModal"
import SlideButton from "../components/SlideButton"
import { toggleTheme } from "../models/themereducer/themeReducer"
import { Entypo } from "@expo/vector-icons"
import { minutesHoursAndDays } from "../helpers"
import { data } from "../models/historyReducer/historyReducer"

const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000

const HomeScreen = () => {
  const [lastEntryDate, setLastEntryDate] = useState<any>(null)
  const modal = useSelector((state: RootState) => state.modal.value)

  const theme = useSelector((state: RootState) => state.theme.value)
  const styles = getThemeStyles(theme)

  const dispatch = useDispatch()
  const isFocused = useIsFocused()

  const getHistoryData = async () => {
    const moodData = await AsyncStorage.getItem("mData")
    if (moodData) {
      const parsedValue = JSON.parse(moodData)
      const moodArray = []
      for (let i = 0; i < parsedValue.mood.length; i++) {
        moodArray.push({
          mood: parsedValue.mood[i],
          date: minutesHoursAndDays(parsedValue.date[i]),
        })
      }
      dispatch(data(moodArray.reverse()))
    }
  }
  getHistoryData()

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
      setLastEntryDate(new Date(data.date.at(-1)))
      getHistoryData()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    isEntryAllowed()
  }, [onMoodPress, lastEntryDate])

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
      {modal && (
        <HalfScreenModal>
          <View style={{ flexDirection: "row", gap: 20 }}>
            <Entypo name="light-up" color="gray" size={30} />
            <SlideButton
              theme={theme}
              onPress={() => dispatch(toggleTheme())}
            />
            <Entypo name="moon" color="gray" size={30} />
          </View>
        </HalfScreenModal>
      )}
    </View>
  )
}

export default HomeScreen
