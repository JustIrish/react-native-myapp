import React, { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

const PostItem = ({
  navigation,
  photo,
  title,
  id,
  userId,
  location,
  locationName,
}) => {
  // console.log(navigation, photo, title, location, locationName);

  const [like, setLike] = useState(0);
  const [comment, setComment] = useState(0);

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
                postId: id,
                autorPostId: userId,
              });
            }}
          >
            <EvilIcons name="comment" size={24} color="#BDBDBD" />
          </Pressable>
          <Text style={styles.descText}>0</Text>
        </View>

        <View style={styles.wrap}>
          <Pressable>
            <EvilIcons name="like" size={26} color="#BDBDBD" />
          </Pressable>
          <Text style={styles.descText}>0</Text>
        </View>

        <View style={styles.wrap}>
          <Pressable
            onPress={() => {
              navigation.navigate("Map", { location });
            }}
          >
            <EvilIcons name="location" size={24} color="#BDBDBD" />
            <Text style={styles.descText}>{locationName}</Text>
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
    fontFamily: "Roboto400",
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
    marginLeft: 6,
  },
});
export default PostItem;
