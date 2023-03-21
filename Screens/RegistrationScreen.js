import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  ScrollView,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function RegistrationScreen() {
  const [isShowKeyBoard, setIsShowKeyBoard] = useState(false);
  const [isFocused, setIsFocused] = useState({
    login: false,
    email: false,
    password: false,
  });
  const [isPassVisible, setIsPassVisible] = useState(true);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const keyboardHide = () => {
    setIsShowKeyBoard(false);
    Keyboard.dismiss();
  };

  const loginHandler = (value) => setLogin(value);

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
    keyboardHide();

    if (login === "" || email === "" || password === "") {
      return Alert.alert("Заповніть всі поля");
    }

    const data = { login, email, password };
    console.log(data);

    setLogin("");
    setEmail("");
    setPassword("");
  };

  const togglePassVisibility = () => {
    if (isPassVisible) {
      setIsPassVisible(false);
    } else {
      setIsPassVisible(true);
    }
  };

  return (
    <ImageBackground
      style={styles.image}
      source={require("../assets/images/background-img.jpg")}
    >
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View
            style={{ ...styles.avatarWrap, top: isShowKeyBoard ? 44 : 160 }}
          >
            {/* <Image /> */}
            <Pressable>
              <AntDesign name="pluscircleo" size={26} style={styles.icon} />
            </Pressable>
          </View>
          <ScrollView
            style={{
              ...styles.form,
              marginTop: isShowKeyBoard ? 104 : 220,
            }}
          >
            <Text style={styles.title}>Реєстрація</Text>
            <TextInput
              value={login}
              onChangeText={loginHandler}
              placeholder="Логін"
              style={
                isFocused.login
                  ? [styles.input, { borderColor: "#FF6C00" }]
                  : styles.input
              }
              onFocus={() => handleInputFocus("login")}
              onBlur={() => handleInputBlur("login")}
            />
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
            <Pressable onPress={togglePassVisibility}>
              <Text
                style={{
                  ...styles.subscribeText,
                  position: "absolute",
                  top: -37,
                  right: 25,
                  zIndex: 10,
                }}
              >
                {isPassVisible ? "Показати" : "Сховати"}
              </Text>
            </Pressable>

            <Pressable onPress={onSubmit} style={styles.button}>
              <Text style={styles.text}>Зареєструватись</Text>
            </Pressable>
            <View style={styles.subscribe}>
              <Text style={styles.subscribeText}>Вже є акаунт? </Text>
              <Pressable>
                <Text style={styles.subscribeText}>Увійти</Text>
              </Pressable>
            </View>
          </ScrollView>
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
  avatarWrap: {
    position: "absolute",
    top: 0,
    zIndex: 3,
    width: 120,
    height: 120,
    alignSelf: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  icon: {
    position: "absolute",
    right: -13,
    top: 81,
    color: "#FF6C00",
  },
  form: {
    position: "relative",
    backgroundColor: "#FFFFFF",
    lineHeight: 1.19,
    paddingTop: 92,
    paddingHorizontal: 16,
    paddingBottom: 45,
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
