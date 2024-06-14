import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@/components/Themed";
import { TextInput } from "@/components/Themed";
import AuthLayout from "@/components/auth/AuthLayout";
import ButtonWithLoader from "@/components/ButtonWithLoader";
import { register } from "@/api/requests/register";

const Register: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState({
        email: "",
        password: "",
        passwordConfirmation: "",
        username: "",
        phoneNumber: "",
        firstName: "",
        lastName: "",
        showEmailError: false,
        showPasswordError: false,
        showPasswordConfirmationError: false,
        showUsernameError: false,
        showPhoneNumberError: false,
        showFirstNameError: false,
        showLastNameError: false,
    });

    const handleChange = (name: string, value: string) => {
        setForm({
            ...form,
            [name]: value,
            [`show${name.charAt(0).toUpperCase() + name.slice(1)}Error`]: false,
        });
    };

    const handleSubmit = async () => {
        let emailError = false;
        let passwordError = false;
        let passwordConfirmationError = false;
        let usernameError = false;
        let phoneNumberError = false;
        if (!form.email || !form.email.includes("@")) {
            emailError = true;
        }
        if (!form.password || form.password.length < 5) {
            passwordError = true;
        }
        if (form.password !== form.passwordConfirmation) {
            passwordConfirmationError = true;
        }
        if (!form.username || form.username.length < 4) {
            usernameError = true;
        }
        if (form.phoneNumber && !/^(\+\d{8,}|\d{8,})$/.test(form.phoneNumber)) {
            phoneNumberError = true;
        }

        if (emailError || passwordError || usernameError || phoneNumberError) {
            setError("Wypełnij poprawnie wszystkie pola"); //TODO validate better
            return setForm({
                ...form,
                showEmailError: emailError,
                showPasswordError: passwordError,
                showUsernameError: usernameError,
                showPhoneNumberError: phoneNumberError,
                showPasswordConfirmationError: passwordConfirmationError,
            });
        }

        setIsLoading(true);
        try {
            await register(form);
            console.log("Registered successfully user:", form.email);
            setIsLoading(false);
            setError(null);
            router.replace({ pathname: "/sign-in", params: { success: "true" } });
        } catch (e: any) {
            setError(e.message);
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout>
            <TextInput
                style={[styles.input, form.showEmailError && { borderColor: "red" }]}
                placeholder="Adres e-mail"
                value={form.email}
                onChangeText={(text: any) => handleChange("email", text)}
                autoFocus
                keyboardType="email-address"
            />
            <TextInput
                style={[styles.input, form.showPasswordError && { borderColor: "red" }]}
                placeholder="Hasło"
                value={form.password}
                onChangeText={(text: any) => handleChange("password", text)}
                secureTextEntry
            />
            <TextInput
                style={[styles.input, form.showPasswordConfirmationError && { borderColor: "red" }]}
                placeholder="Potwierdź hasło"
                value={form.passwordConfirmation}
                onChangeText={(text: any) => handleChange("passwordConfirmation", text)}
                secureTextEntry
            />
            <TextInput
                style={[styles.input, form.showUsernameError && { borderColor: "red" }]}
                placeholder="Nazwa użytkownika"
                value={form.username}
                onChangeText={(text: any) => handleChange("username", text)}
            />
            <TextInput
                style={[styles.input, form.showPhoneNumberError && { borderColor: "red" }]}
                placeholder="Nr telefonu"
                value={form.phoneNumber}
                onChangeText={(text: any) => handleChange("phoneNumber", text)}
                keyboardType="phone-pad"
            />
            <TextInput style={styles.input} placeholder="Imię" value={form.firstName} onChangeText={(text: any) => handleChange("firstName", text)} />
            <TextInput style={styles.input} placeholder="Nazwisko" value={form.lastName} onChangeText={(text: any) => handleChange("lastName", text)} />
            <ButtonWithLoader title="Zarejestruj się" onPress={handleSubmit} isLoading={isLoading} />
            {error && <Text style={styles.error}>{error}</Text>}
            <View>
                <Text style={styles.login} onPress={() => router.replace({ pathname: "/sign-in" })}>
                    Wróć do logowania
                </Text>
            </View>
        </AuthLayout>
    );
};

const styles = StyleSheet.create({
    login: {
        color: "#007AFF",
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20,
        marginBottom: 40,
    },
    input: {
        padding: 10,
        marginBottom: 10,
        width: "80%",
    },
    error: {
        color: "red",
        textAlign: "center",
        marginBottom: 10,
    },
});

export default Register;
