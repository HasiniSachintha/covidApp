import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../(services)/api/api";
import { loginAction } from "../(redux)/authSlice";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";


const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too Short!").required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
  username: Yup.string().required("Required"),
});

export default function Register() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const mutation = useMutation({
    mutationFn: registerUser,
    mutationKey: ["register"],
  });

  console.log(mutation);
  return (
    <View style={styles.container}>
      <Image
            style={styles.image}
                    source="https://i.ibb.co/ZcGkXSb/rb-31078.png"
                    // placeholder={{ blurhash }}
                    contentFit='contain'
                    transition={1000}
                  />
      <Text style={styles.title}>Sign Up</Text>
      {mutation?.isError ? (
        <Text style={styles.errorText}>
          {mutation?.error?.response?.data?.message}
        </Text>
      ) : null}
      {mutation?.isSuccess ? (
        <Text style={styles.successText}>
          {mutation?.error?.response?.data?.message}
        </Text>
      ) : null}
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={(values) => {
          const data = {
            email: values.email,
            password: values.password,
            username: values.username,
          };
          mutation
            .mutateAsync(data)
            .then(() => {
              setMessage("Registration successful!");
              setMessageType("success");
              setTimeout(() => {
                setMessage("");
                if (data) {
                  router.push("/auth/login");
                }
                // router.push("/(tabs)");
              }, 2000); // Redirect after 2 seconds
            })
            .catch((error) => {
              setMessage(error?.response?.data?.message);
              setMessageType("error");
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
              placeholder="Username"
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
            />
            {errors.username && touched.username ? (
              <Text style={styles.errorText}>{errors.username}</Text>
            ) : null}
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
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              value={values.confirmPassword}
              secureTextEntry
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            ) : null}
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={mutation.isLoading}
            >
              {mutation.isPending ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Sign Up</Text>
              )}
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
    marginTop: 30,
    color: "#000000",
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
  successText: {
    color: "green",
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
