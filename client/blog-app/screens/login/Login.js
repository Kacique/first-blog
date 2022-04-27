import { View, Text, Pressable, TextInput } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import axios from "axios";
import styles from "./styles";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let urlString = "localhost";

  if (Platform.OS == "android") {
    urlString = "10.0.2.2";
  }

  const login = () => {
    axios
      .post(`http://${urlString}:5050/user/login`, {
        email: email,
        password: password,
      })
      .then(function (res) {
        props.navigation.navigate("Admin", {
          email: email,
        });
        console.log(res);
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
