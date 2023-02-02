import { describe, expect, it } from "@jest/globals";
import { expoHmacSHA256 } from "./expo-hmac";
import hmacSHA256 from "crypto-js/hmac-sha256";

function doTest(message: string, key: string, expected: string, name?: string) {
  describe(name ?? message, () => {
    it("Expo", async () => {
      const result = await expoHmacSHA256(message, key);
      expect(result).toEqual(expected);
    });
    it("crypto-js", () => {
      const result = hmacSHA256(message, key).toString();
      expect(result).toEqual(expected);
    });
  });
}

describe("hmac 256", () => {
  doTest(
    "basic",
    "key",
    "22e70e1e862b47f3dac8641d859876d71c33e6208474116df38c437e6a694d07"
  );
});
