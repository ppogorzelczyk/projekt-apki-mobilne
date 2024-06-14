import React, { useEffect, useState } from "react";
import { StyleSheet, Modal, Alert, useColorScheme, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Button } from "react-native";
import { View, Text, TextInput } from "@/components/Themed";

import Colors from "@/constants/Colors";
import ModalHeader from "./listModal/ModalHeader";
import ButtonWithLoader from "./ButtonWithLoader";
import CurrencyInput from "react-native-currency-input";
type SharedListItemModalProps = {
    onSubmitted: (amount: number) => void;
    onCancel: () => void;
    item: ListItem;
    visible: boolean;
    isModalLoading: boolean;
};

export const SharedListItemModal = ({ onSubmitted: onSubmitted, onCancel, item, visible, isModalLoading }: SharedListItemModalProps) => {
    const [amount, setAmount] = useState(1);
    const colorScheme = useColorScheme();

    const handleParticipate = async () => {
        onSubmitted(amount);
    }

    const setPrice = (price: number | null) => {
        if (price == null) {
            setAmount(1);
            return;
        }

        if (price > item.price) {
            setAmount(item.price);
            return;
        }

        setAmount(price);
    }

    let missingToFullPrice = item.price

    if (item.assignees) {
        missingToFullPrice = item.price - item.assignees.reduce((acc, assignee) => acc + assignee.amount, 0);
    }

    const inputStyle = {
        ...styles.input,
        backgroundColor: colorScheme == "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
        color: Colors[colorScheme ?? "light"].text,
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onCancel}
        >
            <View style={styles.centeredView}>
                <TouchableWithoutFeedback onPress={onCancel}>
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
                        <ModalHeader handleClose={onCancel} headerText="Dołącz do zakupu" colorScheme={colorScheme} />
                        <View style={[styles.bodyContainer, { backgroundColor: Colors[colorScheme ?? "light"].cardBackground }]}>
                            <Text style={styles.label}>Do pełnej kwoty: {missingToFullPrice} PLN</Text>
                            <CurrencyInput
                                style={inputStyle}
                                placeholder="Wartość"
                                value={amount}
                                onChangeValue={setPrice}
                                delimiter=" "
                                separator="."
                                suffix=" PLN"
                                minValue={1}
                                precision={2}
                            />
                            <ButtonWithLoader title="Dołącz" onPress={handleParticipate} isLoading={isModalLoading} />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
}

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
    bodyContainer: {
        padding: 20,
    },
});
