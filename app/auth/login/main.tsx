"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import GoogleIcon from "@/components/icons/GoogleIcon";
import { app, auth } from "@/config/Firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

const LoginMain = () => {
  const [loading, setLoading] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const authInstance = getAuth(app);
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      if (user) {
        router.push("/"); // Redirect to the dashboard or home page if the user is logged in
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]);

  const signInWithGoogle = async () => {
    setLoading(true);
    const authInstance = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(authInstance, provider);
      const user = result.user;
      // Check if the user is in the Firebase auth table
      if (user) {
        router.push("/");
      } else {
        setAlertError(true);
        authInstance.signOut();
      }
    } catch (error) {
      console.log(error);
      setAlertError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <Button onClick={signInWithGoogle}>
          Masuk dengan
          <GoogleIcon className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </>
  );
};

export default LoginMain;
