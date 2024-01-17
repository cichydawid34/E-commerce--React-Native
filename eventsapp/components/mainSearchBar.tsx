import * as React from "react";
import { useEffect, useState } from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function SearchBar(props: { updateFilters?(filter) }) {
  const [openGenre, setOpenGenre] = useState(false);
  const [openCity, setOpenCity] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [name, setName] = React.useState("");
  const [date, setDate] = React.useState("");
  const [genre, setGenre] = React.useState("");
  const [city, setCity] = React.useState("");

  const [genres, setGenres] = useState([
    { label: "Concert", value: "Concert" },
    { label: "Sport", value: "Sport" },
    { label: "All", value: null },
  ]);

  const [cities, setCities] = useState([
    { label: "Tarnów", value: "Tarnówt" },
    { label: "Kraków", value: "Kraków" },
    { label: "Rzeszów", value: "Rzeszów" },
    { label: "Łodź", value: "Łódź" },
    { label: "Gdańsk", value: "Gdańsk" },
    { label: "All", value: null },
  ]);
  useEffect(() => {
    props.updateFilters({ name: "city", value: city });
  }, [city]);
  useEffect(() => {
    props.updateFilters({ name: "genre", value: genre });
  }, [genre]);
  useEffect(() => {
    props.updateFilters({ name: "name", value: name });
  }, [name]);

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Image
          style={styles.icon}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/151/151773.png",
          }}
        />
        <TextInput
          underlineColorAndroid="transparent"
          value={name}
          onChangeText={(e) => setName(e)}
          placeholder={"Search events"}
          style={styles.input}
        />
      </View>
      <View style={styles.filterBarBottom}>
        <View>
          <DropDownPicker
            style={styles.picker}
            open={openGenre}
            setOpen={setOpenGenre}
            value={genre}
            setValue={setGenre}
            items={genres}
            placeholder={"Genre"}
          />
        </View>
        <View>
          <DropDownPicker
            style={styles.picker}
            open={openCity}
            setOpen={setOpenCity}
            value={city}
            setValue={setCity}
            items={cities}
            placeholder={"City"}
          />
        </View>
        <View>
          <DropDownPicker
            style={styles.picker}
            open={openDate}
            setOpen={setOpenDate}
            value={date}
            setValue={setDate}
            items={genres}
            placeholder={"Date"}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    display: "flex",
    flexDirection: "column",
    width: 350,
    gap: 8,
  },
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 4,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  input: {
    width: "100%",
    paddingHorizontal: 20,
    fontSize: 16,
    height: 30,
  },
  icon: {
    width: 10,
    height: 10,
    padding: 10,
  },
  filterBarBottom: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  picker: {
    width: 113,
  },
});
