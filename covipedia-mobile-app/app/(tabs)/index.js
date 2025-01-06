import React, { useState, useEffect } from "react";
import { FlatList, TextInput, TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Image } from "expo-image";
import { incrementTotalClicks } from "../(redux)/authSlice";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const TabHome = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const { user, isAuthenticated, totalClicks } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const userJson = JSON.parse(JSON.stringify(user));

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, []);

  const filteredData = data.filter((item) =>
    item.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.coronaIcon}>
        <View>
          <Text style={styles.headerTitle}>Hello 👋</Text>
          {user ? (
            <Text style={styles.headerText}>{`${user.username} !`}</Text>
          ) : (
            <Text style={styles.text}></Text>
          )}
        </View>
        <View style={styles.corona}>
          <MaterialIcons name="coronavirus" size={80} color="red" />
        </View>
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.country}
        ListHeaderComponent={
          <View>
            <Text style={styles.header}>Global COVID-19 Statistics</Text>
            <TextInput
              style={styles.searchBar}
              placeholder="Search for a country..."
              onChangeText={(text) => setSearch(text)}
              value={search}
            />
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity onPress={() => dispatch(incrementTotalClicks())}>
              <Image
                source={{ uri: item.countryInfo.flag }}
                style={styles.flag}
              />
              <Text style={styles.countryName}>{item.country}</Text>
              <Text style={styles.stat}>Total Cases: {item.cases}</Text>
              <Text style={styles.stat}>Recovered: {item.recovered}</Text>
              <Text style={styles.stat}>Deaths: {item.deaths}</Text>
              <Text style={styles.stat}>Active: {item.active}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.clicksContainer}>
        <Text style={styles.clicksText}>Total Clicks: {totalClicks}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F4529",
    padding: 16,
    paddingBottom: 70,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#80C4E9",
    textAlign: "center",
    marginBottom: 16,
    textAlign: "left",
  },
  searchBar: {
    height: 40,
    borderColor: "#CCC",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 18,
    marginBottom: 16,
    backgroundColor: "#FFF",
  },
  card: {
    backgroundColor: "#D6EFD8",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerContainer: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  flag: {
    width: 100,
    height: 60,
    alignSelf: "center",
    marginBottom: 8,
  },
  countryName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  stat: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  clicksContainer: {
    position: "absolute",
    bottom: 80,
    right: 20,
    backgroundColor: "#074799",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    zIndex: 10,
  },
  clicksText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "light",
    marginBottom: 5,
    color: "#FFF",
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#FFF",
  },
  coronaIcon: {
    flexDirection: "row", // Arrange items in a row
    justifyContent: "space-between", // Space between the two child views
    alignItems: "center", // Vertically center the items
    paddingRight:16,
   
  },
  corona: {
    // backgroundColor: "#F7CA18",
    padding: 10,
    borderRadius: 50,
    marginTop: -28
  },
  
});

export default TabHome;
