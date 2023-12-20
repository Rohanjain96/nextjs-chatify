import CryptoJS from "crypto-js"
export const getOrignalText = (encryptedContent:string) => {
    var bytes = CryptoJS.AES.decrypt(encryptedContent, process.env.MESSAGE_SECRET as string);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText
}

export const getEncryptedText = (plainContent: string) => {
    return CryptoJS.AES.encrypt(plainContent, process.env.MESSAGE_SECRET as string).toString();
}