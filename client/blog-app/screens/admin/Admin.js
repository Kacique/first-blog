import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Platform,
  FlatList,
  Modal,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";

import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const Admin = (props) => {
  const [userBlogs, setUserBlogs] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [details, setDetails] = useState();
  const [itemIndex, setItemIndex] = useState();

  let UrlString = "localhost";

  if (Platform.OS == "android") {
    UrlString = "10.0.2.2";
  }

  useEffect(() => {
    if (!props.userData.id) {
      props.navigation.navigate("Login");
    }
  }, []);

  const loadToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      return token;
    } catch (error) {
      console.log("Load token error: ", error);
    }
  };

  const getPost = async () => {
    const token = await loadToken();
    const config = {
      headers: { "x-auth-token": token },
    };
    return axios
      .get(`http://${UrlString}:5050/blog`, config)
      .then(function (response) {
        setUserBlogs(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deletePost = async (id) => {
    await axios
      .put(`http://${UrlString}:5050/blog/delete`, {
        _id: id,
      })
      .then(function (res) {
        //console.log("This is res data ===>", res.data);
      })
      .then(() => {
        console.log("Blog post deleted.");
        setModalVisible(!modalVisible);
        getPost();
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const signOut = async () => {
    try {
      await AsyncStorage.clear();
      props.setUserData({});
    } catch (e) {
      console.log(e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getPost();
    }, [])
  );

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.flatlistContainer}>
        <Pressable
          onPress={() => {
            props.navigation.navigate("Blog", {
              item: item,
              index: index,
              //item: item._id,
            });
          }}
        >
          <View style={styles.dateContainer}>
            <Text style={styles.blogDate}>{item.date}</Text>
            <Pressable
              style={styles.blogOptions}
              onPress={() => {
                setModalVisible(true);
                setDetails(item);
                setItemIndex(index);
              }}
            >
              <MaterialCommunityIcons
                name="dots-horizontal"
                size={28}
                color="#b2bec3"
              />
            </Pressable>
          </View>
          <Text style={styles.blogTitle}>{item.subject}</Text>
          <Text numberOfLines={2} style={styles.blogText}>
            {item.text}
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.navContainer}>
        <Pressable
          style={styles.backButton}
          onPress={() => props.navigation.navigate("Home")}
        >
          <Ionicons name="md-chevron-back" size={40} color="#f6f9ff" />
        </Pressable>

        <TouchableOpacity
          style={styles.signOutButton}
          onPress={() => signOut()}
        >
          <Text>
            <FontAwesome name="sign-out" size={36} color="#E64F2C" />
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.blogContainer}>
        <Text style={styles.blogHeader}>Your Blogs</Text>
      </View>
      <FlatList
        data={userBlogs}
        style={styles.flatlist}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

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
            <View style={styles.buttonContainer}>
              <View style={styles.editButton}>
                <TouchableOpacity style={styles.modalButton}>
                  <Text
                    style={styles.modalText}
                    onPress={() => {
                      props.navigation.navigate("Edit", {
                        details: details,
                        itemIndex: itemIndex,
                      });
                      setModalVisible(!modalVisible);
                    }}
                  >
                    Edit{" "}
                    <FontAwesome
                      name="pencil-square-o"
                      size={30}
                      color="#008DD5"
                    />
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.deleteButton}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => deletePost(details._id)}
                >
                  <Text style={styles.modalText}>
                    Delete{" "}
                    <FontAwesome name="trash" size={30} color="#E64F2C" />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Admin;
