import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const MainPage = () => {
  const router = useRouter();

  return (
    <View className="flex-1 py-64 bg-black ">
      <View className="px-6">
        <Text className="text-5xl font-bold text-neutral-200">Scan code</Text>
        <Text className="text-5xl font-bold text-neutral-500">easily.</Text>
        <View className="top-0 flex-row items-center justify-between w-full pt-6 mt-72 ">
          <Text className="text-lg font-semibold text-neutral-200">
            Get started.
          </Text>
          <TouchableOpacity
            onPressOut={() => router.replace("scan")}
            activeOpacity={0.6}
            className="items-center justify-center bg-white rounded-full w-14 h-14"
          >
            <MaterialIcons name="qr-code" size={28} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MainPage;
