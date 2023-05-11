import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { colors } from "../constants/colors"
import { formatDate, minutesHoursAndDays } from "../helpers"
import { useIsFocused } from "@react-navigation/native"
import useRenderRef from "../custom hooks/useRenderRef"
import HalfScreenModal from "../components/HalfScreenModal"
import SlideButton from "../components/SlideButton"
import { toggleTheme } from "../models/themereducer/themeReducer"
import { Entypo } from "@expo/vector-icons"
import Notification from "../components/Notification"

import { TabView } from "react-native-tab-view"

const StatisticsScreen = () => {
  const [showTimeModal, setShowTimeModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState("")
  const theme = useSelector((state: RootState) => state.theme.value)
  const modal = useSelector((state: RootState) => state.modal.value)
  const dispatch = useDispatch()

  const [data, setData] = useState([])

  const isFocused = useIsFocused()

  const layout = useWindowDimensions()

  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
  ])

  useEffect(() => {
    const getData = async () => {
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
        <TouchableOpacity
          onPress={() => {
            setShowTimeModal(true)
            setSelectedDate(formatDate(item.date))
          }}
          style={{ flex: 1, paddingVertical: 10 }}
        >
          <Text
            style={{
              flex: 1,
              fontSize: 16,
              textAlign: "center",
              color: theme === "dark" ? colors.disabled : colors.black,
            }}
          >
            {item.date}
          </Text>
        </TouchableOpacity>

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

  const renderGridItem = ({
    item,
  }: {
    item: { mood: string; date: string }
  }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={{
          height: 150,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 0.5,
          marginHorizontal: 10,
          marginVertical: 5,
          borderColor: colors.disabled,
          borderRadius: 10,
          flex: 1,
        }}
        onPress={() => {
          setShowTimeModal(true)
          setSelectedDate(formatDate(item.date))
        }}
      >
        <Text
          style={{
            fontSize: 25,
            padding: 10,
            color: theme === "dark" ? colors.disabled : colors.black,
          }}
        >
          {item.mood}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: theme === "dark" ? colors.disabled : colors.black,
          }}
        >
          {item.date}
        </Text>
      </TouchableOpacity>
    )
  }

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.date + index}
            showsVerticalScrollIndicator={false}
          />
        )
      case "second":
        return (
          <FlatList
            data={data}
            renderItem={renderGridItem}
            keyExtractor={(item, index) => item.date + index}
            numColumns={2}
            showsVerticalScrollIndicator={false}
          />
        )
      default:
        return (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.date + index}
            showsVerticalScrollIndicator={false}
          />
        )
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme === "dark" ? colors.gray : colors.white,
      }}
    >
      <TabView
        renderTabBar={() => <></>}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
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
      {showTimeModal && (
        <Notification
          message={selectedDate}
          setShowTimeModal={setShowTimeModal}
        />
      )}
    </View>
  )
}

export default StatisticsScreen
