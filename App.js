import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeTabs from "./tabs/HomeTabs";
import DetailScreen from "./screens/DetailScreen";
import CastDetailScreen from "./screens/CastDetailScreen";
import MoviesScreen from "./screens/MoviesScreen";

import i18n from "./languages/i18n";
import VideosScreen from "./screens/VideosScreens";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="CastDetail" component={CastDetailScreen} />
        <Stack.Screen name="Movies" component={MoviesScreen} />
        <Stack.Screen name="Videos" component={VideosScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
