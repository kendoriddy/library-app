"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Container, Typography, Button } from "@mui/material";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session && status !== "loading") {
      router.push("/login");
    }
  }, [session, status, router]);

  if (status === "loading" || !session) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Typography variant="h4">Dashboard</Typography>
      <Typography>Welcome, {session?.user?.name || "Guest"}</Typography>
      <Button onClick={() => router.push("/dashboard/profile")}>
        Go to Profile
      </Button>
      <Button onClick={() => signOut()}>Logout</Button>
    </Container>
  );
}
