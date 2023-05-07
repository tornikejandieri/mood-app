import { createDrawerNavigator } from "@react-navigation/drawer"
import HomeScreen from "../screens/HomeScreen"
import StatisticsScreen from "../screens/StatisticsScreen"
import SettingsScreen from "../screens/SettingsScreen"
import { colors } from "../constants/colors"
import { StyleSheet } from "react-native"
import { Entypo } from "@expo/vector-icons"
import Header from "../components/Header"

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveBackgroundColor: colors.cyan,
        drawerActiveTintColor: colors.black,
        drawerItemStyle: styles.drawerItem,
        drawerStyle: styles.drawerContainer,
        drawerInactiveTintColor: colors.white,
        drawerType: "front",
        drawerPosition: "right",
        header: () => <Header />,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ drawerIcon: () => <Entypo name="home" size={17} /> }}
      />
      <Drawer.Screen
        name="Previous Moods"
        component={StatisticsScreen}
        options={{ drawerIcon: () => <Entypo name="emoji-happy" size={17} /> }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: () => <Entypo name="cog" size={17} />,
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
})
