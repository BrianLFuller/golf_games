import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { useGameStore } from "../../stores/game/store";
import { QRCodeService } from "../../services/qrcode.service";

export function GameSetup() {
  const createGame = useGameStore((state) => state.createGame);
  const [qrCode, setQrCode] = React.useState<string>("");

  const handleCreateGame = async (isPremium: boolean) => {
    const gameId = await createGame(isPremium);
    const qrCodeData = await QRCodeService.generateQRCode(gameId);
    setQrCode(qrCodeData);
  };

  return (
    <flexboxLayout style={styles.container}>
      <label className="text-2xl mb-4 font-bold">Create New Game</label>
      
      <button
        className="btn btn-primary mb-4"
        onTap={() => handleCreateGame(false)}
      >
        Create Free Game (1-4 players)
      </button>
      
      <button
        className="btn btn-secondary mb-4"
        onTap={() => handleCreateGame(true)}
      >
        Create Premium Game (5+ players)
      </button>

      {qrCode && (
        <image
          src={qrCode}
          width={200}
          height={200}
          className="mb-4"
        />
      )}
    </flexboxLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    padding: 20
  }
});