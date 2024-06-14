import React from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { Text, View } from "@/components/Themed";
import { AntDesign } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const NoItems = () => {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <AntDesign name="frowno" size={48} color={Colors[colorScheme ?? "light"].text} />
      <Text style={styles.text}>Brak elementów.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
  },
});

export default NoItems;
