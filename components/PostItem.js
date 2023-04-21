import React from "react";
import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { EvilIcons } from "@expo/vector-icons";

const PostItem = ({
  navigation,
  photo,
  title,
  id,
  userId,
  avatar,
  location,
  locationName,
  likes = "",
  comment = "",
}) => {
  const updateLikes = async (likes, id) => {
    try {
      const likeRef = doc(db, "posts", id);
      await updateDoc(likeRef, {
        likes: likes,
      });
    } catch (error) {
      console.log("err", error.message);
    }
  };

  const handlerLikePress = async () => {
    updateLikes(likes + 1, id);
  };

  return (
    <View>
      <Image source={{ uri: photo }} style={styles.photo} />
      <Text style={styles.text}>{title}</Text>
      <View style={styles.description}>
        <View style={styles.wrap}>
          <Pressable
            onPress={() => {
              navigation.navigate("Comments", {
                photo,
                avatar,
                postId: id,
                autorPostId: userId,
              });
            }}
          >
            <EvilIcons
              name="comment"
              size={24}
              color={comment > 0 ? "#FF6C00" : "#BDBDBD"}
            />
          </Pressable>
          <Text style={styles.descText}>{comment}</Text>

          <Pressable style={{ marginLeft: 10 }} onPress={handlerLikePress}>
            <EvilIcons
              name="like"
              size={26}
              color={likes > 0 ? "#FF6C00" : "#BDBDBD"}
            />
          </Pressable>
          <Text style={styles.descText}>{likes}</Text>
        </View>

        <View>
          <Pressable
            style={styles.wrap}
            onPress={() => {
              navigation.navigate("Map", { location });
            }}
          >
            <EvilIcons name="location" size={24} color="#BDBDBD" />
            <Text
              style={{ ...styles.descText, textDecorationLine: "underline" }}
            >
              {locationName}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  photo: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  text: {
    marginBottom: 11,
    fontFamily: "Roboto500",
    fontSize: 16,
    lineHeight: 19,
  },
  description: {
    paddingBottom: 34,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  wrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  descText: {
    fontFamily: "Roboto400",
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 6,
  },
});
export default PostItem;
