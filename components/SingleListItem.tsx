import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import { View, Text } from "./Themed";
import Colors from "@/constants/Colors";
import * as Progress from "react-native-progress";

interface SingleListProps {
    listItem: ListItem;
    listId: string;
}

const SingleListItem = ({ listItem, listId }: SingleListProps) => {
    const colorScheme = useColorScheme();

    const assignedMoneySum = listItem.assignees?.reduce((acc, assignee) => acc + assignee.amount, 0) || 0;
    const progress = assignedMoneySum / listItem.price;

    const containerStyle = {
        ...styles.container,
        backgroundColor: Colors[colorScheme ?? "light"].cardBackground,
        shadowColor: Colors[colorScheme ?? "light"].shadow,
        borderBottomColor: Colors[colorScheme ?? "light"].shadowedCardBorder,
    };

    return (
        <TouchableOpacity
            onPress={() => {
                router.navigate({ pathname: "/listItem/[id]", params: { id: listItem.id.toString(), listItem: JSON.stringify(listItem), listId: listId } });
            }}
            style={[containerStyle]}
        >
            <View style={[styles.textContainer, { backgroundColor: Colors[colorScheme ?? "light"].cardBackground }]}>
                <Text style={styles.title}>{listItem.title}</Text>
                <Progress.Bar style={styles.progressBar} progress={progress} animated={false} height={8} width={null} />
                <Text style={styles.description}>
                    {assignedMoneySum} zł / {listItem.price} zł
                </Text>
            </View>
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
        marginBottom: 15,
        borderBottomWidth: 1,
        justifyContent: "space-between",
        alignItems: "center",
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
        marginVertical: 3,
    },
    description: {
        fontSize: 14,
    },
    progressBar: {
        marginVertical: 5,
    },
});

export default SingleListItem;
