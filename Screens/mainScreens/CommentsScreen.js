import React, { useState } from "react";
import {
  View,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Comment from "../../components/Comment";

const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  const { photo } = route.params;

  const postComment = () => {
    console.log(comment);
    setComment("");
    Keyboard.dismiss;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <View style={styles.container}>
          <Image source={{ uri: photo }} style={styles.photo} />
          <View style={{ flex: 1 }}>
            {/* <FlatList
              data={allComments}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Comment
                  text={item.text}
               
                />
              )}
            /> */}
            <Comment text={comment} />
          </View>
          <View>
            <TextInput
              value={comment}
              onChangeText={setComment}
              placeholder="Коментувати..."
              style={styles.input}
            />
            <Pressable style={styles.sendBtn} onPress={postComment}>
              <Feather name="arrow-up" size={24} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    overflow: "scroll",
  },
  photo: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginVertical: 32,
  },
  input: {
    fontFamily: "Roboto400",
    fontSize: 16,
    height: 50,
    padding: 16,
    color: "#212121",
    backgroundColor: "#F6F6F6",
    marginBottom: 16,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  sendBtn: {
    position: "absolute",
    top: 8,
    right: 10,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CommentsScreen;
