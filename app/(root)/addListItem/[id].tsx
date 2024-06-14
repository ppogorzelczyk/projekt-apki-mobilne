import { useLocalSearchParams, useNavigation } from "expo-router";
import { useState } from "react";
import { View, Button, StyleSheet, useColorScheme } from "react-native";
import CurrencyInput from "react-native-currency-input";
import { Text, TextInput } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { addListItem } from "@/api/requests/addListItem";
import { useStorageState } from "@/context/useStorageState";

export default function AddListItemScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | null>(0);
  const [link, setLink] = useState("");

  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { listId } = useLocalSearchParams();
  const [[isLoading, session]] = useStorageState("session");
  const [error, setError] = useState("");

  const colorScheme = useColorScheme();
  const handleAddListItem = async () => {
    setLoading(true);
    setError("");

    try {
      let requestParams = {
        title,
        description,
        link,
        price: price ?? 0,
      };

      if (!validateRequest()) {
        return;
      }

      await addListItem(listId as string, requestParams, session as string);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const validateRequest = () => {
    if (!title) {
      setError("Tytuł jest wymagany");
      return false;
    }

    if (!price || price <= 0) {
      setError("Cena jest wymagana");
      return false;
    }

    return true;
  };

  const inputStyle = {
    ...styles.input,
    backgroundColor: colorScheme == "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
    color: Colors[colorScheme ?? "light"].text,
  };

  return (
    <View style={styles.container}>
      <TextInput style={inputStyle} placeholder="Tytuł" value={title} onChangeText={setTitle} />

      <TextInput style={inputStyle} placeholder="Opis" value={description} onChangeText={setDescription} />

      <CurrencyInput
        style={inputStyle}
        placeholder="Cena"
        value={price}
        onChangeValue={setPrice}
        delimiter=" "
        separator="."
        suffix=" PLN"
        minValue={0}
        maxValue={999999999.99}
        precision={2}
      />

      <TextInput style={inputStyle} placeholder="Link" value={link} textContentType="URL" onChangeText={setLink} />

      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Dodaj do listy" onPress={handleAddListItem} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 50,
    fontSize: 20,
    borderColor: "transparent",
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  questionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  question: {
    fontSize: 16,
  },
});
