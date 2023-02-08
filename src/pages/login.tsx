import { signIn, signOut, useSession } from "next-auth/react";
import { CSSProperties, useCallback } from "react";

const styles: CSSProperties = {
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  fontSize: 22,
};

export default function Login() {
  const { data: session } = useSession();

  const handleSignOut = useCallback(() => {
    signOut();
  }, []);

  const handleSignIn = useCallback(() => {
    const callbackUrl = location.href.includes("callbackUrl")
      ? {
          callbackUrl: new URL(location.href).searchParams.get("callbackUrl")!,
        }
      : {};

    signIn("orulo", callbackUrl);
  }, []);

  if (session) {
    return (
      <div style={styles}>
        Signed in as {session.user?.name} <br />
        <button onClick={handleSignOut}>Sign out</button>
        <br />
        <code>{JSON.stringify(session)}</code>
      </div>
    );
  }
  return (
    <div style={styles}>
      Not signed in <br />
      <button onClick={handleSignIn}>Sign in</button>
    </div>
  );
}
