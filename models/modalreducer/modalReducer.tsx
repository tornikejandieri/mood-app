import AsyncStorage from "@react-native-async-storage/async-storage"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface ModalState {
  value: boolean
}

const initialState: ModalState = {
  value: false,
}

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    visible: (state) => {
      state.value = state.value == false ? true : false
    },
  },
})

export const { visible } = modalSlice.actions

export default modalSlice.reducer
