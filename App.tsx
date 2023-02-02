import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { HmacTest } from "./HmacTest";
import { Sha256Test } from "./Sha256Test";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <HmacTest
        message="basic"
        keyString="key"
        expected="22e70e1e862b47f3dac8641d859876d71c33e6208474116df38c437e6a694d07"
      />
      <Sha256Test
        message="testing 1 2 3"
        expected="bd7e7256257150da48bb20d21779be9527710f3a31bbb6f1cdb4e200cc5b887e"
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
