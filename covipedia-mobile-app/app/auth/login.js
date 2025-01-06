import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../(services)/api/api";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../(redux)/authSlice";
import { Image } from "expo-image";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too Short!").required("Required"),
});

export default function Login() {
  const router = useRouter();
  //dispatch
  const dispatch = useDispatch();
  const mutation = useMutation({
    mutationFn: loginUser,
    mutationKey: ["login"],
  });
  // console.log(mutation);
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    if (user) {
      router.push("/(tabs)");
    }
  }, []);
  console.log("user", user);
  return (
    <View style={styles.container}>
      <Image
      style={styles.image}
              source="https://i.ibb.co/ZcGkXSb/rb-31078.png"
              // placeholder={{ blurhash }}
              contentFit='contain'
              transition={1000}
            />
      <Text style={styles.title}>Sign In</Text>
      <Formik
        initialValues={{ email: "abc@gmail.com", password: "122356" }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          console.log(values);
          mutation
            .mutateAsync(values)
            .then((data) => {
              console.log("data", data);
              if (data){
                dispatch(loginAction(data));
                router.push("/(tabs)");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              keyboardType="email-address"
            />
            {errors.email && touched.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry
            />
            {errors.password && touched.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "rgba(7 ,71, 153,0.3)",
  },
  title: {
    fontSize: 32,
    fontWeight: "regular",
    marginBottom: 24,
    color: "#000000",
    marginTop: 10,
  },
  form: {
    width: "100%",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    marginBottom: 16,
  },
  button: {
    height: 50,
    backgroundColor: "#074799",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    width: "100%", // Adjusted width
    height: "20%", // Adjusted height
    marginBottom: 20, // Optional: Add some spacing between the image and other components
  },
});
