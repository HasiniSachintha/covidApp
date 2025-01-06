import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Link, useRouter } from "expo-router";
import { Image } from "expo-image";

const Home = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source="https://img.freepik.com/free-vector/medical-background-with-abstract-covid-19-virus-cells_1048-12122.jpg"
        // placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
      />
      <View style={styles.overlay}>
        <Text style={styles.mainText}>Covipedia</Text>
        <Text style={styles.subText}>Info App</Text>
        <Text style={styles.tagline}>Covid Data in One Click</Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/auth/login")}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/auth/register")}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  mainText: {
    color: "white",
    fontSize: 68,
    fontWeight: "bold",
    textAlign: "center",
  },
  subText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  tagline: {
    color: "white",
    fontSize: 18,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
  },
  button: {
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 3, // Adds a shadow effect on Android
  },
  buttonText: {
    color: "#074799",
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0553",
  },
});
