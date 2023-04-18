import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { View, StyleSheet, Pressable } from "react-native";
import { useDispatch } from "react-redux";

import { logOut } from "../../redux/auth/authOperations";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

const MainTab = createBottomTabNavigator();

const Home = ({ navigation, route }) => {
  const dispatch = useDispatch();

  return (
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
        },
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "rgba(33, 33, 33, 0.8)",
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
        headerTintColor: "#212121",
      })}
    >
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <View style={focused && styles.activeBtn}>
              <Feather name="grid" size={size} color={color} />
            </View>
          ),
          headerRight: () => (
            <Pressable
              onPress={() => {
                dispatch(logOut());
              }}
            >
              <Feather
                name="log-out"
                size={24}
                color="#BDBDBD"
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        }}
        name="Публікації"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ focused, size, color }) => (
            <View style={focused && styles.activeBtn}>
              <Feather name="plus" size={size} color={color} />
            </View>
          ),
          headerLeft: () => (
            <Pressable onPress={() => navigation.navigate("Публікації")}>
              <Feather
                name="arrow-left"
                size={24}
                color="rgba(33, 33, 33, 0.8)"
                style={{ marginLeft: 15 }}
              />
            </Pressable>
          ),
        }}
        name="Створити публикацію"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <View style={focused && styles.activeBtn}>
              <Feather name="user" size={size} color={color} />
            </View>
          ),
          headerShown: false,
        }}
        name="Профіль"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  activeBtn: {
    height: 40,
    width: 70,
    backgroundColor: "#FF6C00",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
