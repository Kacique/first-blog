import { View, Text, Pressable, TextInput, Platform } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import styles from "./styles";
import axios from "axios";

const Register = (props) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let urlString = "localhost";

  if (Platform.OS == "android") {
    urlString = "10.0.2.2";
  }

  const signup = () => {
    axios
      .post(`http://${urlString}:5050/user/register`, {
        userName: userName,
        email: email,
        password: password,
      })
      .then(function (res) {
        props.navigation.goBack();
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
        <Ionicons name="md-chevron-back" size={40} color="#f6f9ff" />
      </Pressable>

      <View style={styles.loginContainer}>
        <Text style={styles.header}>Sign Up</Text>
        <Text style={styles.loginText}>Your Username</Text>
        <TextInput
          style={styles.input}
          onChangeText={setUserName}
          value={userName}
        ></TextInput>
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
        ></TextInput>
      </View>

      <Pressable style={styles.loginButton} onPress={() => signup()}>
        <Text style={styles.loginButtonText}>SIGN UP</Text>
      </Pressable>
    </View>
  );
};

export default Register;
