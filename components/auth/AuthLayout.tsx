import Colors from "@/constants/Colors";
import React from "react";
import { StyleSheet, Image, KeyboardAvoidingView, Platform, useColorScheme, ScrollView } from "react-native";
import { Text, View } from "@/components/Themed";

interface AuthLayoutProps {
    header?: string;
    children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ header, children }) => {
    const colorScheme = useColorScheme();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[styles.container, { backgroundColor: Colors[colorScheme ?? "light"].background }]}

        >
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContainer} alwaysBounceVertical={false}>
                <Image style={{ width: 300, height: 200 }} source={require("../../assets/images/logo.jpeg")} />
                <View style={styles.textWrapper}>
                    <Text style={styles.appName}>Buy me a gift</Text>
                    <Text style={styles.headline}>Podarunki zgodne z Twoimi marzeniami!</Text>
                    {header && <Text style={styles.header}>{header}</Text>}
                </View>
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: "center",
        paddingTop: 50,
    },
    textWrapper: {
        alignItems: "center",
    },
    appName: {
        fontSize: 24,
        fontWeight: "bold",
        paddingBottom: 10,
    },
    headline: {
        fontSize: 16,
        paddingBottom: 20,
    },
    header: {
        paddingBottom: 10,
    },
    scrollView: {
        flex: 1,
        width: "100%",
    },
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default AuthLayout;
