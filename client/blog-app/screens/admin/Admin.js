import { View, Text, Pressable, TextInput } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import styles from "./styles";

const Admin = (props) => {
  const { email } = props.route.params;

  return (
    <View style={styles.container}>
      <Text>Email: {JSON.stringify(email)}</Text>
    </View>
  );
};

export default Admin;
