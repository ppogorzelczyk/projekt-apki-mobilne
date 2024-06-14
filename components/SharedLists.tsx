import React from "react";
import { FlatList, StyleSheet, RefreshControl } from "react-native";
import { View } from "./Themed";
import NoItems from "./NoItems";
import SharedSingleList from "./SharedSingleList";

type ListsProps = {
  lists: List[];
  topLoading: boolean;
  onRefresh: () => void;
};

const SharedLists = ({ lists, topLoading, onRefresh }: ListsProps) => {
  const renderSeparator = () => <View style={{ height: 10 }} />;

  const getOwnerName = (owner: Owner | undefined) => {
    if (!owner) {
      return "";
    }
    return `${owner.firstName} ${owner.lastName}`.trim();
  };

  return (
    <FlatList
      style={styles.container}
      data={lists}
      renderItem={({ item }) => <SharedSingleList id={item.id} title={item.title} description={item.description} ownerName={getOwnerName(item.owner)} />}
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

export default SharedLists;
