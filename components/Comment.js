import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const Comment = ({ text, time, autorPostId, autorCommentId }) => {
  const isMyComment = autorPostId === autorCommentId;

  return (
    <View
      style={{
        ...styles.commentWrap,
        flexDirection: isMyComment ? "row-reverse" : "row",
      }}
    >
      <Image
        style={
          isMyComment
            ? { ...styles.avatar, marginLeft: 16 }
            : { ...styles.avatar, marginRight: 16 }
        }
      />
      <View
        style={
          isMyComment
            ? { ...styles.textWrap, borderTopRightRadius: 0 }
            : { ...styles.textWrap, borderTopLeftRadius: 0 }
        }
      >
        <Text>{text}</Text>
        <Text style={styles.time}>{time} </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentWrap: {
    flex: 1,
    marginBottom: 24,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
  },

  textWrap: {
    flex: 1,
    padding: 16,
    borderRadius: 6,
    backgroundColor: "#F6F6F6",
  },

  time: {
    fontSize: 10,
    lineHeight: 18,
    width: 350,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginTop: 8,
    color: "#BDBDBD",
  },
});

export default Comment;
