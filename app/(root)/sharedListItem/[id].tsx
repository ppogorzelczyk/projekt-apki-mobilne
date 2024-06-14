import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Image, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { View, Text } from "@/components/Themed";
import { ExternalLink } from "@/components/ExternalLink";
import { SharedListItemModal } from "@/components/SharedListItemModal";
import { useQueryClient } from "@tanstack/react-query";
import { participateInListItem } from "@/api/requests/particpateInListItem";
import { useStorageState } from "@/context/useStorageState";

export default function SharedListItemScreen() {
  const { id, listId, listItem } = useLocalSearchParams();
  const [listItemData, setListItemData] = useState<ListItem>();

  const [modalVisible, setModalVisible] = useState(false);
  const queryClient = useQueryClient();

  const [[isLoading, session]] = useStorageState("session");

  useEffect(() => {
    if (listItem) {
      setListItemData(JSON.parse(listItem as string) as ListItem);
    }
  }, [listItem]);

  if (!listItemData) {
    return null;
  }

  const handleParticipate = () => {
    setModalVisible(true);
  };

  const onModalSubmitted = async (amount: number) => {
    setModalVisible(false);

    try {
      const response = await participateInListItem(
        {
          listId: listId as string,
          amount: amount,
          itemId: listItemData.id,
        },
        session as string
      );

      queryClient.invalidateQueries();
    } catch (error) {
      console.error(error);
    }
  };

  let missingToFullPrice = listItemData.price;

  if (listItemData.assignees) {
    missingToFullPrice = listItemData.price - listItemData.assignees.reduce((acc, assignee) => acc + assignee.amount, 0);
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {listItemData.photo && <Image style={{ width: 150, height: 150, resizeMode: "contain" }} source={{ uri: listItemData.photo }} />}
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
        <Text
          style={[styles.participateButton, missingToFullPrice > 0 ? { backgroundColor: "#33b249" } : { backgroundColor: "gray" }]}
          onPress={handleParticipate}
          disabled={missingToFullPrice < 0}
        >
          Dołącz do zakupu
        </Text>
        <SharedListItemModal
          onSubmitted={onModalSubmitted}
          onCancel={() => setModalVisible(false)}
          item={listItemData}
          visible={modalVisible}
          isModalLoading={false}
        />
      </View>
      <View style={styles.assigneeContainer}>
        <Text style={styles.listHeader}>Uczestnicy zakupu</Text>
        <FlatList
          alwaysBounceVertical={false}
          data={listItemData.assignees}
          renderItem={({ item }) => <ListItemAssignee assignee={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
}

const ListItemAssignee = (props: { assignee: Assignee }) => {
  return (
    <View style={styles.assignee}>
      <Text style={styles.assigneeName}>{getAssigneeDisplayName(props.assignee)}</Text>
      <Text style={styles.assignePrice}>{props.assignee.amount} PLN</Text>
    </View>
  );
};

const getAssigneeDisplayName = (assignee: Assignee) => {
  if (assignee.firstName && assignee.lastName) {
    return `${assignee.firstName} ${assignee.lastName}`;
  }

  return assignee.username;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
    padding: 10,
    gap: 10,
    marginBottom: 20,
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
  participateButton: {
    padding: 10,
    backgroundColor: "#33b249",
    width: "100%",
    borderRadius: 5,
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
