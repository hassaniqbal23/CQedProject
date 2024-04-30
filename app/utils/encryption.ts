import { AES, enc } from 'crypto-js';

const SECRET_KEY = 'secretKey123';
const TOKEN_KEY = 'token';
const NEXT_AUTH_USERID = 'userId';

const obfuscate = (str: string): string => {
  return str
    .split('')
    .map((char) => String.fromCharCode(char.charCodeAt(0) + 5))
    .join('');
};

const deobfuscate = (str: string): string => {
  return str
    .split('')
    .map((char) => String.fromCharCode(char.charCodeAt(0) - 5))
    .join('');
};

export const storeToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    const encryptedToken = AES.encrypt(token, SECRET_KEY).toString();
    const obfuscatedToken = obfuscate(encryptedToken);
    localStorage.setItem(TOKEN_KEY, obfuscatedToken);
  }
};

export const getAccessToken = (): string | null => {
  if (typeof window !== 'undefined') {
    const obfuscatedToken = localStorage.getItem(TOKEN_KEY);

    if (obfuscatedToken) {
      const encryptedToken = deobfuscate(obfuscatedToken);
      const bytes = AES.decrypt(encryptedToken, SECRET_KEY);
      try {
        const originalToken = bytes?.toString(enc.Utf8);
        return originalToken;
      } catch (error) {
        console.log('Error decoding as UTF-8:', error);
      }
    }
  }

  return null;
};

export const removeToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
  }
};

export const storeUserId = (userId: string | number): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(NEXT_AUTH_USERID, userId as string);
  }
};
export const getUserId = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.getItem(NEXT_AUTH_USERID);
  }
};

export const removeUserId = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(NEXT_AUTH_USERID);
  }
};

export const getUserIdLocalStorage = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('userId');
  }
  return null;
};
