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

const Edit = (props) => {
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");

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
        props.setBlogData(res.data.blog); //blogs
        //console.log(res.data.blog);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const getPost = async () => {
    const token = await loadToken();
    const config = {
      headers: { "x-auth-token": token },
    };
    return (
      axios
        .get(`http://${UrlString}:5050/blog`, config)
        // {
        //   authorId: props.userData.id,
        // }
        .then(function (response) {
          // setToken(response);
          //console.log(response.data);
          props.setBlogData(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
    );
  };

  useEffect(() => {
    if (!props.userData.id) {
      props.navigation.navigate("Login");
    }
  }, []);

  useEffect(() => {
    getPost();
  }, []);

  //console.log(props.userData);
  //console.log(props.blogData);

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
        <View>
          <FlatList
            data={allBlog}
            renderItem={({ item }, index) => (
              <View style={styles.flatList}>
                <Text>{item.subject}</Text>
                <Text>{item.text}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </View>
  );
};

export default Edit;
