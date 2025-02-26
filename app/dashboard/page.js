"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Container, Typography, Button } from "@mui/material";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <p>Loading...</p>;
  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <Container>
      <Typography variant="h4">Dashboard</Typography>
      <Typography>Welcome, {session.user.name}</Typography>
      <Button onClick={() => router.push("/dashboard/profile")}>
        Go to Profile
      </Button>
      <Button onClick={() => signOut()}>Logout</Button>
    </Container>
  );
}
