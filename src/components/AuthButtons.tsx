"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const AuthButtons = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const handleLogin = async () => {
    const result = await signIn("google", {
      callbackUrl: "/",
      redirect: false, // prevent auto-navigation to NextAuth screen
    });
     if (result?.url) {
      router.push(result.url); // go straight to Google login
    }
  };


  return (
    <div>
      {session ? (
        <Button onClick={() => signOut()}>Sign Out</Button>
      ) : (
        <button onClick={handleLogin}>
      Sign in 
    </button>


      )}
    </div>
  );
};

export default AuthButtons;
