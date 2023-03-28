import React, { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet, FlatList } from "react-native";
import PostItem from "../../components/PostItem";

const PostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) setPosts((prevState) => [route.params, ...prevState]);
  }, [route.params]);

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
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <PostItem
            navigation={navigation}
            photo={item.photo}
            title={item.photoTitle}
            location={item.location}
            locationName={item.locationName}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    overflow: "scroll",
  },
  avatar: {
    paddingVertical: 32,
    flexDirection: "row",
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
