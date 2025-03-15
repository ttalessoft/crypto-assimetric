import { randomBytes, createCipheriv, createDecipheriv } from "crypto";

const algorithm = "aes-256-cbc";
const key = randomBytes(32); // Chave secreta de 32 bytes
const iv = randomBytes(16); // Vetor de inicialização de 16 bytes

// Função para cifrar mensagem
export function encryptMessage(message: string): string {
  const cipher = createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(message, "utf8", "base64");
  encrypted += cipher.final("base64");
  return `${iv.toString("base64")}:${encrypted}`;
}

// Função para decifrar mensagem
export function decryptMessage(encryptedMessage: string): string {
  const [ivString, encrypted] = encryptedMessage.split(":");
  const decipher = createDecipheriv(
    algorithm,
    key,
    Buffer.from(ivString, "base64")
  );
  let decrypted = decipher.update(encrypted, "base64", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

// Exemplo de uso
const message = "Mensagem Secreta";
const encrypted = encryptMessage(message);
console.log("Mensagem Cifrada:", encrypted);

const decrypted = decryptMessage(encrypted);
console.log("Mensagem Decifrada:", decrypted);
