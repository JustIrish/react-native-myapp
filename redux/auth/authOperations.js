import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth, storage, db } from "../../firebase/config";

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      console.log(user);
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
