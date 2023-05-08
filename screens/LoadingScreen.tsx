import React, { useEffect, useRef, useState } from "react"
import { View, Animated, Text, StyleSheet, Image } from "react-native"
import { emoji } from "../constants/data"
import { useIsFocused } from "@react-navigation/native"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { setThemeByValue } from "../models/themereducer/themeReducer"
import useRenderRef from "../custom hooks/useRenderRef"

const getRandomEmojis = () => {
  const randomIndices: any = []
  while (randomIndices.length < 3) {
    const randomIndex = Math.floor(Math.random() * emoji.length)
    if (!randomIndices.includes(randomIndex)) {
      randomIndices.push(randomIndex)
    }
  }
  return randomIndices.map((index: string | number) => emoji[index as any])
}

const LoadingScreen = (props: { navigation: any }) => {
  const [emojis, setEmojis] = useState(getRandomEmojis())

  const theme = useSelector((state: RootState) => state.theme.value)
  const dispatch = useDispatch()

  setTimeout(() => props.navigation.navigate("Drawer"), 4000)

  const isFocused = useIsFocused()

  useEffect(() => {
    const getData = async () => {
      const value = await AsyncStorage.getItem("theme")
      if (value !== null) {
        const parsedValue = JSON.parse(value)
        dispatch(setThemeByValue(parsedValue))
      }
    }
    getData()
  }, [])

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined
    if (isFocused) {
      interval = setInterval(() => setEmojis(getRandomEmojis()), 300)
    }

    return () => clearInterval(interval)
  }, [isFocused])

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 50 }}>{emojis}</Text>
    </View>
  )
}

export default LoadingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    position: "absolute",
    zIndex: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: 60,
    fontWeight: "bold",
  },
  backgroundImage: {
    position: "absolute",
    width: 200,
    height: 200,
  },
})
