"use client";
export const dynamic = "force-dynamic"; // Forces this page to be dynamic

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Container, Typography, Button } from "@mui/material";

export default function Dashboard() {
  const sessionData = useSession();
  const session = sessionData?.data;
  const status = sessionData?.status;
  const router = useRouter();

  if (status === "loading") return <p>Loading...</p>;
  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <Container>
      <Typography variant="h4">Dashboard</Typography>
      <Typography>Welcome, {session.user?.name}</Typography>
      <Button onClick={() => router.push("/dashboard/profile")}>
        Go to Profile
      </Button>
      <Button onClick={() => signOut()}>Logout</Button>
    </Container>
  );
}
