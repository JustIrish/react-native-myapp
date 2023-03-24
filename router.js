import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Registration from "./Screens/auth/RegistrationScreen";
import Login from "./Screens/auth/LoginScreen";
import PostsScreen from "./Screens/mainScreens/PostsScreen";
import CreatePostsScreen from "./Screens/mainScreens/CreatePostsScreen";
import ProfileScreen from "./Screens/mainScreens/ProfileScreen";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={Registration}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator>
      <MainTab.Screen
        options={{ headerShown: false }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{ headerShown: false }}
        name="Create"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{ headerShown: false }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

export default useRoute;
