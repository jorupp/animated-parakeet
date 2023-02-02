import crypto from "node:crypto";

export async function nodeHmacSHA256(message: string, key: string) {
  return crypto.createHmac("sha256", key).update(message).digest("base64");
}
