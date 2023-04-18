import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase/config";

import { logOut } from "../../redux/auth/authOperations";
import { selectId, selectName } from "../../redux/auth/authSelectors";
import ImageBg from "../../components/ImageBg";
import PostItem from "../../components/PostItem";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const currentUserId = useSelector(selectId);
  const nickName = useSelector(selectName);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUsersPosts = () => {
    setLoading(true);
    const q = query(
      collection(db, "posts"),
      where("userId", "==", currentUserId)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userPosts = [];
      snapshot.forEach((doc) => userPosts.push({ ...doc.data(), id: doc.id }));
      setUserPosts(userPosts);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  };

  useEffect(() => {
    getUsersPosts();
  }, []);

  const HandlerLogOut = () => {
    dispatch(logOut());
  };

  return (
    <ImageBg>
      <View style={styles.conteiner}>
        <View style={styles.avatarWrap}>
          <Image
            style={styles.image}
            source={require("../../assets/images/avatar.jpg")}
          />
          <Pressable style={styles.pressIcon}>
            <AntDesign name="closecircleo" size={26} color="#E8E8E8" />
          </Pressable>
        </View>
        <Pressable
          style={{ position: "absolute", top: 22, right: 16 }}
          onPress={HandlerLogOut}
        >
          <Feather name="log-out" size={24} color="#BDBDBD" />
        </Pressable>
        <Text style={styles.userName}>{nickName}</Text>
        <ActivityIndicator animating={loading} size="small" color="#FF6C00" />
        <FlatList
          data={userPosts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PostItem
              navigation={navigation}
              photo={item.photo}
              title={item.description}
              userId={item.userId}
              id={item.id}
              location={item.location}
              locationName={
                item.locationName ? item.locationName : "Somewhere..."
              }
              likes={item.likes}
              comment={item.commentCounter}
            />
          )}
        />
      </View>
    </ImageBg>
  );
};

const styles = StyleSheet.create({
  conteiner: {
    backgroundColor: "#FFFFFF",
    height: "80%",
    marginTop: 103,
    paddingHorizontal: 16,
    paddingTop: 92,
    paddingBottom: 45,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avatarWrap: {
    position: "absolute",
    top: -60,
    zIndex: 3,
    alignSelf: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  pressIcon: {
    position: "absolute",
    right: -12,
    bottom: 10,
    backgroundColor: "#fff",
    borderRadius: 50,
  },
  userName: {
    fontFamily: "Roboto500",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    color: "#212121",
    marginBottom: 33,
  },
});

export default ProfileScreen;
