import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet, ColorSchemeName } from "react-native";
import { View, Text } from "../Themed";
import Colors from "@/constants/Colors";

type ModalHeaderProps = {
  handleClose: () => void;
  headerText: string;
  colorScheme: ColorSchemeName;
};

const ModalHeader = ({ handleClose, headerText, colorScheme }: ModalHeaderProps) => {
  return (
    <View style={[styles.modalHeader, { backgroundColor: Colors[colorScheme ?? "light"].cardBackground }]}>
      <Text style={[styles.textHeader, { color: Colors[colorScheme ?? "light"].text }]}>{headerText}</Text>
      <TouchableOpacity style={[styles.closeButton, { backgroundColor: Colors[colorScheme ?? "light"].cardSecondaryBackground }]} onPress={handleClose}>
        <MaterialIcons name="close" size={24} color={Colors[colorScheme ?? "light"].text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    marginTop: 15,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
});

export default ModalHeader;
