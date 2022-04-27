import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/home/Home";
import Login from "./screens/login/Login";
import Register from "./screens/register/Register";
import Admin from "./screens/admin/Admin";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home">
          {(props) => <Home {...props}></Home>}
        </Stack.Screen>
        <Stack.Screen name="Login">
          {(props) => <Login {...props}></Login>}
        </Stack.Screen>
        <Stack.Screen name="Register">
          {(props) => <Register {...props}></Register>}
        </Stack.Screen>
        <Stack.Screen name="Admin">
          {(props) => <Admin {...props}></Admin>}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
