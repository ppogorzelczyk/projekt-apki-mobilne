import React from "react";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import { Text } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import ModalHeader from "./ModalHeader";

type MainIconsProps = {
  handleEditPress: () => void;
  handleSharePress: () => void;
  handleDeletePress: () => void;
  handleClose: () => void;
};

const MainIcons = ({ handleEditPress, handleSharePress, handleDeletePress, handleClose }: MainIconsProps) => {
  const colorScheme = useColorScheme();
  const iconSize = 26;
  return (
    <>
      <ModalHeader handleClose={handleClose} headerText="Opcje listy" colorScheme={colorScheme} />
      <TouchableOpacity style={[styles.button]} onPress={handleEditPress}>
        <MaterialIcons style={styles.icon} name="edit" size={iconSize} color={Colors[colorScheme ?? "light"].text} />
        <Text style={[styles.text, { color: Colors[colorScheme ?? "light"].text }]}>Edytuj listę</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button]} onPress={handleSharePress}>
        <MaterialIcons style={styles.icon} name="share" size={iconSize} color={Colors[colorScheme ?? "light"].text} />
        <Text style={[styles.text, { color: Colors[colorScheme ?? "light"].text }]}>Udostępnij</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button]} onPress={handleDeletePress}>
        <MaterialIcons style={styles.icon} name="delete" size={iconSize} color={Colors[colorScheme ?? "light"].removeColor} />
        <Text style={[styles.text, { color: Colors[colorScheme ?? "light"].removeColor }]}>Usuń</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    marginTop: 15,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "red",
  },
  textHeader: {
    fontSize: 24,
    fontWeight: "bold",
  },
  closeButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  button: {
    width: "100%",
    padding: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: {
    textAlign: "left",
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
  },
});

export default MainIcons;
