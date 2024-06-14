import React from "react";
import { TouchableOpacity, StyleSheet, useColorScheme } from "react-native";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";

interface SharedListUserBadgeProps {
  id: number;
  email: string;
  onRemove: (id: number, email: string) => void;
}

const SharedListUserBadge: React.FC<SharedListUserBadgeProps> = ({ id, email, onRemove }) => {
  const colorScheme = useColorScheme();

  const handleRemove = () => {
    onRemove(id, email);
  };

  const containerStyles = [styles.container, { backgroundColor: Colors[colorScheme ?? "light"].badge }];
  return (
    <View style={containerStyles}>
      <Text>{email}</Text>
      <TouchableOpacity onPress={handleRemove} style={styles.button}>
        <Text style={styles.buttonText}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    marginLeft: 10,
    padding: 5,
    borderRadius: 4,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#ff0000",
  },
});

export default SharedListUserBadge;
