import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  private readonly key: string = 'A247DB24C8AE4B8A';
  private readonly iv: string = CryptoJS.lib.WordArray.random(16).toString();

  constructor() {}

  // Method to encrypt the plain text
  public encrypt(plaintext: string): string {
    const encrypted = CryptoJS.AES.encrypt(plaintext, CryptoJS.enc.Utf8.parse(this.key), {
      iv: CryptoJS.enc.Utf8.parse(this.iv),
    });
    return this.iv + encrypted.ciphertext.toString(CryptoJS.enc.Hex);
  }

  // Method to decrypt the cipher text
  public decrypt(ciphertext: string): string {
    const iv = CryptoJS.enc.Hex.parse(ciphertext.substr(0, 32));
    const encryptedData = ciphertext.substr(32);
    const bytes = CryptoJS.AES.decrypt(encryptedData, CryptoJS.enc.Utf8.parse(this.key), {
      iv: iv,
    });
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
