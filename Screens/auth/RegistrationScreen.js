import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import ImageBg from "../../components/ImageBg";
import Button from "../../components/Button";
import { register, setAvatarAuth } from "../../redux/auth/authOperations";
import { selectIsAuth } from "../../redux/auth/authSelectors";

export default function RegistrationScreen({ navigation }) {
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
  const [avatar, setAvatar] = useState(null);

  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

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

  const addAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      const uriAvatar = result.assets[0].uri;
      setAvatar(uriAvatar);
      const directoryName = "avatars";
      dispatch(setAvatarAuth({ directoryName, uriAvatar }));
    }
  };

  const handleSubmit = () => {
    if (login.trim() === "" || email.trim() === "" || password.trim() === "") {
      return Alert.alert("Error", "Заповніть всі поля");
    }
    setIsShowKeyBoard(false);
    Keyboard.dismiss();

    dispatch(register({ login, email, password, avatar }))
      .unwrap()
      .then(() => {
        Alert.alert("Success", "Ви успішно зареєструвалися");
      })
      .catch(() =>
        Alert.alert("Error", "Щось пішло не так... Введіть дані ще раз")
      );
  };

  return (
    <ImageBg>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View
            style={{ ...styles.avatarWrap, top: isShowKeyBoard ? 44 : 160 }}
          >
            <Image style={styles.avatar} source={{ uri: avatar }} />
            <Pressable onPress={addAvatar}>
              {avatar ? (
                <AntDesign
                  name="closecircleo"
                  size={26}
                  style={styles.icon}
                  color="#E8E8E8"
                />
              ) : (
                <AntDesign
                  name="pluscircleo"
                  size={26}
                  style={styles.icon}
                  color="#FF6C00"
                />
              )}
            </Pressable>
          </View>
          <View
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
              onSubmit={handleSubmit}
              title={
                isAuth ? (
                  <ActivityIndicator
                    animating={isAuth}
                    size="small"
                    color="#FFFFFF"
                  />
                ) : (
                  "Зареєструватись"
                )
              }
            />
            <View style={styles.subscribe}>
              <Text style={styles.subscribeText}>Вже є акаунт? </Text>
              <Pressable onPress={() => navigation.navigate("Login")}>
                <Text style={styles.subscribeText}>Увійти</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBg>
  );
}

const styles = StyleSheet.create({
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
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  icon: {
    position: "absolute",
    right: -13,
    top: -36,
  },
  form: {
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
