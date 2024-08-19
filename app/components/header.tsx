"use client";

import { useUserSession } from "../hooks/useUserSession";
import { createSession, removeSession } from "@/actions/auth-actions";
import { auth } from "../config/firebase";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@mui/material";
import "../globals.css";

export function Header({ session }: { session: string | null }) {
  const userSessionId = useUserSession(session);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const handleSignIn = () => {
    router.push("/register");
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      await removeSession();
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!userSessionId) {
    return (
      <header>
        <nav className="flex justify-between p-5 bg-blue-950 navbar">
          <h2 className="font-black text-white text-2xl">CareFinder</h2>
          <Button
            onClick={handleSignIn}
            className="bg-blue-600 text-white px-6 rounded-2xl hover:bg-blue-800"
          >
            Sign In
          </Button>
        </nav>
      </header>
    );
  }

  return (
    <header>
      <nav className="flex justify-between p-5 bg-blue-950 navbar">
        <h2 className="font-black text-white text-2xl">CareFinder</h2>
        <Button
          onClick={handleSignOut}
          className="bg-blue-600 text-white px-6 rounded-2xl hover:bg-blue-800"
        >
          Sign Out
        </Button>
      </nav>
    </header>
  );
}

export default Header;
