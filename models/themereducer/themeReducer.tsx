import AsyncStorage from "@react-native-async-storage/async-storage"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface ThemeState {
  value: string
}

const initialState: ThemeState = {
  value: "light",
}

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.value = state.value === "light" ? "dark" : "light"
      AsyncStorage.setItem("theme", JSON.stringify(state.value))
    },
    setThemeByValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  },
})

export const { toggleTheme, setThemeByValue } = themeSlice.actions

export default themeSlice.reducer
