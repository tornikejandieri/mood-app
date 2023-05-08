import { StyleSheet } from "react-native"
import { colors } from "./constants/colors"

const lightTheme = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.black,
  },
})

const darkTheme = StyleSheet.create({
  container: {
    backgroundColor: colors.gray,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.white,
  },
})

export const getThemeStyles = (themeValue: string) => {
  switch (themeValue) {
    case "light":
      return lightTheme
    case "dark":
      return darkTheme
    default:
      return lightTheme
  }
}
