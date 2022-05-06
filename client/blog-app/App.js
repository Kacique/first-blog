import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./screens/home/Home";
import Login from "./screens/login/Login";
import Register from "./screens/register/Register";
import Admin from "./screens/admin/Admin";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { Platform } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  const [userData, setUserData] = useState({});
  const [blogData, setBlogData] = useState({});

  useEffect(() => {
    let UrlString = "localhost";

    if (Platform.OS == "android") {
      UrlString = "10.0.2.2";
    }

    AsyncStorage.getItem("token")
      .then((tokenRes) =>
        axios.get(`http://${UrlString}:5050/user`, {
          headers: { "x-auth-token": tokenRes },
        })
      )
      .then((userResponse) => setUserData(userResponse.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home">
          {(props) => (
            <Home
              {...props}
              userData={userData}
              setUserData={setUserData}
            ></Home>
          )}
        </Stack.Screen>
        <Stack.Screen name="Login">
          {(props) => (
            <Login
              {...props}
              userData={userData}
              setUserData={setUserData}
            ></Login>
          )}
        </Stack.Screen>
        <Stack.Screen name="Register">
          {(props) => <Register {...props}></Register>}
        </Stack.Screen>
        <Stack.Screen name="Admin">
          {(props) => (
            <Admin
              {...props}
              setUserData={setUserData}
              userData={userData}
              setBlogData={setBlogData}
              blogData={blogData}
            ></Admin>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
