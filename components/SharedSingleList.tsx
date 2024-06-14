import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import { View, Text } from "./Themed";
import Colors from "@/constants/Colors";

interface SingleListProps {
    id: number;
    title: string;
    description: string;
    ownerName: string;
}

const SharedSingleList = (props: SingleListProps) => {
    const colorScheme = useColorScheme();

    const containerStyle = {
        ...styles.container,
        backgroundColor: Colors[colorScheme ?? "light"].cardBackground,
        shadowColor: Colors[colorScheme ?? "light"].shadow,
        borderBottomColor: Colors[colorScheme ?? "light"].shadowedCardBorder,
    };

    return (
        <TouchableOpacity
            onPress={() => {
                router.navigate({
                    pathname: "/sharedList/[id]", params: {
                        id: props.id.toString(),
                        title: props.title,
                        description: props.description,
                    }
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
                {props.ownerName && <Text style={styles.ownerName}>Udostępnione przez: {props.ownerName}</Text>}
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
    ownerName: {
        fontSize: 12,
        color: "gray",
    },
});

export default SharedSingleList;
