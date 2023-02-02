import {
  CryptoDigestAlgorithm,
  CryptoEncoding,
  digestStringAsync,
} from "expo-crypto";

const toHex = (input: Uint8Array) => {
  return Array.from(input)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

const fromUint8Array = (input: Uint8Array) => {
  let str = "";
  for (let i = 0; i < input.length; i++) {
    str += String.fromCharCode(input[i]);
  }
  return str;
};

const fromHexToUint8Array = (input: string) => {
  const arr: number[] = [];
  for (let i = 0; i < input.length; i += 2) {
    arr.push(parseInt(input.substring(i, i + 2), 16));
  }
  return new Uint8Array(arr);
};

export async function expoHmacSHA256(message: string, key: string) {
  const blockSize = 64;
  const opad = 0x5c;
  const ipad = 0x36;

  const encoder = new TextEncoder();
  const messageBuffer = encoder.encode(message);
  let keyBuffer = toHex(encoder.encode(key));
  console.log({ keyBuffer });

  if (keyBuffer.length > blockSize) {
    keyBuffer = await digestStringAsync(
      CryptoDigestAlgorithm.SHA256,
      keyBuffer,
      {
        encoding: CryptoEncoding.HEX,
      }
    );
    console.log({ keyBuffer });
  }

  const keyWithPadding = new Uint8Array(blockSize);
  keyWithPadding.set(fromHexToUint8Array(keyBuffer), 0);

  const keyWithPaddingXorOpad = new Uint8Array(blockSize);
  for (let i = 0; i < blockSize; i++) {
    keyWithPaddingXorOpad[i] = keyWithPadding[i] ^ opad;
  }

  const keyWithPaddingXorIpad = new Uint8Array(blockSize);
  for (let i = 0; i < blockSize; i++) {
    keyWithPaddingXorIpad[i] = keyWithPadding[i] ^ ipad;
  }

  const innerDigestMessage = fromUint8Array(
    new Uint8Array([...keyWithPaddingXorIpad, ...messageBuffer])
  );
  const innerDigestHex = await digestStringAsync(
    CryptoDigestAlgorithm.SHA256,
    innerDigestMessage,
    {
      encoding: CryptoEncoding.HEX,
    }
  );
  console.log({
    keyWithPadding,
    keyWithPaddingXorOpad,
    keyWithPaddingXorIpad,
    innerDigestMessage,
    messageBuffer,
    innerDigestHex,
  });
  const innerDigest = fromHexToUint8Array(innerDigestHex);

  const resultHex = await digestStringAsync(
    CryptoDigestAlgorithm.SHA256,
    fromUint8Array(new Uint8Array([...keyWithPaddingXorOpad, ...innerDigest])),
    {
      encoding: CryptoEncoding.HEX,
    }
  );
  console.log({
    innerDigest,
    resultHex,
  });

  return resultHex;
}
