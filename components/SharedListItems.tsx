import React from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import { Text } from "@/components/Themed";
import SingleListItem from "./SingleListItem";
import NoItems from "./NoItems";
import SharedListItem from "./SharedListItem";

type SharedListItemsProps = {
    title: string;
    description: string;
    listItems: ListItem[];
    topLoading: boolean;
    onRefresh?: () => void;
    listId: string;
};

const SharedListItems = ({ title, description, listItems, topLoading, onRefresh, listId }: SharedListItemsProps) => {
    return (
        <FlatList
            ListHeaderComponent={
                <>
                    <Text style={styles.header}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                </>
            }
            style={styles.container}
            data={listItems}
            renderItem={({ item }) => <SharedListItem listItem={item} listId={listId} />}
            keyExtractor={(item) => item.id.toString()}
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
    header: {
        fontSize: 24,
        fontWeight: "bold",
        padding: 10,
    },
    description: {
        fontSize: 16,
        paddingBottom: 20,
        paddingHorizontal: 10,
    },
});

export default SharedListItems;
