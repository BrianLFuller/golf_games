import { QRGenerator } from 'nativescript-qr-generator';

export class QRCodeService {
  static async generateQRCode(data: string): Promise<string> {
    const qrGenerator = new QRGenerator();
    return await qrGenerator.generateQR(data);
  }
}