import React from "react";
import { View, Image, Text, Pressable, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import { logOut } from "../../redux/auth/authOperations";

import ImageBg from "../../components/ImageBg";

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const HandlerLogOut = () => {
    dispatch(logOut())
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

        <Text></Text>
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
});

export default ProfileScreen;
