import * as React from "react";
import { StyleSheet } from "react-nativescript";

interface AuthFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  loading: boolean;
}

export function AuthForm({ onSubmit, loading }: AuthFormProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = () => {
    onSubmit(email, password);
  };

  return (
    <flexboxLayout style={styles.form}>
      <textField
        className="input mb-4 w-full"
        hint="Email"
        keyboardType="email"
        text={email}
        onTextChange={(e) => setEmail(e.value)}
        editable={!loading}
      />
      <textField
        className="input mb-4 w-full"
        hint="Password"
        secure={true}
        text={password}
        onTextChange={(e) => setPassword(e.value)}
        editable={!loading}
      />
      <button
        className="btn btn-primary"
        onTap={handleSubmit}
        isEnabled={!loading}
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </flexboxLayout>
  );
}

const styles = StyleSheet.create({
  form: {
    width: "100%",
    flexDirection: "column"
  }
});