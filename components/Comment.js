import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const Comment = ({ text }) => {
  return (
    <View style={styles.commentWrap}>
      <Image style={styles.avatar} />
      <View style={styles.textWrap}>
        <Text>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentWrap: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 24,
  },
  avatar: {
    width: 28,
    height: 28,
    marginRight: 16,
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
  },

  textWrap: {
    borderRadius: 6,
    backgroundColor: "#F6F6F6",
    padding: 16,
  },
});

export default Comment;
