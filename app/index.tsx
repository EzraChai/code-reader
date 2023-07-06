import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";

const MainPage = () => {
  const router = useRouter();

  return (
    <View className="flex-1 py-64">
      <View className="px-6 ">
        <Text className="text-5xl font-bold text-neutral-900">Scan code</Text>
        <Text className="text-5xl font-bold text-neutral-400">easily.</Text>
        <View className="flex-row items-center justify-between w-full pt-10 mt-64 ">
          <Text className="text-lg font-semibold text-neutral-900">
            Get started
          </Text>
          <TouchableOpacity
            onPressOut={() => router.replace("scanCamera")}
            activeOpacity={0.6}
            className="items-center justify-center w-16 h-16 bg-black rounded-full"
          >
            <MaterialIcons name="qr-code" size={32} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <Stack.Screen
        options={{
          statusBarColor: "#",
        }}
      />
    </View>
  );
};

export default MainPage;
