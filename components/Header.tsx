import { View } from "react-native"
import React from "react"
import { Entypo } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native-gesture-handler"
import { colors } from "../constants/colors"
import { useNavigation } from "@react-navigation/native"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

const Header = () => {
  const navigation = useNavigation() as any
  const theme = useSelector((state: RootState) => state.theme.value)

  return (
    <View
      style={{
        height: 55,
        backgroundColor: theme === "dark" ? colors.gray : colors.purple,
        justifyContent: "flex-end",
        flexDirection: "row",
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
    </View>
  )
}

export default Header
