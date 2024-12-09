import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { useGameStore } from "../../stores/gameStore";

export function ScoreCard() {
  const { players, currentHole } = useGameStore();

  return (
    <scrollView>
      <gridLayout style={styles.container}>
        <gridLayout rows="auto" columns="auto, *" style={styles.header}>
          <label col="0" style={styles.playerName}>Player</label>
          {Array.from({ length: 18 }, (_, i) => (
            <label 
              key={i} 
              col={i + 1} 
              style={styles.holeNumber}
              className={currentHole === i + 1 ? "font-bold" : ""}
            >
              {i + 1}
            </label>
          ))}
        </gridLayout>

        {players.map((player, index) => (
          <gridLayout 
            key={player.id} 
            rows="auto" 
            columns="auto, *" 
            style={styles.playerRow}
          >
            <label col="0" style={styles.playerName}>{player.name}</label>
            {Array.from({ length: 18 }, (_, i) => (
              <label 
                key={i} 
                col={i + 1} 
                style={styles.score}
              >
                {player.scores[i + 1] || '-'}
              </label>
            ))}
          </gridLayout>
        ))}
      </gridLayout>
    </scrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  header: {
    backgroundColor: "#f3f4f6",
    padding: 5
  },
  playerRow: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb"
  },
  playerName: {
    width: 100,
    fontWeight: "bold"
  },
  holeNumber: {
    width: 40,
    textAlign: "center"
  },
  score: {
    width: 40,
    textAlign: "center"
  }
});