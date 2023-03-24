import React from "react";
import { ImageBackground, StyleSheet } from "react-native";

export const ImageBg = ({ children }) => {
  return (
    <ImageBackground
      style={styles.image}
      source={require("../assets/images/background-img.jpg")}
    >
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
});
