import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { View, Image, Text, StyleSheet, FlatList } from "react-native";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { selectName, selectEmail } from "../../redux/auth/authSelectors";
import PostItem from "../../components/PostItem";

const PostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(false);
  const name = useSelector(selectName);
  const email = useSelector(selectEmail);

  const getAllPosts = async () => {
    setLoader(true);
    const q = query(collection(db, "posts"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const postsArr = [];
        querySnapshot.forEach((doc) => {
          postsArr.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setPosts(postsArr);
        setLoader(false);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsubscribe();
    };
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Image
          style={styles.image}
          source={require("../../assets/images/avatar.jpg")}
        />
        <View style={styles.wrapper}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostItem
            navigation={navigation}
            photo={item.photo}
            title={item.description}
            userId={item.userId}
            id={item.id}
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
