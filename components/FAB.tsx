import Colors from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";

interface FABProps {
  onPress: () => void;
}

const FAB = (props: FABProps) => {
  const colorScheme = useColorScheme();
  const fabColor = Colors[colorScheme ?? "light"].tint;
  return (
    <TouchableOpacity style={[{ backgroundColor: fabColor }, styles.fab]} onPress={props.onPress}>
      <MaterialIcons name="add" size={24} color={Colors[colorScheme ?? "light"].background} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  fabLight: {
    backgroundColor: "#007AFF",
  },
  fabDark: {
    backgroundColor: "#007AFF",
  },
});

export default FAB;
