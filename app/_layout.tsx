import { Stack } from "expo-router";

export default function MainLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          statusBarColor: "black",
          statusBarStyle: "auto",
          headerShown: false,
          orientation: "portrait",
        }}
      />
      <Stack.Screen
        name="scan"
        options={{
          statusBarColor: "black",
          statusBarStyle: "auto",
          headerShown: false,
          orientation: "portrait",
        }}
      />
    </Stack>
  );
}
