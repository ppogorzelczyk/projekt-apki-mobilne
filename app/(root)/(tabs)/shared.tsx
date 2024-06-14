import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { GetSharedListsQueryKey } from "@/api/constants";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSharedLists } from "@/api/requests/getSharedLists";
import { useStorageState } from "@/context/useStorageState";
import * as Progress from "react-native-progress";
import SharedLists from "@/components/SharedLists";

export default function SharedListsScreen() {
  const [lists, setLists] = useState<List[]>([]);
  const [topLoading, setTopLoading] = useState<boolean>(false);
  const [[isLoading, session]] = useStorageState("session");
  const query = useQuery({
    queryKey: GetSharedListsQueryKey,
    queryFn: () => {
      return getSharedLists(session as string);
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

  return (
    <View style={styles.container}>
      {(isLoading || query.isLoading) && (!lists || lists.length == 0) && <Progress.Circle thickness={5} indeterminate={true} style={styles.loading} />}
      <SharedLists lists={lists} topLoading={topLoading} onRefresh={handleRefresh} />
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
