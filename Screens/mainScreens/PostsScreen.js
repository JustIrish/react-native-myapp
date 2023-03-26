import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Image
          style={styles.image}
          source={require("../../assets/images/avatar.jpg")}
        />
        <View style={styles.wrapper}>
          <Text style={styles.name}>name</Text>
          <Text style={styles.email}>email</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    overflow: "scroll",
  },
  avatar: {
    marginTop: 16,
    padding: 16,
    flexDirection: "row",
    overflow: "scroll",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  wrapper: {
    marginLeft: 8,
    justifyContent: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 13,
    lineHeight: 15,
  },
  email: {
    fontSize: 11,
    lineHeight: 13,
  },
});

export default PostsScreen;
