import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import Registration from "./Screens/auth/RegistrationScreen";
import Login from "./Screens/auth/LoginScreen";
import Home from "./Screens/mainScreens/Home";
import MapScreen from "./Screens/mainScreens/MapScreen";
import CommentsScreen from "./Screens/mainScreens/CommentsScreen";

const AuthStack = createStackNavigator();

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
    <AuthStack.Navigator screenOptions={{
      headerTitleAlign: "center",
    headerStyle: {
          shadowColor: "rgba(0, 0, 0, 0.5)",
          shadowOffset: { width: 0, height: 0.5 },
          shadowRadius: 1.35914,
        },
        headerShadowVisible: true,
        headerTitleStyle: {
          fontFamily: "Roboto500",
          fontSize: 17,
        },
        headerTintColor: "#212121",}}>
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
      <AuthStack.Screen
        options={{ headerTitle: "Мапа" }}
        name="Map"
        component={MapScreen}
      />
      <AuthStack.Screen
        options={{ headerTitle: "Коментарі" }}
        name="Comments"
        component={CommentsScreen}
      />
    </AuthStack.Navigator>
  );
};

export default useRoute;
