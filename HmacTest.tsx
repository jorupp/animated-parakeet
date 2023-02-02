import { HmacSHA256 } from "crypto-js";
import { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import { expoHmacSHA256 } from "./expo-hmac";

interface Props {
  message: string;
  keyString: string;
  expected: string;
  name?: string;
}

export const HmacTest = ({ message, keyString, expected, name }: Props) => {
  const crypto = useMemo(() => {
    return HmacSHA256(message, keyString)?.toString();
  }, [message, keyString]);
  const [expo, setExpo] = useState("Loading...");
  useEffect(() => {
    (async () => {
      try {
        setExpo(await expoHmacSHA256(message, keyString));
      } catch (e) {
        console.error(e);
        setExpo("Error: " + JSON.stringify(e));
      }
    })();
  }, [message, keyString]);

  return (
    <View>
      <Text>HMAC-SHA256 {name ?? message}</Text>
      <Text>Expected: {expected}</Text>
      <Text style={expo === expected ? { fontWeight: "bold" } : {}}>
        Expo: {expo}
      </Text>
      <Text style={crypto === expected ? { fontWeight: "bold" } : {}}>
        CryptoJs: {crypto}
      </Text>
    </View>
  );
};
