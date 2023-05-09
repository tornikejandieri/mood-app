import { View } from "react-native"
import React from "react"
import { Entypo } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native-gesture-handler"
import { colors } from "../constants/colors"
import { useNavigation } from "@react-navigation/native"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { visible } from "../models/modalreducer/modalReducer"

const Header = () => {
  const navigation = useNavigation() as any
  const theme = useSelector((state: RootState) => state.theme.value)
  const dispatch = useDispatch()

  return (
    <View
      style={{
        height: 55,
        backgroundColor: theme === "dark" ? colors.darkGray : colors.sidebar,
        justifyContent: "space-between",
        flexDirection: "row-reverse",
      }}
    >
      <TouchableOpacity
        style={{
          paddingVertical: 10,
          paddingHorizontal: 15,
        }}
        onPress={() => navigation.openDrawer()}
      >
        <Entypo name="menu" size={40} color={colors.cyan} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ paddingHorizontal: 15, marginTop: 15 }}
        onPress={() => dispatch(visible())}
      >
        <Entypo name="cog" size={30} color={colors.cyan} />
      </TouchableOpacity>
    </View>
  )
}

export default Header
