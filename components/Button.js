import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = ({ onSubmit, title }) => {
  return (
    <TouchableOpacity onPress={onSubmit} style={styles.button}>
          <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FF6C00",
    borderRadius: 32,
    padding: 16,
    marginVertical: 16,
    marginTop: 43,
    justifyContent: "center",
  },
  text: {
    fontFamily: "Roboto400",
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
  },
});

export default Button;
