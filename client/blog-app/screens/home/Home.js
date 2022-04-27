import { View, Text, ImageBackground, Pressable } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles";

const backgroundImg =
  "/home/william/Documents/full_stack/first_blog/client/blog-app/assets/background.png";

const Home = (props) => {
  const [searching, setSearching] = useState(true);
  //const [users, setUsers] = useState({});
  /*
  const getUsers = () => {
    (async () => {
      try {
        const userResponse =
          Platform.OS === "web"
            ? await axios.get(`http://localhost:5050/`)
            : await axios.get(`http://10.0.2.2:5050/}`);

        setSearching(true);
        //setUsers(userResponse.data);
        console.log("This is our data ===>", userResponse);
      } catch (err) {
        console.log(err);
      }
    })();
  };

  useEffect(() => {
    getUsers();
  }, []);
*/
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

export default Home;
