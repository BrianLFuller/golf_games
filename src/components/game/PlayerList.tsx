import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { useGameStore } from "../../stores/gameStore";

export function PlayerList() {
  const { players, isPremiumGame } = useGameStore();
  const [newPlayerName, setNewPlayerName] = React.useState("");
  const addPlayer = useGameStore((state) => state.addPlayer);

  const handleAddPlayer = () => {
    if (!newPlayerName.trim()) return;
    
    if (!isPremiumGame && players.length >= 4) {
      alert("Free games are limited to 4 players. Upgrade to premium for more players.");
      return;
    }

    addPlayer({
      id: Date.now().toString(),
      name: newPlayerName.trim(),
      scores: {}
    });
    setNewPlayerName("");
  };

  return (
    <flexboxLayout style={styles.container}>
      <label className="text-xl mb-4">Players</label>
      
      <gridLayout rows="auto" columns="*, auto" className="mb-4">
        <textField
          col="0"
          hint="Player name"
          text={newPlayerName}
          onTextChange={(e) => setNewPlayerName(e.value)}
          returnKeyType="done"
          onReturnPress={handleAddPlayer}
        />
        <button
          col="1"
          className="btn btn-primary ml-2"
          onTap={handleAddPlayer}
        >
          Add
        </button>
      </gridLayout>

      <scrollView>
        {players.map((player) => (
          <label key={player.id} className="mb-2">
            {player.name}
          </label>
        ))}
      </scrollView>
    </flexboxLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: "column"
  }
});