import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "expo-router";
import { logoutAction } from "../(redux)/authSlice";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function Profile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutAction());
    router.push("/auth/login");
  };

  return (
    <ProtectedRoute>
      <View style={styles.container}>
        <Text style={styles.title}>User Profile</Text>
        {user ? (
          <>
            <Text style={styles.text}>User Name: {user.username}</Text>

            <Text style={styles.text}>Email: {user.email}</Text>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.text}>No user logged in</Text>
        )}
      </View>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#1F4529",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#80C4E9",
  },
  text: {
    fontSize: 18,
    marginBottom: 16,
    color: "#ffff",
  },
  button: {
    height: 50,
    backgroundColor: "#ffff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 20,
    marginTop: 16,
  },
  buttonText: {
    color: "#074799",
    fontSize: 18,
    fontWeight: "bold",
  },
});
