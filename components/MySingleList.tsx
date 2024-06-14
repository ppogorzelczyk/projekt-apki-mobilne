import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import { View, Text } from "./Themed";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useState } from "react";
import ListModal from "./listModal";

interface MySingleListProps {
  id: number;
  title: string;
  description: string;
  eventDate?: string;
}

const MySingleList = (props: MySingleListProps) => {
  const colorScheme = useColorScheme();
  const [modalVisible, setModalVisible] = useState(false);

  const containerStyle = {
    ...styles.container,
    backgroundColor: Colors[colorScheme ?? "light"].cardBackground,
    shadowColor: Colors[colorScheme ?? "light"].shadow,
    borderBottomColor: Colors[colorScheme ?? "light"].shadowedCardBorder,
  };

  const handleMoreButtonPress = () => {
    setModalVisible(true);
  };

  return (
    <TouchableOpacity
      onPress={() => {
        router.navigate({
          pathname: "/list/[id]",
          params: {
            id: props.id.toString(),
            title: props.title,
            description: props.description,
            isShared: "0",
          },
        });
      }}
      style={[containerStyle]}
    >
      <View style={[styles.textContainer, { backgroundColor: Colors[colorScheme ?? "light"].cardBackground }]}>
        <Text style={styles.title}>{props.title}</Text>
        <View style={[styles.descriptionContainer, { backgroundColor: Colors[colorScheme ?? "light"].cardBackground }]}>
          <Text style={styles.description} numberOfLines={2}>
            {props.description}
          </Text>
        </View>
        {props.eventDate && <Text style={styles.eventDate}>Data wydarzenia: {props.eventDate}</Text>}
      </View>

      <TouchableOpacity style={styles.moreButton} onPress={handleMoreButtonPress}>
        <MaterialIcons name="more-vert" size={24} color={Colors[colorScheme ?? "light"].text} />
        <ListModal modalVisible={modalVisible} setModalVisible={setModalVisible} listId={props.id.toString()} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    justifyContent: "space-between",
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  descriptionContainer: {
    flex: 1,
    height: 40,
    marginVertical: 3,
  },
  description: {
    fontSize: 14,
  },
  eventDate: {
    fontSize: 12,
    color: "gray",
  },
  moreButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: "100%",
    backgroundColor: "transparent",
  },
});

export default MySingleList;
