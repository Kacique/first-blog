import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
  Platform,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./styles";

const Admin = (props) => {
  const [userName, setUserName] = useState("");
  const [blog, setBlog] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [allBlog, setAllBlog] = useState("");
  const [posted, setPosted] = useState(false);
  const [token, setToken] = useState("");

  let UrlString = "localhost";

  if (Platform.OS == "android") {
    UrlString = "10.0.2.2";
  }

  const loadToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log(token);
      return token;
    } catch (error) {
      console.log("Load token error: ", error);
    }
    //return token;
  };
  /*
  const addPost = async (subject, text) => {
    const token = await loadToken();
    const config = {
      headers: { "x-auth-token": token },
    };
    axios
      .post(
        `http://${UrlString}:5050/blog/new`,
        {
          //headers: { "x-auth-token": tokenRes },
          subject: subject,
          text: text,
          authorId: props.userData.id,
        },
        config
      )
      .then(function (res) {
        // use async storage to set an item with the key and value

        props.setBlogData(res.data.user);
        return AsyncStorage.setItem("subject", res.data.subject);
        //AsyncStorage.setItem("text", res.data.text);
        //AsyncStorage.setItem("authorId", res.data.authorId);
      })
      .then(() => {
        console.log("Blog post saved");
      })
      .catch(function (err) {
        console.log(err);
      });
  };
*/

  const addPost = async () => {
    const token = await loadToken();
    const config = {
      headers: { "x-auth-token": token },
    };
    axios
      .post(
        `http://${UrlString}:5050/blog/new`,
        {
          //headers: { "x-auth-token": tokenRes },
          subject: subject,
          text: text,
          authorId: props.userData.id,
        },
        config
      )
      .then(function (res) {
        console.log(res.data); //blogs
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!props.userData.id) {
      props.navigation.navigate("Login");
    }
  }, []);

  console.log(props.userData);

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <Text>Welcome🤠</Text>

        <TextInput
          placeholder="Title"
          value={subject}
          onChangeText={setSubject}
        />

        <TextInput
          placeholder="type your blog here"
          value={text}
          onChangeText={setText}
        />

        <Pressable onPress={() => addPost()}>
          <Text>Create Blog</Text>
        </Pressable>

        {/* <FlatlList
            
            /> */}
      </View>
    </View>
  );
};

export default Admin;
