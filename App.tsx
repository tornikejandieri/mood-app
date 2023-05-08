import StackNavigator from "./navigator/AppNavigator"
import "react-native-gesture-handler"
import { store } from "./redux/store"
import { Provider } from "react-redux"

export default function App() {
  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  )
}
