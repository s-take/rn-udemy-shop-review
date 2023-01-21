import React, { useState } from "react";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
/* navigators */
import { HomeStackNavigator } from "./HomeStackNavigator";
/* screens */
import { UserScreen } from "../screens/UserScreen";
/* types */
import { RootStackParamList } from "../types/navigation";
import { RouteProp } from "@react-navigation/core";
// import type { StackNavigationOptions } from "@react-navigation/stack";

const Tab = createBottomTabNavigator<RootStackParamList>();

const tabIconNames: Record<
  keyof RootStackParamList,
  keyof typeof Feather.glyphMap
> = {
  Main: "home",
  Home: "home",
  Shop: "user",
  User: "user",
  CreateReview: "user",
};

export const MainTabNavigator = () => {
  const screenOptions = (
    route: RouteProp<RootStackParamList, keyof RootStackParamList>
  ) =>
    ({
      tabBarIcon: ({ color, size }) => (
        <Feather name={tabIconNames[route.name]} size={size} color={color} />
      ),
      tabBarActiveTintColor: "#900",
      tabBarInactiveTintColor: "#999",
    } as BottomTabNavigationOptions);

  return (
    <Tab.Navigator screenOptions={({ route }) => screenOptions(route)}>
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="User" component={UserScreen} />
    </Tab.Navigator>
  );
};
