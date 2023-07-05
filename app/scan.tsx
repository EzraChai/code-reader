import { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Vibration,
  ToastAndroid,
  Pressable,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { MaterialIcons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";

export default function ScanPage() {
  const [cameraType, setCameraType] = useState<"back" | "front">("back");
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    Vibration.vibrate(200);
    setScanned(true);
    if (await Linking.canOpenURL(data)) {
      Linking.openURL(data);
    }
    setData(data);
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(data);
    await ToastAndroid.showWithGravity(
      "Text copied",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
  };

  const handleRemoveScanned = () => {
    setScanned(false);
    setData(null);
  };

  if (hasPermission === null) {
    return (
      <View className="items-center justify-center flex-1 bg-black">
        <Text className="text-lg font-semibold text-neutral-200">
          Requesting for camera permission
        </Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View className="items-center justify-center flex-1 bg-black">
        <Text className="text-lg font-semibold text-neutral-200">
          Opps! No access to camera
        </Text>
      </View>
    );
  }

  return (
    <View className="items-center justify-center flex-1 overflow-hidden bg-black">
      <BarCodeScanner
        type={cameraType}
        className="absolute w-full h-full"
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
      <TouchableOpacity
        activeOpacity={0.6}
        className="absolute top-24 right-6"
        onPressOut={() =>
          setCameraType((cameraType) =>
            cameraType === "back" ? "front" : "back"
          )
        }
      >
        <MaterialIcons name="flip-camera-ios" size={32} color="white" />
      </TouchableOpacity>
      {scanned && (
        <>
          <Text
            onLongPress={copyToClipboard}
            className="absolute z-30 px-4 py-2 mx-4 text-lg font-semibold bg-black rounded-lg text-neutral-200"
          >
            {data}
          </Text>
          <Pressable onPressOut={handleRemoveScanned}>
            <View className="items-center justify-center w-screen h-screen bg-black/60">
              <View className="absolute z-20 px-2 py-1 mt-16 bottom-48 ">
                <Text className=" text-md text-neutral-400">
                  Tap to Scan Again
                </Text>
              </View>
            </View>
          </Pressable>
        </>
      )}
    </View>
  );
}
