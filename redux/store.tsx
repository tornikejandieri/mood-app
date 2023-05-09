import { configureStore } from "@reduxjs/toolkit"
import themeReducer from "../models/themereducer/themeReducer"
import modalReducer from "../models/modalreducer/modalReducer"

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    modal: modalReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
