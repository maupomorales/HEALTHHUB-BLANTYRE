import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Provider as PaperProvider } from "react-native-paper"
import Toast from "react-native-toast-message"

export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#2563eb",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Blantyre Health Hub",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            title: "Subscribe to Health Updates",
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="search"
          options={{
            title: "Find Healthcare Services",
          }}
        />
        <Stack.Screen
          name="emergency"
          options={{
            title: "Emergency Services",
            headerStyle: {
              backgroundColor: "#dc2626",
            },
          }}
        />
        <Stack.Screen
          name="provider/[id]"
          options={{
            title: "Provider Details",
          }}
        />
      </Stack>
      <StatusBar style="light" />
      <Toast />
    </PaperProvider>
  )
}
