import * as React from "react";
import { StyleSheet } from "react-nativescript";

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <label className="text-red-500 mt-4 text-center" style={styles.error}>
      {message}
    </label>
  );
}

const styles = StyleSheet.create({
  error: {
    color: "#ef4444"
  }
});