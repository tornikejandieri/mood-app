import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface ModalState {
  value: any
}

const initialState: ModalState = {
  value: [],
}

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    data: (state, action: PayloadAction<any>) => {
      state.value = action.payload
    },
  },
})

export const { data } = historySlice.actions

export default historySlice.reducer
