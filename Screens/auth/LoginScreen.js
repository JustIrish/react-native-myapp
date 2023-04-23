import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import ImageBg from "../../components/ImageBg";
import Button from "../../components/Button";
import { logIn } from "../../redux/auth/authOperations";

export default function LoginScreen({ navigation }) {
  const [isShowKeyBoard, setIsShowKeyBoard] = useState(false);
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
  });
  const [isPassVisible, setIsPassVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

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
    setIsLoading(true);
    if (email.trim() === "" || password.trim() === "") {
      setIsLoading(false);
      return Alert.alert("Заповніть всі поля");
    }
    setIsShowKeyBoard(false);
    Keyboard.dismiss();

    dispatch(logIn({ email, password }))
      .unwrap()
      .then(() => {
        console.log("User is signed in");
      })
      .catch((err) => {
        if (
          err === "Firebase: Error (auth/wrong-password)." ||
          err === "Firebase: Error (auth/user-not-found)."
        ) {
          Alert.alert("Error", "Невірний логін або пароль");
        } else {
          Alert.alert("Error", "Щось пішло не так... Введіть дані ще раз");
        }
      });

    setIsLoading(false);
  };

  return (
    <ImageBg>
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
                        { marginBottom: 43 },
                      ]
                    : [styles.input, { marginBottom: 43 }]
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
            <Button
              onSubmit={onSubmit}
              title={
                isLoading ? (
                  <ActivityIndicator
                    animating={isLoading}
                    size="small"
                    color="#FFFFFF"
                  />
                ) : (
                  "Увійти"
                )
              }
            />
            <View style={styles.subscribe}>
              <Text style={styles.subscribeText}>Немає акаунту? </Text>
              <Pressable onPress={() => navigation.navigate("Registration")}>
                <Text style={styles.subscribeText}>Зареєструватись</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBg>
  );
}

const styles = StyleSheet.create({
  form: {
    position: "relative",
    backgroundColor: "#FFFFFF",
    lineHeight: 1.19,
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
  subscribe: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 16,
  },
  subscribeText: {
    fontFamily: "Roboto400",
    fontSize: 16,
    color: "#1B4371",
  },
});
