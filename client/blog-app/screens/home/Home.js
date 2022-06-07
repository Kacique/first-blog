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
import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import styles from "./styles";

const Home = (props) => {
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [isEmpty, setIsEmpty] = useState();

  const [modalVisible, setModalVisible] = useState(false);

  let UrlString = "localhost";

  if (Platform.OS == "android") {
    UrlString = "10.0.2.2";
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const d = new Date();
  let month = monthNames[d.getMonth()];
  let day = d.getDate();
  let year = d.getFullYear();

  let datePosted = `${month} ${day}, ${year}`;

  const loadToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      return token;
    } catch (error) {
      console.log("Load token error: ", error);
    }
    //return token;
  };

  const getPost = async () => {
    const token = await loadToken();
    const config = {
      headers: { "x-auth-token": token },
    };
    return axios
      .get(`http://${UrlString}:5050/blog/all`, config)
      .then(function (response) {
        props.setBlogData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
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
          subject: subject,
          text: text,
          authorId: props.userData.id,
          userName: props.userData.userName,
          date: datePosted,
        },
        config
      )
      .then(function (res) {
        //props.setBlogData(res.data); //blogs
        //props.navigation.navigate("Profile");
        getPost();
        setModalVisible(!modalVisible);
        setSubject("");
        setText("");
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  useEffect(
    () => {
      if (!props.userData.id) {
        props.navigation.navigate("Login");
      }
    },
    [
      /**props.userData */
    ]
  );

  useFocusEffect(
    useCallback(() => {
      getPost();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => {
            props.navigation.navigate("Admin");
          }}
        >
          <Text>
            <Ionicons
              name="md-person-circle-outline"
              size={36}
              color="#008DD5"
            />
          </Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>
          Welcome back {props.userData.userName}
        </Text>
      </View>
      <View style={styles.latestContainer}>
        <Text style={styles.latestHeader}>Latest Blogs</Text>
      </View>

      {isEmpty ? (
        <></>
      ) : (
        <FlatList
          data={props.blogData.reverse()}
          style={styles.flatlist}
          //inverted={true}
          renderItem={({ item, index }) => (
            <View key={index} style={styles.flatlistContainer}>
              <Pressable
                onPress={() => {
                  props.navigation.navigate("Blog", {
                    item: item,
                    index: index,
                    //item: item._id,
                  });
                }}
              >
                <View style={styles.blogInfo}>
                  <Text style={styles.blogAuthor}>{item.userName}</Text>
                  <Text style={styles.blogDot}>·</Text>
                  <Text style={styles.blogDate}>{item.date}</Text>
                </View>

                <Text style={styles.blogTitle}>{item.subject}</Text>
                <Text numberOfLines={2} style={styles.blogText}>
                  {item.text}
                </Text>
              </Pressable>
            </View>
          )}
          keyExtractor={(item) => item._id}
          //keyExtractor={(index) => index.toString()}
        />
      )}

      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.modalButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.modalText}>
            <AntDesign name="pluscircle" size={50} color="#008DD5" />
          </Text>
        </Pressable>
      </View>

      <Modal
        statusBarTranslucent={true}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.closeModal}>
              <Pressable
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text>
                  <AntDesign name="closecircleo" size={24} color="#e55039" />
                </Text>
              </Pressable>
            </View>
            <TouchableOpacity style={styles.blogContent}>
              <Text style={styles.modalTitle}>Title</Text>
              <TextInput
                placeholder="Type your title here"
                value={subject}
                onChangeText={setSubject}
                style={styles.modalTextInput}
              />
              <Text style={styles.modalTitle}>Body</Text>
              <TextInput
                placeholder="Tell your story..."
                value={text}
                onChangeText={setText}
                multiline={true}
                style={styles.modalTextInput}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.publishButton}
              onPress={() => addPost()}
            >
              <Text style={styles.publishText}>Publish</Text>
              <FontAwesome name="pencil-square-o" size={24} color="#DFF3E4" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Home;
