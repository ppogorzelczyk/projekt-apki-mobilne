import { StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { View } from "@/components/Themed";
import FAB from "@/components/FAB";
import { useEffect, useState } from "react";
import { getList } from "@/api/requests/getList";
import ListItems from "@/components/ListItems";
import { useStorageState } from "@/context/useStorageState";
import { GetListQueryKey } from "@/api/constants";
import { useQuery } from "@tanstack/react-query";
import * as Progress from "react-native-progress";
import SharedListItems from "@/components/SharedListItems";

export default function SharedListItemsScreen() {
    const { id, title, description } = useLocalSearchParams();

    const [topLoading, setTopLoading] = useState<boolean>(false);
    const [list, setList] = useState<GetListResponse>();
    const [[isLoading, session]] = useStorageState("session");

    const query = useQuery({
        queryKey: GetListQueryKey,
        queryFn: () => {
            return getList(id as string, session as string);
        },
        enabled: false,
    });

    useEffect(() => {
        if (session) {
            query.refetch();
        }
    }, [session]);

    useEffect(() => {
        if (!query.isLoading && query.data) {
            setList(query.data ?? []);
        }
    }, [query.isLoading, query.data]);

    const handleRefresh = async () => {
        setTopLoading(true);
        query.refetch();
        setTopLoading(false);
    };

    return (
        <View style={styles.container}>
            {(isLoading || query.isLoading) && !list ? (
                <Progress.Circle thickness={5} indeterminate={true} style={styles.loading} />
            ) : (
                // TODO handle error
                <SharedListItems
                    title={list?.title ?? title!.toString()}
                    description={list?.description ?? description!.toString()}
                    listItems={list?.items ?? []}
                    topLoading={topLoading}
                    onRefresh={handleRefresh}
                    listId={id as string}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loading: {
        flex: 1,
        paddingTop: 10,
        justifyContent: "flex-start",
        alignItems: "center",
    },
});
