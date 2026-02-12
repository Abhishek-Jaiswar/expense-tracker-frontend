'use client'

import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const navLink = [
  {
    id: 1,
    name: "Home",
    path: "/",
  },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const isLoggedIn = !!user;

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };


  return (
    <nav className="h-14 flex items-center justify-between bg-white max-w-7xl mx-auto px-5">
      <Link href="/" className="flex items-center">
        <h1 className="text-2xl font-extrabold text-neutral-800">ExTr</h1>
      </Link>

      <div className="flex items-center gap-8">
        <div className="flex gap-6">
          {navLink.map((link) => (
            <Link
              key={link.id}
              href={link.path}
              className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <Link
              className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
              href={"/dashboard"}
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-1.5 border border-neutral-300 hover:bg-neutral-50 transition-colors duration-200 rounded-md text-sm font-medium text-neutral-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              className="px-4 py-1.5 bg-neutral-800 text-white hover:bg-neutral-700 transition-colors duration-200 rounded-md text-sm font-medium"
              href={"/sign-in"}
            >
              Login
            </Link>
            <Link
              className="px-4 py-1.5 border border-neutral-800 text-neutral-800 hover:bg-neutral-50 transition-colors duration-200 rounded-md text-sm font-medium"
              href={"/sign-up"}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
