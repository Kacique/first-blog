import { View, Text, Pressable, TextInput } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./styles";

const Admin = (props) => {
  useEffect(() => {
    if (!props.userData.id) {
      props.navigation.navigate("Login");
    }
  });

  return (
    <View style={styles.container}>
      <Text>Hi im Admin</Text>
      <Pressable
        onPress={async () => {
          await AsyncStorage.setItem("token", "");
          props.setUserData({});
        }}
      >
        <Text>Log out</Text>
      </Pressable>
    </View>
  );
};

export default Admin;
