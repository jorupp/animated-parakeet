import { SHA256 } from "crypto-js";
import {
  CryptoDigestAlgorithm,
  CryptoEncoding,
  digestStringAsync,
} from "expo-crypto";
import { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";

interface Props {
  message: string;
  expected: string;
  name?: string;
}

export const Sha256Test = ({ message, expected, name }: Props) => {
  const crypto = useMemo(() => {
    return SHA256(message)?.toString();
  }, [message]);
  const [expo, setExpo] = useState("Loading...");
  useEffect(() => {
    (async () => {
      try {
        const result = setExpo(
          await digestStringAsync(CryptoDigestAlgorithm.SHA256, message, {
            encoding: CryptoEncoding.HEX,
          })
        );
      } catch (e) {
        setExpo("Error: " + JSON.stringify(e));
      }
    })();
  }, [message]);

  return (
    <View>
      <Text>SHA256 {name ?? message}</Text>
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
