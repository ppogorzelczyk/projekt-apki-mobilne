import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import FAB from "@/components/FAB";
import { router } from "expo-router";
import { getLists } from "@/api/requests/getLists";
import { useQuery } from "@tanstack/react-query";
import { GetListsQueryKey } from "@/api/constants";
import { useStorageState } from "@/context/useStorageState";
import * as Progress from "react-native-progress";
import { eventEmitter } from "@/app/_layout";
import MyLists from "@/components/MyLists";

export default function MyListsScreen() {
  const [lists, setLists] = useState<List[]>([]);
  const [topLoading, setTopLoading] = useState<boolean>(false);
  const [[isLoading, session]] = useStorageState("session");
  const query = useQuery({
    queryKey: GetListsQueryKey,
    queryFn: () => {
      return getLists(session as string);
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
      setLists(query.data ?? []);
    }
  }, [query.isLoading, query.data]);

  const handleRefresh = async () => {
    setTopLoading(true);
    query.refetch();
    setTopLoading(false);
  };

  useEffect(() => {
    eventEmitter.addListener("newListAdded", handleRefresh);
    return () => {
      eventEmitter.removeListener("newListAdded", handleRefresh);
    };
  }, []);

  return (
    <View style={styles.container}>
      {(isLoading || query.isLoading) && (!lists || lists.length == 0) && <Progress.Circle thickness={5} indeterminate={true} style={styles.loading} />}
      <MyLists lists={lists} topLoading={topLoading} onRefresh={handleRefresh} />
      <FAB onPress={() => router.navigate({ pathname: "/addList" })} />
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
