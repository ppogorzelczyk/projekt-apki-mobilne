import React from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import { Text } from "@/components/Themed";
import SingleListItem from "./SingleListItem";
import NoItems from "./NoItems";

type ListItemsProps = {
    title: string;
    description: string;
    listItems: ListItem[];
    topLoading: boolean;
    onRefresh?: () => void;
    listId: string
};

const ListItems = ({ title, description, listItems, topLoading, onRefresh, listId }: ListItemsProps) => {
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
            renderItem={({ item }) => <SingleListItem listItem={item} listId={listId} />}
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

export default ListItems;
