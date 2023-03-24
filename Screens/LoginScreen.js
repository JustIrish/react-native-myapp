import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";

export default function LoginScreen() {
  const [isShowKeyBoard, setIsShowKeyBoard] = useState(false);
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
  });
  const [isPassVisible, setIsPassVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailHandler = (value) => setEmail(value);

  const passwordHandler = (value) => setPassword(value);

  const handleInputFocus = (textinput) => {
    setIsFocused({
      [textinput]: true,
    });
    setIsShowKeyBoard(true);
  };
  const handleInputBlur = (textinput) => {
    setIsFocused({
      [textinput]: false,
    });
  };

  const onSubmit = () => {
    if (email === "" || password === "") {
      return Alert.alert("Заповніть всі поля");
    }
    setIsShowKeyBoard(false);
    Keyboard.dismiss();

    const data = { email, password };
    console.log(data);

    setEmail("");
    setPassword("");
  };

  return (
    <ImageBackground
      style={styles.image}
      source={require("../assets/images/background-img.jpg")}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View
            style={{
              ...styles.form,
              marginTop: isShowKeyBoard ? 239 : 279,
            }}
          >
            <Text style={styles.title}>Увійти</Text>
            <TextInput
              value={email}
              onChangeText={emailHandler}
              placeholder="Адреса електронної пошти"
              style={
                isFocused.email
                  ? [styles.input, { borderColor: "#FF6C00" }]
                  : styles.input
              }
              onFocus={() => handleInputFocus("email")}
              onBlur={() => handleInputBlur("email")}
            />
            <View>
              <TextInput
                value={password}
                onChangeText={passwordHandler}
                placeholder="Пароль"
                secureTextEntry={isPassVisible}
                style={
                  isFocused.password
                    ? [
                        styles.input,
                        { borderColor: "#FF6C00" },
                        { marginBottom: 0 },
                      ]
                    : [styles.input, { marginBottom: 0 }]
                }
                onFocus={() => handleInputFocus("password")}
                onBlur={() => handleInputBlur("password")}
              />
              <Pressable
                onPress={() => setIsPassVisible(!isPassVisible)}
                style={{ position: "absolute", top: 12, right: 20 }}
              >
                <Text style={styles.subscribeText}>
                  {isPassVisible ? "Показати" : "Сховати"}
                </Text>
              </Pressable>
            </View>
            <Pressable onPress={onSubmit} style={styles.button}>
              <Text style={styles.text}>Увійти</Text>
            </Pressable>
            <View style={styles.subscribe}>
              <Text style={styles.subscribeText}>Немає акаунту? </Text>
              <Pressable>
                <Text style={styles.subscribeText}>Зареєструватись</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    position: "relative",
    backgroundColor: "#FFFFFF",
    lineHeight: 1.19,
    marginTop: "auto",
    paddingTop: 32,
    padding: 16,
    paddingBottom: 144,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    marginBottom: 32,
    fontFamily: "Roboto500",
    fontSize: 30,
    color: "#212121",
    textAlign: "center",
  },
  input: {
    fontFamily: "Roboto400",
    fontSize: 16,
    height: 50,
    padding: 16,
    color: "#212121",
    backgroundColor: "#F6F6F6",
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  button: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
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
  subscribe: {
    flexDirection: "row",
    alignSelf: "center",
  },
  subscribeText: {
    fontFamily: "Roboto400",
    fontSize: 16,
    color: "#1B4371",
  },
});
