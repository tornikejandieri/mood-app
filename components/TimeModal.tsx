import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import React from "react"
import { dateFormatter } from "../helpers"
import { Entypo } from "@expo/vector-icons"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { colors } from "../constants/colors"

interface Props {
  date: string
  handleClose: any
}

const TimeModal: React.FC<Props> = ({ date, handleClose }) => {
  const theme = useSelector((state: RootState) => state.theme.value)

  return (
    <View
      style={{
        backgroundColor: theme === "dark" ? colors.modalGray : colors.white,
        width: 300,
        height: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
      }}
    >
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => handleClose()}
      >
        <Entypo name="cross" size={30} />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: theme === "dark" ? colors.disabled : colors.black,
        }}
      >
        {dateFormatter(date)}
      </Text>
    </View>
  )
}

export default TimeModal

const styles = StyleSheet.create({
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 50,
    height: 50,
    padding: 10,
  },
})
