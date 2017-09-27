import { CONFIG } from '../../app.constant';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Injectable()
export class EncryptionService{
  
  private key:string=CONFIG.security.encryptionKey;
  
  constructor()
  {
    
  }
  
  public doEncrypt(text:string):string
  {
    return CryptoJS.AES.encrypt(text,this.key).toString();
  }
  
  public doDecrypt(text:string):string
  {
    return CryptoJS.AES.decrypt(text,this.key).toString(CryptoJS.enc.Utf8);
  }
}