import { BarcodeScanner } from 'nativescript-barcodescanner';

class BarcodeScannerService {
  private scanner: BarcodeScanner;

  constructor() {
    this.scanner = new BarcodeScanner();
  }

  async requestPermissions(): Promise<boolean> {
    try {
      const hasPermission = await this.scanner.hasCameraPermission();
      if (!hasPermission) {
        return await this.scanner.requestCameraPermission();
      }
      return hasPermission;
    } catch (error) {
      console.error('Permission request failed:', error);
      return false;
    }
  }

  async scanQRCode(): Promise<string> {
    const hasPermission = await this.requestPermissions();
    if (!hasPermission) {
      throw new Error('Camera permission denied');
    }

    try {
      const result = await this.scanner.scan({
        formats: [BarcodeScanner.QR_CODE],
        message: 'Scan the game QR code',
        showFlipCameraButton: true,
        showTorchButton: true,
        torchOn: false,
        resultDisplayDuration: 500,
      });

      return result.text;
    } catch (error) {
      throw new Error('Failed to scan QR code');
    }
  }

  async generateQRCode(gameId: string): Promise<string> {
    // For NativeScript, we'll return a URL that can be used to join the game
    return `golfgame://${gameId}`;
  }
}

export const barcodeService = new BarcodeScannerService();