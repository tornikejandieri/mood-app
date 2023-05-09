import StackNavigator from "./navigator/AppNavigator"
import "react-native-gesture-handler"
import { store } from "./redux/store"
import { Provider } from "react-redux"
import CustomStatusBar from "./components/CustomStatusBar"

export default function App() {
  return (
    <Provider store={store}>
      <CustomStatusBar />
      <StackNavigator />
    </Provider>
  )
}
