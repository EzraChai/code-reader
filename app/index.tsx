import { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Vibration,
  Pressable,
  Button,
  Image,
} from "react-native";
import { Camera, CameraType, FlashMode, PermissionStatus } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";
import * as ImagePicker from "expo-image-picker";
import * as BarCodeScanner from "expo-barcode-scanner";

const chuiImage = require("../assets/chui.png");

export default function ScanPage() {
  const [cameraType, setCameraType] = useState<CameraType>(CameraType.back);
  const [flashMode, setFlashMode] = useState<FlashMode>(FlashMode.off);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const requestCameraPermission = async () => {
    await requestPermission();
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
    });

    if (result.canceled) {
      return;
    }

    const scannedResult = await BarCodeScanner.scanFromURLAsync(
      result.assets[0].uri
    );

    if (!scannedResult[0]) {
      setScanned(true);
      setData("Opps, QR Code not found!");
      return;
    }

    handleBarCodeScanned(scannedResult[0]);
  };

  useEffect(() => {
    requestCameraPermission();
  }, []);

  if (!permission) {
    return <View />;
  }

  if (permission?.status === PermissionStatus.DENIED) {
    return (
      <View className="items-center justify-center flex-1 ">
        <Text className="text-lg font-semibold text-neutral-900">
          Opps! No access to camera
        </Text>
        <Button
          title="Request Permission"
          onPress={() => requestPermission()}
        ></Button>
      </View>
    );
  }

  const handleBarCodeScanned = async ({ data }) => {
    Vibration.vibrate(200);
    setData(data);

    setScanned(true);
    if (await Linking.canOpenURL(data)) {
      Linking.openURL(data);
    }
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(data);
  };

  const handleRemoveScanned = () => {
    setScanned(false);
    setData(null);
  };

  return (
    <View className="items-center justify-center flex-1 ">
      {!scanned && (
        <>
          <View className="absolute z-10 w-64 h-64 border-2 border-white opacity-40 rounded-2xl" />
        </>
      )}
      <Camera
        flashMode={flashMode}
        type={cameraType}
        className="absolute z-0 flex-1 w-full h-2/3"
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
      <View className="absolute top-0 z-20 w-full bg-[#f2f2f2] h-32 ">
        <TouchableOpacity
          activeOpacity={0.6}
          className="absolute top-20 left-6"
          onPressOut={() =>
            setFlashMode((flashMode) =>
              flashMode === FlashMode.off ? FlashMode.torch : FlashMode.off
            )
          }
        >
          <MaterialIcons
            name={flashMode === FlashMode.off ? "flash-off" : "flash-on"}
            size={32}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          className="absolute top-20 right-6"
          onPressOut={() =>
            setCameraType((cameraType) =>
              cameraType === CameraType.back
                ? CameraType.front
                : CameraType.back
            )
          }
        >
          <MaterialIcons name="flip-camera-ios" size={32} color="black" />
        </TouchableOpacity>
      </View>

      {!!scanned && (
        <>
          <Text
            onLongPress={copyToClipboard}
            className="absolute z-30 px-4 py-2 mx-4 text-lg font-semibold bg-black rounded-lg text-neutral-200"
          >
            {data}
          </Text>
          <Pressable onPressOut={handleRemoveScanned}>
            <View className="items-center justify-center w-screen h-full top-10 bg-black/60">
              <View className="absolute z-10 px-2 py-1 bottom-60 ">
                <Text className=" text-md text-neutral-400">
                  Tap to Scan Again
                </Text>
              </View>
            </View>
          </Pressable>
        </>
      )}
      <View className="absolute bottom-0 z-30 flex-row justify-between w-full h-32 bg-[#f2f2f2] ">
        <View className="items-center justify-center mt-6 ml-6 w-14 h-14 ">
          <TouchableOpacity onPressOut={pickImageAsync}>
            <View className="items-center justify-center w-12 h-12 border border-gray-800 rounded-lg ">
              <MaterialIcons name="image" size={36} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <View className="mr-6">
          <Image source={chuiImage} className="w-32 h-24" />
        </View>
      </View>
    </View>
  );
}
