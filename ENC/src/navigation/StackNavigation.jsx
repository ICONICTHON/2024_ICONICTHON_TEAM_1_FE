import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../pages/HomeScreen/HomeScreen";
import DetailsScreen from "../pages/DetailsScreen/DetailsScreen";
import StoreScreen from "../pages/StoreScreen/StoreScreen";
import ReportDangerZoneScreen from "../pages/ReportDangerZoneScreen/ReportDangerZoneScreen";
import NoticeScreen from "../pages/NoticeScreen/NoticeScreen";

const Stack = createStackNavigator();

const StackNavigation = () => {
  const customStackNavigationOptions = {
    gestureEnabled: false,
    title: "",
    headerStyle: {
      backgroundColor: "#209bec",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
    },
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="home"
        screenOptions={{
          headerShown: false, // 모든 스크린의 헤더를 숨김
        }}
      >
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="details" component={DetailsScreen} />
        <Stack.Screen name="store" component={StoreScreen} />
        <Stack.Screen name="notice" component={NoticeScreen} />
        <Stack.Screen
          name="ReportDangerZone"
          component={ReportDangerZoneScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
