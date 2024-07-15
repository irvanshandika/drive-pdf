"use client";
import React, { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import UserIcon from "./icons/UserIcon";
import { app } from "@/config/Firebase";
import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import Image from "next/image";
import { LogOut, User } from "lucide-react";
import Link from "next/link";

const DropdownProfile = () => {
  const [user, setUser] = useState<any>(null);
  const auth = getAuth();
  const router = useRouter();

  useEffect(() => {
    const authInstance = getAuth(app);
    const unsubscribe = authInstance.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      router.push("/");
      await signOut(auth);
    } catch (error: any) {
      console.log("Error signing out: ", error.message);
    }
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>{user && user.photoURL ? <Image src={user.photoURL} alt="Profile Picture" className="lg:size-[35px] size-11 rounded-full ml-2" width={44} height={44} /> : <UserIcon />}</DropdownMenuTrigger>
        <DropdownMenuContent className="lg:mr-10 lg:w-auto w-full">
          <DropdownMenuLabel>
            <div className="flex flex-col justify-center items-center">
              <p>{user && user.email}</p>
              <div className="my-4">{user && user.photoURL ? <Image src={user.photoURL} alt="Profile Picture" className="size-11 rounded-full" width={44} height={44} /> : <UserIcon />}</div>
              <h1>Hi, {user && user.displayName} !</h1>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 size-3" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            <LogOut className="mr-2 size-3" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default DropdownProfile;
