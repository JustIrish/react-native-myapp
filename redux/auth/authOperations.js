import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import "react-native-get-random-values";
import uuid from "react-native-uuid";
import { auth, storage } from "../../firebase/config";

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      await updateProfile(auth.currentUser, {
        displayName: credentials.login,
        photoURL: credentials.avatar,
      });
      const updateUser = auth.currentUser;

      return {
        name: updateUser.displayName,
        email: updateUser.email,
        id: updateUser.uid,
        token: updateUser.accessToken,
        avatar: updateUser.photoURL,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/logIn",
  async (credentials, thunkAPI) => {
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      return {
        name: user.displayName,
        email: user.email,
        id: user.uid,
        token: user.accessToken,
        avatar: user.avatar,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logOut", async (_, thunkAPI) => {
  try {
    await signOut(auth);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const setAvatarAuth = createAsyncThunk(
  "auth/setAvatar",
  async ({ directoryName, uriAvatar }, thunkAPI) => {
    try {
      const avatar = await uploadPhotoToStorage(directoryName, uriAvatar);
      await updateProfile(auth.currentUser, { photoURL: avatar });
      const updateUser = auth.currentUser;
      return {
        name: updateUser.displayName,
        email: updateUser.email,
        id: updateUser.uid,
        token: updateUser.accessToken,
        avatar: updateUser.photoURL,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const uploadPhotoToStorage = async (directoryName, uri) => {
  const response = await fetch(uri);
  const file = await response.blob();

  const imageId = uuid.v4();
  const storageRef = ref(storage, `${directoryName}/${imageId}`);

  await uploadBytes(storageRef, file);

  const urlPhoto = await getDownloadURL(
    ref(storage, `${directoryName}/${imageId}`)
  );
  return urlPhoto;
};
