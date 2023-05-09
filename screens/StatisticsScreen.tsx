import { Alert, FlatList, Text, View } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { colors } from "../constants/colors"
import { dateFormatter } from "../helpers"
import { useFocusEffect, useIsFocused } from "@react-navigation/native"
import useRenderRef from "../custom hooks/useRenderRef"
import HalfScreenModal from "../components/HalfScreenModal"
import SlideButton from "../components/SlideButton"
import { toggleTheme } from "../models/themereducer/themeReducer"
import { Entypo } from "@expo/vector-icons"

const StatisticsScreen = () => {
  const theme = useSelector((state: RootState) => state.theme.value)
  const modal = useSelector((state: RootState) => state.modal.value)
  const dispatch = useDispatch()

  const [data, setData] = useState([])

  const isFocused = useIsFocused()

  useEffect(() => {
    const getData = async () => {
      const moodData = await AsyncStorage.getItem("mData")
      if (moodData) {
        const parsedValue = JSON.parse(moodData)
        const moodArray = []
        for (let i = 0; i < parsedValue.mood.length; i++) {
          moodArray.push({
            mood: parsedValue.mood[i],
            date: parsedValue.date[i],
          })
        }
        setData(moodArray.reverse())
      }
    }
    getData()
  }, [isFocused])

  const renderItem = ({ item }: { item: { mood: string; date: string } }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderBottomWidth: 0.5,
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

export default StatisticsScreen
