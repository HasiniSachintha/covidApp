import { Tabs } from "expo-router";
import { Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
export default function RootLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderRadius: 25,
          elevation: 0,
          position: 'absolute',
          bottom: 20,
          marginHorizontal: 20,
        },
        tabBarLabelPosition: "beside-icon",
        tabBarActiveTintColor: "#074799",
        tabBarInactiveTintColor: "white", 
        tabBarActiveBackgroundColor: "white",
        tabBarInactiveBackgroundColor: "#074799",
        tabBarLabel: ({ focused }) => (focused ? <Text style={{ color: '#074799', fontWeight: 'bold', marginLeft: 3}}>{route.name === 'index' ? "Home" : route.name.charAt(0).toUpperCase() + route.name.slice(1)}</Text> : null),
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="cog" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
