import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { useAuth } from "../../hooks/useAuth";
import { AuthForm } from "./AuthForm";
import { ErrorMessage } from "../shared/ErrorMessage";

export function AuthScreen() {
  const { signIn, loading, error } = useAuth();

  return (
    <flexboxLayout style={styles.container}>
      <label className="text-2xl mb-4 font-bold">Golf Game Tracker</label>
      <AuthForm onSubmit={signIn} loading={loading} />
      {error && <ErrorMessage message={error.message} />}
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