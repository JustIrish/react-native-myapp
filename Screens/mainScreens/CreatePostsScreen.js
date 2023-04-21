import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { db } from "../../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { useIsFocused } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  Pressable,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { uploadPhotoToStorage } from "../../redux/auth/authOperations";
import {
  selectAvatar,
  selectId,
  selectName,
} from "../../redux/auth/authSelectors";
import Button from "../../components/Button";

const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [location, setLocation] = useState(null);
  // const [errorMsg, setErrorMsg] = useState(null);
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [locationName, setLocationName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const userId = useSelector(selectId);
  const isFocused = useIsFocused();
  // const avatar = useSelector(selectAvatar);

  useEffect(() => {
    (async () => {
      let { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let locationRes = await Location.getCurrentPositionAsync({});
      setLocation(locationRes);
    })();
  }, []);

  const takePhoto = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      setPhoto(photo.uri);
    }
  };

  const downloadPicture = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const pictureUri = result.assets[0].uri;
        setPhoto(pictureUri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadPostToServer = async () => {
    setIsUploading(true);
    try {
      const date = new Date();
      const urlPhoto = await uploadPhotoToStorage("postImage", photo);

      const obj = {
        userId,
        photo: urlPhoto,
        description,
        locationName,
        date,
      };
      if (location) obj.location = location.coords;
      await addDoc(collection(db, "posts"), obj);
      setIsUploading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const sendPost = async () => {
    await uploadPostToServer();

    setPhoto("");
    setDescription("");
    setLocationName("");
    navigation.navigate("Публікації");
    Keyboard.dismiss;
  };

  const deletePhoto = () => {
    setPhoto("");
    setDescription("");
    setLocation("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          {photo ? (
            <View style={styles.photoContainer}>
              <Image
                source={{ uri: photo }}
                style={{ width: "100%", height: 240, borderRadius: 8 }}
              />
            </View>
          ) : (
            isFocused && (
              <Camera
                style={styles.camera}
                ref={(ref) => {
                  setCamera(ref);
                }}
              >
                <TouchableOpacity onPress={takePhoto} style={styles.cameraBtn}>
                  <Feather name="camera" size={30} color="#BDBDBD" />
                </TouchableOpacity>
              </Camera>
            )
          )}

          <Pressable onPress={downloadPicture}>
            <Text style={styles.pressText}>Завантажте фото</Text>
          </Pressable>

          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Назва"
            style={{ ...styles.input, marginTop: 32 }}
          />
          <View position="relative">
            <Pressable style={styles.mapButton}>
              <Feather name="map-pin" size={20} color="#BDBDBD" />
            </Pressable>
            <TextInput
              value={locationName}
              onChangeText={setLocationName}
              placeholder="Місцевість"
              style={{ ...styles.input, paddingLeft: 24 }}
            />
          </View>
          <View style={{ flex: 1, justifyContent: "space-around" }}>
            {photo ? (
              <Button
                title={
                  isUploading ? (
                    <ActivityIndicator
                      animating={isUploading}
                      size="small"
                      color="#FFFFFF"
                    />
                  ) : (
                    "Опублікувати"
                  )
                }
                onSubmit={sendPost}
              />
            ) : (
              <Pressable style={styles.button}>
                <Text style={styles.text}>Опублікувати</Text>
              </Pressable>
            )}
            <TouchableOpacity onPress={deletePhoto} style={styles.deleteBtn}>
              <Feather name="trash-2" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  photoContainer: {
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    height: 240,
  },
  camera: {
    height: 240,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraBtn: {
    backgroundColor: "rgba(255,255,255, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  pressText: {
    marginTop: 8,
    fontFamily: "Roboto400",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  input: {
    height: 50,
    paddingVertical: 15,
    marginTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    fontFamily: "Roboto400",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  mapButton: {
    position: "absolute",
    top: 30,
    left: 0,
  },
  button: {
    backgroundColor: "#F6F6F6",
    borderRadius: 32,
    padding: 16,
    justifyContent: "center",
  },
  text: {
    fontFamily: "Roboto400",
    fontSize: 16,
    color: "#BDBDBD",
    textAlign: "center",
  },
  deleteBtn: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
  },
});

export default CreatePostsScreen;
