import { describe, expect, it } from "@jest/globals";
import {
  CryptoDigestAlgorithm,
  CryptoEncoding,
  digestStringAsync,
} from "expo-crypto";
import sha256 from "crypto-js/sha256";

function doTest(message: string, expectedHash: string, name?: string) {
  describe(name ?? message, () => {
    it("Expo", async () => {
      const result = await digestStringAsync(
        CryptoDigestAlgorithm.SHA256,
        message,
        { encoding: CryptoEncoding.HEX }
      );
      expect(result).toEqual(expectedHash);
    });
    it("crypto-js", () => {
      const result = sha256(message).toString();
      expect(result).toEqual(expectedHash);
    });
  });
}

describe("sha 256", () => {
  doTest(
    "testing 1 2 3",
    "bd7e7256257150da48bb20d21779be9527710f3a31bbb6f1cdb4e200cc5b887e"
  );
});
