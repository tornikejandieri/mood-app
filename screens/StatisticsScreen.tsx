import { FlatList, Text, View } from "react-native"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { colors } from "../constants/colors"
import { dateFormatter } from "../helpers"

const StatisticsScreen = () => {
  const theme = useSelector((state: RootState) => state.theme.value)

  const [data, setData] = useState([])

  useEffect(() => {
    const getData = async () => {
      const moodData = await AsyncStorage.getItem("dailyData")
      if (moodData) {
        const parsedValue = JSON.parse(moodData)
        setData([parsedValue])
      }
    }
    getData()
  }, [])

  const renderItem = ({ item }: { item: { mood: string; date: string } }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderBottomWidth: 1,
          borderBottomColor: colors.disabled,
        }}
      >
        <Text
          style={{
            flex: 1,
            fontSize: 16,
            textAlign: "center",
            color: theme === "dark" ? colors.disabled : colors.black,
          }}
        >
          {dateFormatter(item.date)}
        </Text>
        <Text
          style={{
            flex: 1,
            fontSize: 16,
            textAlign: "center",
            color: theme === "dark" ? colors.disabled : colors.black,
          }}
        >
          {item.mood}
        </Text>
      </View>
    )
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme === "dark" ? colors.gray : colors.white,
      }}
    >
      {data.length > 0 && (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.date}
        />
      )}
    </View>
  )
}

export default StatisticsScreen
