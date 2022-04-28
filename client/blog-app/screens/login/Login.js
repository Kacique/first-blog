import { View, Text, Pressable, TextInput, Platform } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import styles from "./styles";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (props.userData.id) props.navigation.navigate("Admin");
  }, [props.userData]);

  let urlString = "localhost";

  if (Platform.OS == "android") {
    urlString = "10.0.2.2";
  }

  const register = () => {
    props.navigation.navigate("Register");
  };

  const login = async () => {
    axios
      .post(`http://${urlString}:5050/user/login`, {
        email: email,
        password: password,
      })
      .then(function (res) {
        // use async storage to set an item with the key token to the value of the token that was received

        props.setUserData(res.data.user);
        return AsyncStorage.setItem("token", res.data.token);
      })
      .then(() => {
        console.log("Token saved");
        props.navigation.navigate("Admin");
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.backButton}
        onPress={() => props.navigation.goBack()}
      >
        <Ionicons name="md-chevron-back" size={40} color="#4caad5" />
      </Pressable>

      <View style={styles.loginContainer}>
        <Text style={styles.header}>Log In</Text>
        <Text style={styles.loginText}>Your Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
        ></TextInput>
        <Text style={styles.loginText}>Your Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        ></TextInput>
      </View>

      <Pressable style={styles.loginButton} onPress={() => login()}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </Pressable>
    </View>
  );
};

export default Login;
