import React, { useState } from "react";
import { View, Text, TextInput } from "@/components/Themed";
import { Alert, ScrollView, StyleSheet, useColorScheme } from "react-native";
import ModalHeader from "./ModalHeader";
import Colors from "@/constants/Colors";
import ButtonWithLoader from "../ButtonWithLoader";
import SharedListUserBadge from "../SharedListUserBadge";
import { unshare } from "@/api/requests/unshare";
import { useStorageState } from "@/context/useStorageState";

type ShareListProps = {
  listId: string;
  handleClose: () => void;
  handleShare: (email: string) => void;
  isLoading: boolean;
  sharedListUsers: SharedListUser[];
  refetchUsers: () => void;
};

const ShareList = ({ listId, handleClose, handleShare, isLoading, sharedListUsers, refetchUsers }: ShareListProps) => {
  const colorScheme = useColorScheme();
  const [email, setEmail] = useState<string>("");
  const [[_, session]] = useStorageState("session");

  const onRemove = (id: number, email: string) => {
    console.log("Remove");
    Alert.alert("Usuń dostęp", `Czy na pewno chcesz cofnąć dostęp użytkownika ${email} do tej listy?`, [
      {
        text: "NIE",
        onPress: () => console.log("Cancel Pressed"), //TODO
        style: "cancel",
      },
      { text: "Tak", onPress: () => removeUser(id, email) }, //TODO
    ]);
  };

  const removeUser = (id: number, email: string) => {
    try {
      console.log("Remove user", id, email);
      unshare({ listId, userId: id }, session!);
      refetchUsers();
    } catch {
      console.error("Error removing user");
    }
  };

  const sharedListUsersBadges = sharedListUsers.map((user) => {
    return <SharedListUserBadge key={user.email} id={user.id} email={user.email} onRemove={onRemove} />;
  });

  const handleSharePress = () => {
    handleShare(email);
    setEmail("");
  };

  return (
    <>
      <ModalHeader handleClose={handleClose} headerText="Udostępnij listę" colorScheme={colorScheme} />
      <View style={[styles.modalView, { backgroundColor: Colors[colorScheme ?? "light"].cardBackground }]}>
        <Text style={styles.label}>Udostępnione użytkownikom:</Text>
        <ScrollView style={{ maxHeight: 300 }}>{sharedListUsersBadges}</ScrollView>
        <Text style={styles.label}>Udostępnij listę użytkownikowi:</Text>
        <TextInput placeholder="Email użytkownika" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />
        <ButtonWithLoader title="Udostępnij" onPress={handleSharePress} isLoading={isLoading} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  modalView: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default ShareList;
