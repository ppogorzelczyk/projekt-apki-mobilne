import React, { useEffect } from "react";
import { FlatList, ScrollView, StyleSheet, Image, Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { View, Text } from "@/components/Themed";
import { ExternalLink } from "@/components/ExternalLink";
import { useStorageState } from "@/context/useStorageState";
import { deleteListItem } from "@/api/requests/deleteListItem";

export default function ListItemScreen() {
  const { id, listId, listItem } = useLocalSearchParams();
  const [listItemData, setListItemData] = React.useState<ListItem>();
  const [[isLoading, session]] = useStorageState("session");

  useEffect(() => {
    if (listItem) {
      setListItemData(JSON.parse(listItem as string) as ListItem);
    }
  }, [listItem]);

  if (!listItemData) {
    return null;
  }

  const handleDelete = () => {
    Alert.alert("Usuń", "Czy na pewno chcesz usunąć ten produkt? Nie można tego cofnąć!", [
      {
        text: "Anuluj",
        style: "cancel",
      },
      {
        text: "Usuń",
        onPress: async () => {
          try {
            await deleteListItem({ listId: listId as string, itemId: listItemData.id }, session as string);
            router.navigate({ pathname: "/list/[id]", params: { id: listId } });
          } catch (error) {
            console.error(error);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {listItemData.photo && <Image style={{ width: 150, height: 150 }} source={{ uri: listItemData.photo }} />}
        <ScrollView alwaysBounceVertical={false} style={styles.headerData}>
          <Text style={styles.title}>{listItemData.title}</Text>
          <Text style={styles.description}>{listItemData.description}</Text>
        </ScrollView>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.price}>Wartość: {listItemData.price} PLN</Text>

        {listItemData.link && (
          <ExternalLink href={listItemData.link} style={styles.linkContainer}>
            <Text style={{ color: "white" }}>Zobacz link</Text>
          </ExternalLink>
        )}
        <Text style={[styles.deleteButton]} onPress={handleDelete}>
          Usuń produkt
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  listHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  headerContainer: {
    alignItems: "flex-start",
    marginBottom: 10,
    flexDirection: "row",
    width: "100%",
    gap: 10,
    maxHeight: "33%",
  },
  headerData: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
  },
  detailsContainer: {
    width: "100%",
    gap: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "right",
  },
  linkContainer: {
    padding: 10,
    backgroundColor: "#007AFF",
    borderRadius: 5,
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  deleteButton: {
    padding: 10,
    backgroundColor: "#e81f10",
    borderRadius: 5,
    width: "100%",
    color: "white",
    alignItems: "center",
    fontSize: 16,
    textAlign: "center",
  },
  assigneeContainer: {
    flex: 1,
    padding: 10,
    width: "100%",
    borderRadius: 5,
  },
  assignee: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  assigneeName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  assignePrice: {
    fontSize: 16,
  },
});
