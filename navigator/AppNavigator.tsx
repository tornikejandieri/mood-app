import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"
import HomeScreen from "../screens/HomeScreen"
import LoadingScreen from "../screens/LoadingScreen"
import { colors } from "../constants/colors"

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoadingScreen"
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerTitle: "Home",
            headerStyle: { backgroundColor: colors.purple },
            headerBackVisible: false,
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator
