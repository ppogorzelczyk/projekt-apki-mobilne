import { useSession } from "@/context/ctx";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Image, Button, ActivityIndicator } from "react-native";
import { Text, View, TextInput } from "@/components/Themed";
import { useState } from "react";
import ButtonWithLoader from "@/components/ButtonWithLoader";
import AuthLayout from "@/components/auth/AuthLayout";

export default function SignIn() {
  const { success } = useLocalSearchParams();
  const [shouldDisplaySuccess, setShouldDisplaySuccess] = useState<string | string[] | undefined>(success);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useSession();

  const handleSignIn = async () => {
    setIsLoading(true);
    setShouldDisplaySuccess(undefined);
    const signedIn = await signIn(email, password);
    setIsLoading(false);
    if (signedIn) {
      router.replace({ pathname: "/" });
    } else {
      setError("Niepoprawne dane logowania.");
    }
  };

  return (
    <AuthLayout header="Zaloguj się lub zarejestruj by kontynuować">
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoFocus keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Hasło" value={password} onChangeText={setPassword} secureTextEntry />
      {success && shouldDisplaySuccess && <Text style={styles.success}>Zarejestrowano pomyślnie! Zaloguj się by kontynuować.</Text>}
      {error && <Text style={styles.error}>{error}</Text>}

      <ButtonWithLoader title="Zaloguj" onPress={handleSignIn} isLoading={isLoading} />

      <View>
        <Text style={styles.orRegister} onPress={() => router.replace({ pathname: "/register" })}>
          lub zarejestruj
        </Text>
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 10,
    paddingTop: 100,
  },
  input: {
    padding: 10,
    marginBottom: 10,
    width: "80%",
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  success: {
    color: "green",
    marginVertical: 10,
  },
  orRegister: {
    color: "#007AFF",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
});
