import React, { useEffect, useState } from "react";
import { StyleSheet, Modal, Alert, useColorScheme, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from "react-native";
import { View, Text } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { deleteList } from "@/api/requests/deleteList";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useStorageState } from "@/context/useStorageState";
import { GetListQueryKey, GetSharedListUsersQueryKey, GetSharedListsQueryKey } from "@/api/constants";
import MainIcons from "./MainIcons";
import ShareList from "./ShareList";
import { share } from "@/api/requests/share";
import Toast from "react-native-toast-message";
import { getSharedListUsers } from "@/api/requests/getSharedListUsers";

type ListModalProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  listId: string;
};

const ListModal = ({ listId, modalVisible, setModalVisible }: ListModalProps) => {
  const [isSharedButtonLoading, setIsSharedButtonLoading] = useState<boolean>(false);
  const [[isLoading, session]] = useStorageState("session");
  const [isShared, setIsShared] = useState<boolean>(false);
  const colorScheme = useColorScheme();
  const queryClient = useQueryClient();
  const [sharedListUsers, setSharedListUsers] = useState<SharedListUser[]>([]); //TODO get shared users from query
  const handleEditPress = () => {
    console.log("Edit");
  };

  const handleSharePress = () => {
    setIsShared(true);
  };

  const dismissModal = () => {
    setModalVisible(false);
    setIsShared(false);
  };

  const shareToUser = async (email: string) => {
    setIsSharedButtonLoading(true);
    await shareMutation.mutateAsync(email);
  };

  const shareMutation = useMutation({
    mutationFn: async (email: string) => share({ listId, email }, session as string),
    onSuccess: (data, variables, context) => {
      Toast.show({
        text1: `Lista udostępniona użytkownikowi ${variables}.`,
        type: "success",
      });
      //TODO refresh user list
      setIsSharedButtonLoading(false);
    },
    onError: (error) => {
      console.error(error);
      Toast.show({
        text1: "Błąd udostępniania listy. Spróbuj ponownie później.",
        type: "error",
      });
      setIsSharedButtonLoading(false);
    },
  });

  const getSharedUsersQuery = useQuery({
    queryKey: GetSharedListUsersQueryKey,
    queryFn: () => {
      return getSharedListUsers(listId, session as string);
    },
    enabled: false,
  });

  const deleteMutation = useMutation({
    mutationFn: (listId: string) => deleteList(listId, session as string),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GetListQueryKey,
        refetchType: "all",
      });
      setModalVisible(false);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleDeletePress = () => {
    Alert.alert("Usuwanie listy", "Czy na pewno chcesz usunąć tę listę?", [
      {
        text: "Anuluj",
        style: "cancel",
      },
      { text: "Usuń", onPress: () => deleteMutation.mutate(listId) },
    ]);
  };

  useEffect(() => {
    if (!getSharedUsersQuery.isLoading && getSharedUsersQuery.data) {
      setSharedListUsers(getSharedUsersQuery.data ?? []);
    }
  }, [getSharedUsersQuery.isLoading, getSharedUsersQuery.data]);

  useEffect(() => {
    if (modalVisible && session) {
      getSharedUsersQuery.refetch();
    }
  }, [modalVisible]);

  const modalBody = isShared ? (
    <ShareList
      listId={listId}
      handleClose={dismissModal}
      handleShare={shareToUser}
      isLoading={isSharedButtonLoading}
      sharedListUsers={sharedListUsers}
      refetchUsers={() => getSharedUsersQuery.refetch()}
    />
  ) : (
    <MainIcons handleEditPress={handleEditPress} handleSharePress={handleSharePress} handleDeletePress={handleDeletePress} handleClose={dismissModal} />
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={styles.centeredView}>
        <TouchableWithoutFeedback onPress={dismissModal}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={[styles.modalView, { backgroundColor: Colors[colorScheme ?? "light"].cardBackground }]}
          keyboardVerticalOffset={-50}
        >
          <View
            style={[
              styles.modalView,
              {
                backgroundColor: Colors[colorScheme ?? "light"].cardBackground,
                paddingTop: 5,
                paddingBottom: Platform.OS === "ios" ? 50 : 10,
                paddingHorizontal: 10,
                marginHorizontal: 0,
              },
            ]}
          >
            {modalBody}
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "transparent",
  },
  modalView: {
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default ListModal;
