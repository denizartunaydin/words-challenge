import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import HomeScreen from "../screens/home/home.screen";
import QuizScreen from "../screens/quiz/quiz.screen";

import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";

const Stack = createStackNavigator();

const RootLayout = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "transparent" },
          animationEnabled: Platform.OS == "ios" ? true : false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>

        <Stack.Screen name="Quiz" component={QuizScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootLayout;
