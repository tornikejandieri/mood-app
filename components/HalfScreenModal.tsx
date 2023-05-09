import React, { useState } from "react"
import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { visible } from "../models/modalreducer/modalReducer"
import { colors } from "../constants/colors"
import { Entypo } from "@expo/vector-icons"

const HalfScreenModal = ({ children }: any) => {
  const theme = useSelector((state: RootState) => state.theme.value)
  const modal = useSelector((state: RootState) => state.modal.value)
  const dispatch = useDispatch()

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modal}
      onRequestClose={() => {
        dispatch(visible())
      }}
    >
      <View style={styles.centeredView}>
        <View
          style={[
            styles.modalView,
            {
              backgroundColor:
                theme === "dark" ? colors.modalGray : colors.white,
            },
          ]}
        >
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              dispatch(visible())
            }}
          >
            <Entypo name="cross" size={30} />
          </TouchableOpacity>
          <View style={styles.modalContent}>{children}</View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 50,
    height: 50,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default HalfScreenModal
