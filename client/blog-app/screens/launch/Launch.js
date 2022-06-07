import { View, Text, ImageBackground, Pressable } from "react-native";
import { useEffect, useState } from "react";

import styles from "./styles";

const backgroundImg =
  "/home/william/Documents/full_stack/first_blog/client/blog-app/assets/background.png";

const Launch = (props) => {
  const [searching, setSearching] = useState(true);

  useEffect(() => {
    if (props.userData.id) props.navigation.navigate("Home");
  }, [props.userData]);

  return (
    <View style={styles.container}>
      {searching ? (
        <ImageBackground
          source={require(backgroundImg)}
          resizeMode="cover"
          style={styles.background}
        >
          <Text style={styles.logoText}>Chatter</Text>
          <Pressable
            style={styles.registerButton}
            onPress={() => props.navigation.navigate("Register")}
          >
            <Text style={styles.registerText}>Sign Up</Text>
          </Pressable>
          <Pressable
            style={styles.loginButton}
            onPress={() => props.navigation.navigate("Login")}
          >
            <Text style={styles.loginText}>Login</Text>
          </Pressable>
        </ImageBackground>
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default Launch;
