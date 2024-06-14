import React from "react";
import { FlatList, StyleSheet, RefreshControl } from "react-native";
import MySingleList from "./MySingleList";
import { View } from "./Themed";
import NoItems from "./NoItems";

type ListsProps = {
  lists: List[];
  topLoading: boolean;
  onRefresh: () => void;
};

const MyLists = ({ lists, topLoading, onRefresh }: ListsProps) => {
  const renderSeparator = () => <View style={{ height: 10 }} />;

  const getEventDate = (eventDate: string | undefined) => {
    if (!eventDate) {
      return undefined;
    }
    return new Date(eventDate).toISOString().split("T")[0].trim();
  };

  return (
    <FlatList
      style={styles.container}
      data={lists}
      renderItem={({ item }) => <MySingleList id={item.id} title={item.title} description={item.description} eventDate={getEventDate(item.eventDate)} />}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={renderSeparator}
      refreshControl={<RefreshControl refreshing={topLoading} onRefresh={onRefresh} />}
      ListEmptyComponent={<NoItems />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
});

export default MyLists;
