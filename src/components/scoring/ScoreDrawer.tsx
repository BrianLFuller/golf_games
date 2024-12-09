import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { useGameStore } from "../../stores/gameStore";

export function ScoreDrawer() {
  const { players, currentHole, updateScore } = useGameStore();

  return (
    <flexboxLayout style={styles.drawer}>
      <label className="text-xl mb-4">Hole {currentHole}</label>
      
      {players.map((player) => (
        <gridLayout key={player.id} columns="*, auto" className="mb-4">
          <label col="0">{player.name}</label>
          <textField
            col="1"
            keyboardType="number"
            text={player.scores[currentHole]?.toString()}
            onTextChange={(e) => updateScore(player.id, currentHole, parseInt(e.value))}
            className="w-16 text-center"
          />
        </gridLayout>
      ))}
    </flexboxLayout>
  );
}

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    flexDirection: "column"
  }
});