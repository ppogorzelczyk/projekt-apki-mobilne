import { useSession } from "@/context/ctx";
import { Redirect, Stack } from "expo-router";

export default function AppLayout() {
    const { session, isLoading } = useSession();
    if (isLoading) {
        return null;
    }

    // Only require authentication within the (root) group's layout as users
    // need to be able to access the (auth) group and sign in again.
    if (!session) {
        // On web, static rendering will stop here as the user is not authenticated
        // in the headless Node process that the pages are rendered in.
        return <Redirect href="/(auth)/sign-in" />;
    }

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
                name="profile"
                options={{
                    title: "Profil",
                    headerBackTitleVisible: false,
                    animation: "slide_from_right",
                }}
            />
            <Stack.Screen
                name="list/[id]"
                options={{
                    title: "Elementy listy",
                    headerBackTitleVisible: false,
                    animation: "slide_from_right",
                }}
            />
            <Stack.Screen
                name="sharedList/[id]"
                options={{
                    title: "Udostępniona lista",
                    headerBackTitleVisible: false,
                    animation: "slide_from_right",
                }}
            />
            <Stack.Screen
                name="listItem/[id]"
                options={{
                    title: "Element listy",
                    headerBackTitleVisible: false,
                    animation: "slide_from_right",
                }}
            />
            <Stack.Screen
                name="sharedListItem/[id]"
                options={{
                    title: "Element listy udostępnionej",
                    headerBackTitleVisible: false,
                    animation: "slide_from_right",
                }}
            />
            <Stack.Screen
                name="addListItem/[id]"
                options={{
                    title: "Dodaj element listy",
                    headerBackTitleVisible: false,
                }}
            />
            <Stack.Screen
                name="addList"
                options={{
                    title: "Dodaj listę",
                    headerBackTitleVisible: false,
                    animation: "slide_from_bottom",
                }}
            />
        </Stack>
    );
}
