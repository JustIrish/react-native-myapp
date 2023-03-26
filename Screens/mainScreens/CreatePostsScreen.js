import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import Button from "../../components/Button";

const CreatePostsScreen = () => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={{ backgroundColor: "#fff" }}>
        <View style={styles.container}>
          <View style={styles.camera}></View>

          <Pressable>
            <Text style={styles.text}>Завантажте фото</Text>
          </Pressable>

          <TextInput
            // value={}
            // onChangeText={}
            placeholder="Назва"
            style={{ ...styles.input, marginTop: 32 }}
          />
          <View position="relative">
            <Pressable style={styles.mapButton}>
              <Feather name="map-pin" size={20} color="#BDBDBD" />
            </Pressable>
            <TextInput
              // value={}
              // onChangeText={}
              placeholder="Місцевість"
              style={{ ...styles.input, paddingLeft: 24 }}
            />
          </View>
          <Button
            title={"Опублікувати"}
            style={{ backgroundColor: "#F6F6F6", color: "#E8E8E8" }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  camera: {
    height: 240,
    backgroundColor: "#F6F6F6",
    marginTop: 30,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  text: {
    marginTop: 8,
    fontFamily: "Roboto400",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  input: {
    height: 50,
    paddingVertical: 15,
    marginTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    fontFamily: "Roboto400",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  mapButton: {
    position: "absolute",
    top: 30,
    left: 0,
  },
});

export default CreatePostsScreen;
