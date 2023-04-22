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
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  where,
} from "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { db } from "../../firebase/config";

import { logOut, setAvatarAuth } from "../../redux/auth/authOperations";
import {
  selectId,
  selectName,
  selectAvatar,
} from "../../redux/auth/authSelectors";
import ImageBg from "../../components/ImageBg";
import PostItem from "../../components/PostItem";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const currentUserId = useSelector(selectId);
  const nickName = useSelector(selectName);
  const ava = useSelector(selectAvatar);
  const defaultAvatar = require("../../assets/images/imagesAva.png");
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const changeAvatar = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.canceled) {
        const uriAvatar = result.assets[0].uri;
        const directoryName = "avatars";
        dispatch(setAvatarAuth({ directoryName, uriAvatar }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUsersPosts = () => {
    setLoading(true);
    const q = query(
      collection(db, "posts"),
      orderBy("date", "desc"),
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
            source={ava ? { uri: ava } : defaultAvatar}
          />
          <Pressable style={styles.pressIcon} onPress={changeAvatar}>
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
        {userPosts.length === 0 ? (
          <Text
            style={{
              fontFamily: "Roboto400",
              fontSize: 16,
              textAlign: "center",
            }}
          >
            У Вас ще немає жодного допису
          </Text>
        ) : (
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
        )}
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
