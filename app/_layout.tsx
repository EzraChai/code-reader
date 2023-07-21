import { Stack } from "expo-router";

export default function MainLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          statusBarAnimation: "fade",
          statusBarColor: "#f2f2f2",
          statusBarStyle: "dark",
          headerShown: false,
          orientation: "portrait",
        }}
      />
    </Stack>
  );
}
