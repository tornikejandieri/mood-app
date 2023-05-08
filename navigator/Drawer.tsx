import { createDrawerNavigator } from "@react-navigation/drawer"
import HomeScreen from "../screens/HomeScreen"
import StatisticsScreen from "../screens/StatisticsScreen"
import SettingsScreen from "../screens/SettingsScreen"
import { colors } from "../constants/colors"
import { StyleSheet } from "react-native"
import { Entypo } from "@expo/vector-icons"
import Header from "../components/Header"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  const theme = useSelector((state: RootState) => state.theme.value)

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveBackgroundColor:
          theme === "dark" ? colors.darkPurpleHighLight : colors.cyan,
        drawerActiveTintColor: theme === "dark" ? colors.cyan : colors.black,
        drawerItemStyle: styles.drawerItem,
        drawerStyle:
          theme === "dark"
            ? styles.drawerContainerDark
            : styles.drawerContainer,
        drawerInactiveTintColor: colors.white,
        drawerType: "front",
        drawerPosition: "right",
        header: () => <Header />,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: () => (
            <Entypo
              name="home"
              size={17}
              color={theme === "dark" ? colors.cyan : colors.black}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Mood History"
        component={StatisticsScreen}
        options={{
          drawerIcon: () => (
            <Entypo
              name="emoji-happy"
              size={17}
              color={theme === "dark" ? colors.cyan : colors.black}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: () => (
            <Entypo
              name="cog"
              size={17}
              color={theme === "dark" ? colors.cyan : colors.black}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator

const styles = StyleSheet.create({
  drawerItem: {
    padding: 10,
    fontWeight: "bold",
    borderRadius: 50,
  },
  drawerContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 20,
    backgroundColor: colors.purple,
  },
  drawerContainerDark: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 20,
    backgroundColor: colors.darkPurple,
  },
})
